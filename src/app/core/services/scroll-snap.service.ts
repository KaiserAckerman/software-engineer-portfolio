import { Injectable, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollSnapService implements OnDestroy {
  private sections: HTMLElement[] = [];
  private isScrolling = false;
  private scrollTimeout: any;
  private wheelSubscription?: Subscription;
  private scrollSubscription?: Subscription;
  private currentSectionIndex = 0;
  private initialized = false;

  // IDs de las secciones en orden
  private sectionIds = ['hero', 'skills', 'projects', 'experience', 'availability', 'footer'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Esperar a que el DOM esté listo
      setTimeout(() => {
        this.initialize();
      }, 200);
    }
  }

  public initialize(): void {
    if (this.initialized || !isPlatformBrowser(this.platformId)) return;
    
    this.initializeSections();
    this.setupScrollListener();
    this.initialized = true;
  }

  private initializeSections(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.sections = this.sectionIds
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
  }

  private setupScrollListener(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Escuchar eventos de wheel (scroll con mouse/rueda)
    this.wheelSubscription = fromEvent(window, 'wheel', { passive: false })
      .pipe(throttleTime(100))
      .subscribe((event: Event) => {
        const wheelEvent = event as WheelEvent;
        this.handleWheel(wheelEvent);
      });

    // También escuchar eventos de scroll para actualizar el índice actual
    this.scrollSubscription = fromEvent(window, 'scroll', { passive: true })
      .pipe(throttleTime(200))
      .subscribe(() => {
        this.updateCurrentSection();
      });
  }

  private handleWheel(event: WheelEvent): void {
    if (this.isScrolling || this.sections.length === 0 || !isPlatformBrowser(this.platformId)) {
      return;
    }

    const deltaY = event.deltaY;
    const scrollDirection = deltaY > 0 ? 'down' : 'up';
    const scrollAmount = Math.abs(deltaY);

    // Solo actuar si el scroll es significativo
    if (scrollAmount < 50) {
      return;
    }

    // Detectar si estamos cerca del final o inicio de una sección
    this.updateCurrentSection();
    const currentSection = this.sections[this.currentSectionIndex];
    if (!currentSection) return;

    const rect = currentSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollThreshold = viewportHeight * 0.2; // 20% del viewport como umbral

    // Scroll hacia abajo
    if (scrollDirection === 'down') {
      // Si estamos en los últimos 20% de la sección actual y no es la última
      const sectionBottom = rect.top + rect.height;
      if (sectionBottom <= viewportHeight + scrollThreshold && this.currentSectionIndex < this.sections.length - 1) {
        event.preventDefault();
        event.stopPropagation();
        this.scrollToNext();
      }
    }
    // Scroll hacia arriba
    else {
      // Si estamos en los primeros 20% de la sección actual y no es la primera
      if (rect.top >= -scrollThreshold && this.currentSectionIndex > 0) {
        event.preventDefault();
        event.stopPropagation();
        this.scrollToPrevious();
      }
    }
  }

  private updateCurrentSection(): void {
    if (!isPlatformBrowser(this.platformId) || this.sections.length === 0) return;

    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY + viewportHeight / 2;

    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i];
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionBottom = sectionTop + rect.height;

      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        this.currentSectionIndex = i;
        break;
      }
    }
  }


  private scrollToNext(): void {
    if (this.currentSectionIndex < this.sections.length - 1) {
      this.currentSectionIndex++;
      this.scrollToSection(this.sections[this.currentSectionIndex]);
    }
  }

  private scrollToPrevious(): void {
    if (this.currentSectionIndex > 0) {
      this.currentSectionIndex--;
      this.scrollToSection(this.sections[this.currentSectionIndex]);
    }
  }

  public scrollToSection(section: HTMLElement): void {
    if (this.isScrolling || !isPlatformBrowser(this.platformId)) return;

    this.isScrolling = true;
    
    const headerOffset = 64; // Altura del header
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Actualizar el índice de la sección actual
    const index = this.sections.indexOf(section);
    if (index !== -1) {
      this.currentSectionIndex = index;
    }

    // Permitir scroll nuevamente después de la animación
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
    }, 800); // Tiempo estimado para la animación
  }

  public scrollToSectionById(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const section = document.getElementById(sectionId);
    if (section) {
      const index = this.sectionIds.indexOf(sectionId);
      if (index !== -1) {
        this.currentSectionIndex = index;
      }
      this.scrollToSection(section);
    }
  }

  ngOnDestroy(): void {
    if (this.wheelSubscription) {
      this.wheelSubscription.unsubscribe();
    }
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }
}

