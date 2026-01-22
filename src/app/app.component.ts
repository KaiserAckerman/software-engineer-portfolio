import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { AvailabilityComponent } from './sections/availability/availability.component';
import { ScrollSnapService } from './core/services/scroll-snap.service';
import { LanguageService } from './core/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    AvailabilityComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  private languageSubscription?: Subscription;

  constructor(
    private scrollSnapService: ScrollSnapService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    // Inicializar el servicio de scroll snap
    this.scrollSnapService.initialize();

    // Actualizar título inicial
    this.updatePageTitle(this.languageService.current);

    // Suscribirse a cambios de idioma para actualizar el título
    this.languageSubscription = this.languageService.language$.subscribe(lang => {
      this.updatePageTitle(lang);
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private updatePageTitle(lang: 'es' | 'en'): void {
    const titles = {
      es: 'Roberto Vallejo | Ingeniero de Software',
      en: 'Roberto Vallejo | Software Engineer'
    };

    if (typeof document !== 'undefined') {
      document.title = titles[lang];
    }
  }
}
