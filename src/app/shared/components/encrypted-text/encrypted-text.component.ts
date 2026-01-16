import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild, PLATFORM_ID, Inject, AfterViewInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { cn } from '../../utils/utils';

@Component({
  selector: 'app-encrypted-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './encrypted-text.component.html',
  styleUrl: './encrypted-text.component.scss'
})
export class EncryptedTextComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() text: string = '';
  @Input() className: string = '';
  @Input() revealDelayMs: number = 50;
  @Input() charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?';
  @Input() flipDelayMs: number = 50;
  @Input() encryptedClassName: string = '';
  @Input() revealedClassName: string = '';

  @ViewChild('textContainer', { static: false }) textContainer!: ElementRef<HTMLElement>;

  revealCount = 0;
  displayChars: string[] = [];

  private animationFrameRef: number | null = null;
  private startTimeRef = 0;
  private lastFlipTimeRef = 0;
  private scrambleCharsRef: string[] = [];
  private observer?: IntersectionObserver;
  private isInView = false;
  private isCancelled = false;
  private previousText: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.text) {
      this.scrambleCharsRef = this.generateGibberishPreservingSpaces(this.text).split('');
      this.displayChars = this.scrambleCharsRef.slice();
      this.previousText = this.text;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si el texto cambia y ya estaba en vista, reiniciar la animación
    if (changes['text'] && this.previousText !== this.text) {
      this.previousText = this.text;
      if (this.text) {
        this.isCancelled = true;
        if (this.animationFrameRef !== null) {
          cancelAnimationFrame(this.animationFrameRef);
        }
        
        // Resetear estado
        this.scrambleCharsRef = this.generateGibberishPreservingSpaces(this.text).split('');
        this.displayChars = this.scrambleCharsRef.slice();
        this.revealCount = 0;
        this.isCancelled = false;

        // Reiniciar animación si está en vista
        if (this.isInView) {
          this.startAnimation();
        }
      }
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.textContainer) {
      // Verificar si el elemento ya está visible
      const rect = this.textContainer.nativeElement.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && this.text) {
        this.isInView = true;
        this.startAnimation();
      } else {
        this.setupIntersectionObserver();
      }
    }
  }

  ngOnDestroy(): void {
    this.isCancelled = true;
    if (this.animationFrameRef !== null) {
      cancelAnimationFrame(this.animationFrameRef);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isInView) {
            this.isInView = true;
            this.startAnimation();
            // Desconectar el observer después de la primera intersección (equivalente a once: true)
            if (this.observer) {
              this.observer.disconnect();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (this.textContainer?.nativeElement) {
      this.observer.observe(this.textContainer.nativeElement);
    }
  }

  private startAnimation(): void {
    if (!this.text) return;

    // Reset state for a fresh animation
    this.scrambleCharsRef = this.generateGibberishPreservingSpaces(this.text).split('');
    this.startTimeRef = performance.now();
    this.lastFlipTimeRef = this.startTimeRef;
    this.revealCount = 0;
    this.isCancelled = false;

    this.animate();
  }

  private animate = (): void => {
    if (this.isCancelled) return;

    const now = performance.now();
    const elapsedMs = now - this.startTimeRef;
    const totalLength = this.text.length;
    const currentRevealCount = Math.min(
      totalLength,
      Math.floor(elapsedMs / Math.max(1, this.revealDelayMs))
    );

    const revealCountChanged = this.revealCount !== currentRevealCount;
    this.revealCount = currentRevealCount;

    // Re-randomize unrevealed scramble characters on an interval
    const timeSinceLastFlip = now - this.lastFlipTimeRef;
    const shouldUpdateScramble = timeSinceLastFlip >= Math.max(0, this.flipDelayMs);
    
    if (shouldUpdateScramble) {
      for (let index = 0; index < totalLength; index += 1) {
        if (index >= currentRevealCount) {
          if (this.text[index] !== ' ') {
            this.scrambleCharsRef[index] = this.generateRandomCharacter();
          } else {
            this.scrambleCharsRef[index] = ' ';
          }
        }
      }
      this.lastFlipTimeRef = now;
    }

    // Update display characters only when reveal count changes or scramble updates
    if (revealCountChanged || shouldUpdateScramble) {
      this.updateDisplayChars(currentRevealCount);
    }

    if (currentRevealCount >= totalLength) {
      return;
    }

    this.animationFrameRef = requestAnimationFrame(this.animate);
  };

  private updateDisplayChars(revealCount: number): void {
    this.displayChars = this.text.split('').map((char, index) => {
      if (index < revealCount) {
        return char;
      } else {
        return char === ' ' ? ' ' : (this.scrambleCharsRef[index] || this.generateRandomCharacter());
      }
    });
    // Forzar detección de cambios para actualizar la vista
    this.cdr.detectChanges();
  }

  private generateRandomCharacter(): string {
    const index = Math.floor(Math.random() * this.charset.length);
    return this.charset.charAt(index);
  }

  private generateGibberishPreservingSpaces(original: string): string {
    if (!original) return '';
    let result = '';
    for (let i = 0; i < original.length; i += 1) {
      const ch = original[i];
      result += ch === ' ' ? ' ' : this.generateRandomCharacter();
    }
    return result;
  }

  getCharClass(index: number): string {
    const isRevealed = index < this.revealCount;
    return cn(isRevealed ? this.revealedClassName : this.encryptedClassName);
  }

  getContainerClass(): string {
    return cn(this.className);
  }
}

