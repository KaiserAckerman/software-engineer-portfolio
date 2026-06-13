import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { AboutComponent } from './sections/about/about.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { ContactComponent } from './sections/contact/contact.component';
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
    ProjectsComponent,
    AboutComponent,
    ExperienceComponent,
    ContactComponent
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
    this.languageSubscription?.unsubscribe();
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
