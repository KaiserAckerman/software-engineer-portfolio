import { Component, OnInit, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { translations } from '../../shared/constants/translations.constant';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { EncryptedTextComponent } from '../../shared/components/encrypted-text/encrypted-text.component';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, FormsModule, ScrollRevealDirective, EncryptedTextComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  currentLanguage = signal<'es' | 'en'>('es');

  // Datos del hero
  name = 'Roberto Vallejo';
  tagline = {
    es: 'Transformando ideas en código, código en soluciones',
    en: 'Transforming ideas into code, code into solutions'
  };

  greeting = computed(() => translations[this.currentLanguage()].hero.greeting);
  profession = computed(() => translations[this.currentLanguage()].hero.profession);
  available = computed(() => translations[this.currentLanguage()].hero.available);
  currentTagline = computed(() => this.tagline[this.currentLanguage()]);

  // Ruta de la imagen del hero
  heroImagePath = '/assets/Gemini_Generated_Image_sxoaszsxoaszsxoa.png';

  showContactModal = signal(false);
  isSubmitting = signal(false);
  formStatus = signal<'idle' | 'success' | 'error'>('idle');

  constructor(
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.currentLanguage.set(this.languageService.current);
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage.set(lang);
    });
  }

  openContactModal(): void {
    this.formStatus.set('idle');
    this.isSubmitting.set(false);
    this.showContactModal.set(true);
  }

  closeContactModal(): void {
    this.showContactModal.set(false);
  }

  downloadCv(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const link = document.createElement('a');
    link.href = '/assets/cv.pdf';
    link.download = 'Roberto-Vallejo-CV.pdf';
    link.target = '_blank';
    link.rel = 'noopener';
    link.click();
  }

  submitContactForm(form: NgForm): void {
    if (form.invalid) {
      this.formStatus.set('error');
      return;
    }

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.formStatus.set('success');
      form.resetForm();
      setTimeout(() => {
        this.closeContactModal();
        this.formStatus.set('idle');
      }, 1200);
    }, 1200);
  }
}
