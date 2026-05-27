import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { LanguageService } from '../../core/services/language.service';

interface ExperienceItem {
  id: string;
  gradient: string;
  iconPath: string;
  titleEs: string;
  titleEn: string;
  companyEs: string;
  companyEn: string;
  periodEs: string;
  periodEn: string;
  descriptionEs: string;
  descriptionEn: string;
  tags: string[];
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {
  currentLanguage = signal<'es' | 'en'>('es');

  experiences: ExperienceItem[] = [
    {
      id: 'exp-1',
      gradient: 'from-blue-500 to-purple-600',
      iconPath: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      titleEs: 'Desarrollador Full Stack Senior',
      titleEn: 'Senior Full Stack Developer',
      companyEs: 'Tech Solutions Inc.',
      companyEn: 'Tech Solutions Inc.',
      periodEs: '2023 — Presente',
      periodEn: '2023 — Present',
      descriptionEs: 'Desarrollo de aplicaciones web escalables, APIs REST y liderazgo técnico en equipos ágiles.',
      descriptionEn: 'Building scalable web applications, REST APIs, and providing technical leadership in agile teams.',
      tags: ['Angular', 'NestJS', 'PostgreSQL']
    },
    {
      id: 'exp-2',
      gradient: 'from-green-500 to-teal-600',
      iconPath: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      titleEs: 'Desarrollador Frontend',
      titleEn: 'Frontend Developer',
      companyEs: 'Digital Agency',
      companyEn: 'Digital Agency',
      periodEs: '2021 — 2023',
      periodEn: '2021 — 2023',
      descriptionEs: 'Interfaces modernas y responsivas en colaboración con equipos de diseño y producto.',
      descriptionEn: 'Modern responsive interfaces in collaboration with design and product teams.',
      tags: ['React', 'TypeScript', 'Figma']
    },
    {
      id: 'exp-3',
      gradient: 'from-orange-500 to-pink-600',
      iconPath: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      titleEs: 'Desarrollador Junior',
      titleEn: 'Junior Developer',
      companyEs: 'Startup Tech',
      companyEn: 'Startup Tech',
      periodEs: '2019 — 2021',
      periodEn: '2019 — 2021',
      descriptionEs: 'Primeros proyectos en producción, aprendizaje continuo y soporte a funcionalidades core.',
      descriptionEn: 'First production projects, continuous learning, and support for core product features.',
      tags: ['JavaScript', 'PHP', 'MySQL']
    }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLanguage.set(this.languageService.current);
    this.languageService.language$.subscribe(lang => this.currentLanguage.set(lang));
  }

  get title(): string {
    return this.currentLanguage() === 'es' ? 'Experiencia' : 'Experience';
  }

  get subtitle(): string {
    return this.currentLanguage() === 'es'
      ? 'Mi trayectoria profesional'
      : 'My professional journey';
  }

  getTitle(exp: ExperienceItem): string {
    return this.currentLanguage() === 'es' ? exp.titleEs : exp.titleEn;
  }

  getCompany(exp: ExperienceItem): string {
    return this.currentLanguage() === 'es' ? exp.companyEs : exp.companyEn;
  }

  getPeriod(exp: ExperienceItem): string {
    return this.currentLanguage() === 'es' ? exp.periodEs : exp.periodEn;
  }

  getDescription(exp: ExperienceItem): string {
    return this.currentLanguage() === 'es' ? exp.descriptionEs : exp.descriptionEn;
  }

  getDelayClass(index: number): string {
    return `scroll-reveal-delay-${Math.min(index + 1, 5)}`;
  }
}
