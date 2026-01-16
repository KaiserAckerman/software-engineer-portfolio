import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, PLATFORM_ID, Inject, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ViewportOptimizerService } from '../../core/services/viewport-optimizer.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appLazySection]',
  standalone: true
})
export class LazySectionDirective implements OnInit, OnDestroy {
  @Input() sectionId: string = '';
  @Input() fadeInDelay: number = 0;

  private subscription?: Subscription;
  private isVisible = false;
  private hasAnimated = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewportOptimizer: ViewportOptimizerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // En SSR, mostrar directamente
      this.renderer.addClass(this.el.nativeElement, 'lazy-section-visible');
      return;
    }

    // Obtener el ID de la sección del atributo o del input
    if (!this.sectionId) {
      this.sectionId = this.el.nativeElement.id || this.el.nativeElement.getAttribute('id') || '';
    }

    if (!this.sectionId) return;

    // Verificar si ya está visible antes de ocultar
    const isInitiallyVisible = this.viewportOptimizer.isSectionVisible(this.sectionId);
    
    if (isInitiallyVisible) {
      // Si está visible inicialmente (como el hero), mostrar directamente con animación
      this.renderer.addClass(this.el.nativeElement, 'lazy-section-hidden');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(30px)');
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.6s ease-out, transform 0.6s ease-out');
      
      // Mostrar después de un pequeño delay para la animación
      setTimeout(() => {
        this.showSection();
      }, 100);
    } else {
      // Estado inicial: oculto con optimizaciones
      this.renderer.addClass(this.el.nativeElement, 'lazy-section-hidden');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(30px)');
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.6s ease-out, transform 0.6s ease-out');
      this.renderer.setStyle(this.el.nativeElement, 'content-visibility', 'hidden');
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
    }

    // Verificar si ya está visible (por si acaso cambió durante la inicialización)
    this.checkVisibility();

    // Suscribirse a cambios de visibilidad
    this.subscription = this.viewportOptimizer.visibleSections.subscribe(visibleSections => {
      const shouldBeVisible = visibleSections.has(this.sectionId);
      
      if (shouldBeVisible && !this.isVisible) {
        this.showSection();
      } else if (!shouldBeVisible && this.isVisible) {
        this.hideSection();
      }
    });
  }

  private checkVisibility(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const isCurrentlyVisible = this.viewportOptimizer.isSectionVisible(this.sectionId);
    
    if (isCurrentlyVisible && !this.isVisible) {
      this.showSection();
    }
  }

  private showSection(): void {
    if (this.isVisible) return;

    this.isVisible = true;
    
    setTimeout(() => {
      this.renderer.removeClass(this.el.nativeElement, 'lazy-section-hidden');
      this.renderer.addClass(this.el.nativeElement, 'lazy-section-visible');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
      this.renderer.setStyle(this.el.nativeElement, 'transition-delay', `${this.fadeInDelay}ms`);
      
      // Optimizaciones: activar contenido cuando es visible
      this.renderer.setStyle(this.el.nativeElement, 'content-visibility', 'auto');
      this.renderer.setStyle(this.el.nativeElement, 'contain-intrinsic-size', 'auto 100vh');
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'auto');
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible');
    }, this.fadeInDelay);
  }

  private hideSection(): void {
    if (!this.isVisible) return;

    this.isVisible = false;
    this.renderer.removeClass(this.el.nativeElement, 'lazy-section-visible');
    this.renderer.addClass(this.el.nativeElement, 'lazy-section-hidden');
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(30px)');
    this.renderer.setStyle(this.el.nativeElement, 'transition-delay', '0ms');
    
    // Optimizaciones: desactivar contenido cuando no es visible
    this.renderer.setStyle(this.el.nativeElement, 'content-visibility', 'hidden');
    this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
