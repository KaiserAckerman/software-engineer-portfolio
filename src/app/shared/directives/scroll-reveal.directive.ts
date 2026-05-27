import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Renderer2,
  PLATFORM_ID,
  Inject,
  Input
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Scroll reveal: aparece al entrar en viewport y se oculta al salir (reversible).
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  /** Si true, solo anima la primera vez que entra en vista. */
  @Input() revealOnce = false;

  /** Porcentaje visible para disparar (0–1). */
  @Input() revealThreshold = 0.1;

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.show();
      return;
    }

    this.hide();

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.show();
            if (this.revealOnce) {
              this.observer?.unobserve(this.el.nativeElement);
            }
          } else if (!this.revealOnce) {
            this.hide();
          }
        });
      },
      {
        threshold: this.revealThreshold,
        rootMargin: '0px 0px -5% 0px'
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private show(): void {
    this.renderer.removeClass(this.el.nativeElement, 'scroll-reveal-hidden');
    this.renderer.addClass(this.el.nativeElement, 'scroll-reveal-visible');
  }

  private hide(): void {
    this.renderer.removeClass(this.el.nativeElement, 'scroll-reveal-visible');
    this.renderer.addClass(this.el.nativeElement, 'scroll-reveal-hidden');
  }
}
