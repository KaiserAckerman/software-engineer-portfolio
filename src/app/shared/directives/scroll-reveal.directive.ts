import { Directive, ElementRef, OnInit, OnDestroy, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;
  private animationClass = 'scroll-reveal-visible';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // En SSR, mostrar el elemento directamente sin animación
      this.renderer.addClass(this.el.nativeElement, this.animationClass);
      return;
    }

    // Agregar clase inicial para ocultar el elemento
    this.renderer.addClass(this.el.nativeElement, 'scroll-reveal-hidden');

    // Crear Intersection Observer
    const options = {
      threshold: 0.1, // Se activa cuando el 10% del elemento es visible
      rootMargin: '0px 0px -50px 0px' // Se activa un poco antes de que esté completamente visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Cuando el elemento entra en el viewport
          this.renderer.removeClass(this.el.nativeElement, 'scroll-reveal-hidden');
          this.renderer.addClass(this.el.nativeElement, this.animationClass);
          
          // Dejar de observar una vez que se ha mostrado (opcional)
          // this.observer.unobserve(this.el.nativeElement);
        }
      });
    }, options);

    // Comenzar a observar el elemento
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

