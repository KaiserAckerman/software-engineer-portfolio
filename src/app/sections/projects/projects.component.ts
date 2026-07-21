import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { LanguageService } from '../../core/services/language.service';
import { Project } from '../../core/models/project.model';
import { PROJECTS, sortProjects } from '../../shared/constants/projects.constant';
import { translations } from '../../shared/constants/translations.constant';
import { ProjectDetailModalComponent } from '../../shared/components/project-detail-modal/project-detail-modal.component';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ScrollRevealDirective, ProjectDetailModalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  currentLanguage = signal<'es' | 'en'>('es');
  selectedProject = signal<Project | null>(null);
  modalOpen = signal(false);

  productionProjects = sortProjects(PROJECTS);

  labels = computed(() => translations[this.currentLanguage()].projects);

  private readonly defaultIcon =
    'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLanguage.set(this.languageService.current);
    this.languageService.language$.subscribe((lang) => this.currentLanguage.set(lang));
  }

  getTitle(project: Project): string {
    return this.currentLanguage() === 'es' ? project.titleEs : project.titleEn;
  }

  getSummary(project: Project): string {
    return this.currentLanguage() === 'es' ? project.summaryEs : project.summaryEn;
  }

  getBadge(project: Project): string {
    return project.badgeType === 'lab'
      ? this.labels().badgeLab
      : this.labels().badgeProduction;
  }

  getIconPath(project: Project): string {
    return project.iconPath ?? this.defaultIcon;
  }

  getCardTags(project: Project): string[] {
    if (project.cardTechnologies?.length) {
      return project.cardTechnologies.slice(0, 3);
    }

    const tags = project.technologies.slice(0, 3);

    if (!tags.includes('HTML') || !project.technologies.includes('JavaScript')) {
      return tags;
    }

    if (tags.includes('JavaScript')) {
      const withoutHtml = tags.filter((tag) => tag !== 'HTML');
      if (withoutHtml.length < 3) {
        const next = project.technologies.find(
          (tech) => tech !== 'HTML' && !withoutHtml.includes(tech),
        );
        if (next) withoutHtml.push(next);
      }
      return withoutHtml.slice(0, 3);
    }

    return tags.map((tag) => (tag === 'HTML' ? 'JavaScript' : tag));
  }

  getDelayClass(index: number): string {
    return `scroll-reveal-delay-${Math.min(index + 1, 5)}`;
  }

  openProject(project: Project): void {
    this.selectedProject.set(project);
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
    this.selectedProject.set(null);
  }

  onCardKeydown(event: KeyboardEvent, project: Project): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openProject(project);
    }
  }
}
