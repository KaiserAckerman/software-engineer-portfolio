import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { ThemeService } from '../../core/services/theme.service';
import { ScrollSnapService } from '../../core/services/scroll-snap.service';
import { LanguageToggleComponent } from '../../shared/components/language-toggle/language-toggle.component';
import { ThemeToogleComponent } from '../../shared/components/theme-toogle/theme-toogle.component';
import { translations } from '../../shared/constants/translations.constant';
import { socialLinks } from '../../shared/constants/social-links.constant';

interface SectionMatch {
  id: string;
  ratio: number;
  distance: number;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, LanguageToggleComponent, ThemeToogleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentLanguage = signal<'es' | 'en'>('es');
  isMenuOpen = signal(false);
  activeSection = signal<string>('hero');
  socialLinks = socialLinks;
  private intersectionObserver?: IntersectionObserver;
  private scrollHandler = this.handleScroll.bind(this);
  private updateTimeout?: number;
  private lastUpdateTime = 0;

  navItems = [
    { id: 'hero', key: 'home' as const },
    { id: 'skills', key: 'skills' as const },
    { id: 'projects', key: 'projects' as const },
    { id: 'experience', key: 'experience' as const },
    { id: 'availability', key: 'availability' as const }
  ];

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private scrollSnapService: ScrollSnapService
  ) {}

  ngOnInit(): void {
    this.currentLanguage.set(this.languageService.current);
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage.set(lang);
    });

    // Inicializar el observer después de que el DOM esté listo
    if (typeof window !== 'undefined') {
      setTimeout(() => this.initializeIntersectionObserver(), 100);
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.scrollHandler);
    }
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
  }

  private initializeIntersectionObserver(): void {
    const navbarHeight = 64; // h-16 = 64px
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${navbarHeight}px 0px -50% 0px`, // Zona más estricta para evitar cambios rápidos
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      // Limpiar timeout anterior si existe
      if (this.updateTimeout) {
        clearTimeout(this.updateTimeout);
      }

      // Debounce: esperar un poco antes de actualizar para evitar cambios rápidos
      this.updateTimeout = window.setTimeout(() => {
        this.updateActiveSection(entries, navbarHeight);
      }, 50); // 50ms de debounce
    }, options);

    // Observar todas las secciones
    this.navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        this.intersectionObserver?.observe(element);
      }
    });

    // También escuchar eventos de scroll para casos edge (especialmente al inicio)
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
    }
  }

  private updateActiveSection(entries: IntersectionObserverEntry[], navbarHeight: number): void {
    const currentTime = Date.now();
    const matches: SectionMatch[] = [];

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const rect = entry.boundingClientRect;
        // Calcular la distancia desde el top del viewport (después del navbar)
        const topPosition = rect.top - navbarHeight;

        // Solo considerar secciones que están en la parte superior del viewport
        // y que tienen al menos un 20% de visibilidad
        if (topPosition <= 200 && entry.intersectionRatio >= 0.2) {
          const visibleRatio = entry.intersectionRatio;
          // Priorizar secciones más cercanas al top y con mayor visibilidad
          // Penalizar secciones que están muy abajo
          const score = visibleRatio * (1 / (1 + Math.max(0, topPosition) / 50));

          matches.push({
            id: entry.target.id,
            ratio: score,
            distance: Math.max(0, topPosition)
          });
        }
      }
    });

    // Si encontramos secciones válidas, elegir la mejor
    if (matches.length > 0) {
      // Ordenar: primero por distancia al top (menor es mejor), luego por ratio
      matches.sort((a, b) => {
        // Si una está significativamente más cerca del top, elegirla
        if (Math.abs(a.distance - b.distance) > 50) {
          return a.distance - b.distance;
        }
        // Si están a similar distancia, elegir la más visible
        return b.ratio - a.ratio;
      });

      const bestMatch = matches[0];
      const newSectionId = bestMatch.id;
      const currentSectionId = this.activeSection();

      // Solo actualizar si es diferente y ha pasado suficiente tiempo desde la última actualización
      // Esto previene cambios muy rápidos entre secciones
      if (newSectionId !== currentSectionId) {
        const timeSinceLastUpdate = currentTime - this.lastUpdateTime;

        // Si ha pasado menos de 200ms desde la última actualización,
        // solo cambiar si la nueva sección está claramente más cerca del top
        if (timeSinceLastUpdate < 200) {
          const currentSectionMatch = matches.find(m => m.id === currentSectionId);
          if (currentSectionMatch) {
            // Solo cambiar si la nueva sección está significativamente mejor
            if (bestMatch.distance < currentSectionMatch.distance - 30) {
              this.activeSection.set(newSectionId);
              this.lastUpdateTime = currentTime;
            }
          }
        } else {
          // Si ha pasado suficiente tiempo, actualizar normalmente
          this.activeSection.set(newSectionId);
          this.lastUpdateTime = currentTime;
        }
      }
    }
  }

  private handleScroll(): void {
    // Si estamos muy arriba, asegurar que hero esté activo
    if (window.scrollY < 100) {
      this.activeSection.set('hero');
      this.lastUpdateTime = Date.now();
    }
  }

  isActive(sectionId: string): boolean {
    return this.activeSection() === sectionId;
  }

  getNavLabel(key: 'home' | 'skills' | 'projects' | 'experience' | 'availability'): string {
    return translations[this.currentLanguage()].header[key];
  }

  scrollToSection(sectionId: string): void {
    this.isMenuOpen.set(false);

    // Solución simple: buscar el elemento y hacer scroll directamente
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  openSocialLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
