import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { AvailabilityComponent } from './sections/availability/availability.component';
import { ScrollSnapService } from './core/services/scroll-snap.service';
import { ViewportOptimizerService } from './core/services/viewport-optimizer.service';
import { LazySectionDirective } from './shared/directives/lazy-section.directive';

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
    AvailabilityComponent,
    LazySectionDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private scrollSnapService: ScrollSnapService,
    private viewportOptimizer: ViewportOptimizerService
  ) {}

  ngOnInit(): void {
    // Inicializar el servicio de scroll snap
    this.scrollSnapService.initialize();
    // El servicio de viewport optimizer se inicializa automáticamente en su constructor
  }
}
