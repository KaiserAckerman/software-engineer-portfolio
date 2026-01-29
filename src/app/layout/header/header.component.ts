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

  // rAF + throttle para evaluación determinista del activeSection
  private rafId?: number;
  private evaluateThrottle = 100; // ms mínimo entre evaluaciones visibles (ajustable)
  private lastEvaluate = 0;

  // Guard para manejo de scroll programático (click en nav -> smooth scroll)
  private isProgrammaticScroll = false;
  private programmaticTarget: string | null = null;
  private programmaticScrollTimeout?: number;
  private lastScrollY = 0;

  // Guard para evitar abrir el mismo link dos veces en rápida sucesión
  private lastLinkOpen: { url: string; time: number } | null = null;

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
    if (this.programmaticScrollTimeout) {
      clearTimeout(this.programmaticScrollTimeout);
    }
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private initializeIntersectionObserver(): void {
    const navbarHeight = 64; // h-16 = 64px
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${navbarHeight}px 0px -25% 0px`, // Zona menos estricta para mejor detección
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
      }, 25); // 25ms de debounce
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
    // Si estamos en scroll programático, ignorar actualizaciones de IO temporalmente
    if (this.isProgrammaticScroll) {
      return;
    }

    const currentTime = Date.now();
    const matches: SectionMatch[] = [];

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const rect = entry.boundingClientRect;
        const topPosition = rect.top - navbarHeight;

        if (topPosition <= 200 && entry.intersectionRatio >= 0.2) {
          const visibleRatio = entry.intersectionRatio;
          const score = visibleRatio * (1 / (1 + Math.max(0, topPosition) / 50));

          matches.push({
            id: entry.target.id,
            ratio: score,
            distance: Math.max(0, topPosition)
          });
        }
      }
    });

    if (matches.length > 0) {
      matches.sort((a, b) => {
        if (Math.abs(a.distance - b.distance) > 50) {
          return a.distance - b.distance;
        }
        return b.ratio - a.ratio;
      });

      const bestMatch = matches[0];
      const newSectionId = bestMatch.id;
      const currentSectionId = this.activeSection();

      if (newSectionId !== currentSectionId) {
        const timeSinceLastUpdate = currentTime - this.lastUpdateTime;

        // Detección de scroll brusco: si el cambio de scrollY es grande, permitir cambio inmediato
        const scrollDelta = Math.abs(window.scrollY - this.lastScrollY);
        const isBruscoScroll = scrollDelta > 500;

        if (timeSinceLastUpdate < 100 && !isBruscoScroll) {
          const currentSectionMatch = matches.find(m => m.id === currentSectionId);
          if (currentSectionMatch && bestMatch.distance < currentSectionMatch.distance - 30) {
            this.activeSection.set(newSectionId);
            this.lastUpdateTime = currentTime;
          }
        } else {
          this.activeSection.set(newSectionId);
          this.lastUpdateTime = currentTime;
        }
      }
    }
  }

  private handleScroll(): void {
    // Registrar posición actual para detectar scroll brusco
    this.lastScrollY = window.scrollY;

    // Si estamos en scroll programático, mantener el timeout vivo
    if (this.isProgrammaticScroll) {
      if (this.programmaticScrollTimeout) clearTimeout(this.programmaticScrollTimeout);
      // Considerar el scroll terminado después de 350ms sin eventos
      this.programmaticScrollTimeout = window.setTimeout(() => {
        this.endProgrammaticScroll();
      }, 350);
      return;
    }

    // Si estamos muy arriba, asegurar que hero esté activo
    if (window.scrollY < 200) {
      this.activeSection.set('hero');
      this.lastUpdateTime = Date.now();
      this.lastScrollY = window.scrollY;
      return;
    }

    this.lastScrollY = window.scrollY;
  }

  private forceUpdateActiveSection(): void {
    const navbarHeight = 64;
    let closestSection = 'hero';
    let bestAdjustedTop = Infinity;

    // Primero, buscar la sección que está más arriba y visible (adjustedTop >= 0)
    this.navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const adjustedTop = rect.top - navbarHeight;
        if (adjustedTop >= 0 && adjustedTop < bestAdjustedTop) {
          bestAdjustedTop = adjustedTop;
          closestSection = item.id;
        }
      }
    });

    // Si ninguna sección está visible desde arriba, elegir la más cercana desde arriba
    if (bestAdjustedTop === Infinity) {
      this.navItems.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const adjustedTop = rect.top - navbarHeight;
          if (adjustedTop < bestAdjustedTop) {
            bestAdjustedTop = adjustedTop;
            closestSection = item.id;
          }
        }
      });
    }

    // Solo actualizar si es diferente
    if (closestSection !== this.activeSection()) {
      this.activeSection.set(closestSection);
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

    const element = document.getElementById(sectionId);
    if (element) {
      // Marcar como scroll programático para evitar transient glitches
      this.isProgrammaticScroll = true;
      this.programmaticTarget = sectionId;
      this.lastScrollY = window.scrollY;

      // Establecer optimistamente la sección objetivo en el nav
      this.activeSection.set(sectionId);
      this.lastUpdateTime = Date.now();

      // Hacer el scroll suave
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Timeout para finalizar scroll programático (fallback si no hay eventos)
      if (this.programmaticScrollTimeout) clearTimeout(this.programmaticScrollTimeout);
      this.programmaticScrollTimeout = window.setTimeout(() => {
        this.endProgrammaticScroll();
      }, 900);
    }
  }

  /**
   * Finalizar scroll programático: permitir evaluaciones normales y forzar última verificación
   */
  private endProgrammaticScroll(): void {
    if (this.programmaticScrollTimeout) {
      clearTimeout(this.programmaticScrollTimeout);
      this.programmaticScrollTimeout = undefined;
    }
    this.isProgrammaticScroll = false;
    const target = this.programmaticTarget;
    this.programmaticTarget = null;

    // Forzar evaluación determinista basada en posición actual
    this.forceUpdateActiveSection();

    // Si aún no estamos en la sección objetivo, asegurarla
    if (target && this.activeSection() !== target) {
      this.activeSection.set(target);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  openSocialLink(url: string, event?: MouseEvent): void {
    // Prevenir comportamiento por defecto y bubbling que puedan causar navegación doble
    try {
      event?.preventDefault();
      event?.stopPropagation();
    } catch (e) {
      // ignore
    }

    if (typeof window === 'undefined') return;

    // Evitar doble apertura si se hace click rápidamente sobre el mismo link
    const now = Date.now();
    if (this.lastLinkOpen && this.lastLinkOpen.url === url && now - this.lastLinkOpen.time < 500) {
      return;
    }
    this.lastLinkOpen = { url, time: now };

    try {
      if (url?.toLowerCase().startsWith('mailto:')) {
        const mail = url.replace(/^mailto:/i, '');
        const [toPart, queryString] = mail.split('?');
        const to = toPart || '';

        // Construir URL de composición de Gmail y mapear parámetros comunes
        let gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}`;
        if (queryString) {
          const params = new URLSearchParams(queryString);
          if (params.get('subject')) gmailUrl += `&su=${encodeURIComponent(params.get('subject')!)}`;
          if (params.get('body')) gmailUrl += `&body=${encodeURIComponent(params.get('body')!)}`;
          if (params.get('cc')) gmailUrl += `&cc=${encodeURIComponent(params.get('cc')!)}`;
          if (params.get('bcc')) gmailUrl += `&bcc=${encodeURIComponent(params.get('bcc')!)}`;
        }

        const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const target = isMobile ? url : gmailUrl;

        const opened = window.open(target, '_blank', 'noopener,noreferrer');
        // Si el popup fue bloqueado, usar fallback a mailto (reemplaza la página actual)
        if (!opened) {
          window.location.href = url; // fallback: abrir mailto en el navegador
        }
        return;
      }

      // Default: abrir enlaces externos en nueva pestaña
      const opened = window.open(url, '_blank', 'noopener,noreferrer');
      // Solo usar fallback (reemplazar la pestaña actual) si window.open fue bloqueado
      if (!opened) window.location.href = url;
    } catch (err) {
      // En caso raro de error, hacer fallback simple
      window.location.href = url;
    }
  }
}
