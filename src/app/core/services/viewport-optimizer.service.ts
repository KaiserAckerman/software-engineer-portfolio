import { Injectable, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface SectionVisibility {
  id: string;
  isVisible: boolean;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ViewportOptimizerService implements OnDestroy {
  private visibleSections$ = new BehaviorSubject<Set<string>>(new Set());
  private activeSections$ = new BehaviorSubject<Set<string>>(new Set());
  private scrollSubscription?: Subscription;
  
  // IDs de las secciones a optimizar (excluyendo header y footer)
  private sectionIds = ['hero', 'skills', 'projects', 'experience', 'availability'];
  
  // Margen para considerar una sección como "cerca" del viewport (en píxeles)
  private readonly viewportMargin = 500; // 500px antes y después del viewport
  
  get visibleSections() {
    return this.visibleSections$.asObservable();
  }

  get activeSections() {
    return this.activeSections$.asObservable();
  }

  isSectionVisible(sectionId: string): boolean {
    return this.visibleSections$.value.has(sectionId);
  }

  isSectionActive(sectionId: string): boolean {
    return this.activeSections$.value.has(sectionId);
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initialize();
      }, 100);
    }
  }

  private initialize(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Detectar secciones visibles inicialmente
    this.updateVisibleSections();

    // Suscribirse a eventos de scroll
    this.scrollSubscription = fromEvent(window, 'scroll')
      .pipe(throttleTime(100))
      .subscribe(() => {
        this.updateVisibleSections();
      });

    // También escuchar cambios de tamaño de ventana
    fromEvent(window, 'resize')
      .pipe(throttleTime(200))
      .subscribe(() => {
        this.updateVisibleSections();
      });
  }

  private updateVisibleSections(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const viewportTop = window.scrollY;
    const viewportBottom = viewportTop + window.innerHeight;
    const expandedTop = viewportTop - this.viewportMargin;
    const expandedBottom = viewportBottom + this.viewportMargin;

    const visible = new Set<string>();
    const active = new Set<string>();

    for (const sectionId of this.sectionIds) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        // Sección está en el área expandida (visible o cerca)
        if (elementBottom >= expandedTop && elementTop <= expandedBottom) {
          visible.add(sectionId);
        }

        // Sección está realmente en el viewport (activa)
        if (elementBottom >= viewportTop && elementTop <= viewportBottom) {
          active.add(sectionId);
        }
      }
    }

    // Actualizar solo si hay cambios
    const currentVisible = this.visibleSections$.value;
    const currentActive = this.activeSections$.value;
    
    if (this.setsAreEqual(currentVisible, visible) && this.setsAreEqual(currentActive, active)) {
      return;
    }

    this.visibleSections$.next(visible);
    this.activeSections$.next(active);
  }

  private setsAreEqual(set1: Set<string>, set2: Set<string>): boolean {
    if (set1.size !== set2.size) return false;
    for (const item of set1) {
      if (!set2.has(item)) return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}
