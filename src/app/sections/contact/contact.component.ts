import { Component, OnInit, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { LanguageService } from '../../core/services/language.service';
import { ContactModalService } from '../../core/services/contact-modal.service';

@Component({
  selector: 'app-contact',
  imports: [ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  currentLanguage = signal<'es' | 'en'>('es');

  constructor(
    private languageService: LanguageService,
    private contactModalService: ContactModalService
  ) {}

  ngOnInit(): void {
    this.currentLanguage.set(this.languageService.current);
    this.languageService.language$.subscribe(lang => this.currentLanguage.set(lang));
  }

  get title(): string {
    return this.currentLanguage() === 'es' ? 'Contacto' : 'Contact';
  }

  get subtitle(): string {
    return this.currentLanguage() === 'es'
      ? 'Estoy abierto a nuevas oportunidades'
      : 'I am open to new opportunities';
  }

  get availableLabel(): string {
    return this.currentLanguage() === 'es' ? 'Disponible' : 'Available';
  }

  get availableDesc(): string {
    return this.currentLanguage() === 'es'
      ? 'Buscando nuevas oportunidades'
      : 'Looking for new opportunities';
  }

  get workTypeLabel(): string {
    return this.currentLanguage() === 'es' ? 'Tipo de Trabajo' : 'Work Type';
  }

  get workTypeDesc(): string {
    return this.currentLanguage() === 'es'
      ? 'Remoto · Híbrido · Presencial'
      : 'Remote · Hybrid · On-site';
  }

  get responseLabel(): string {
    return this.currentLanguage() === 'es' ? 'Tiempo de Respuesta' : 'Response Time';
  }

  get responseDesc(): string {
    return this.currentLanguage() === 'es'
      ? 'Generalmente respondo dentro de 24 horas'
      : 'I usually respond within 24 hours';
  }

  get immediateLabel(): string {
    return this.currentLanguage() === 'es' ? 'Disponibilidad Inmediata' : 'Immediate Availability';
  }

  get immediateDesc(): string {
    return this.currentLanguage() === 'es'
      ? 'Listo para empezar en nuevos proyectos'
      : 'Ready to start on new projects';
  }

  get ctaText(): string {
    return this.currentLanguage() === 'es'
      ? '¿Tienes un proyecto en mente? ¡Hablemos!'
      : 'Have a project in mind? Let\'s talk!';
  }

  get contactButtonLabel(): string {
    return this.currentLanguage() === 'es' ? 'Contactar' : 'Contact me';
  }

  openContactModal(): void {
    this.contactModalService.open();
  }
}
