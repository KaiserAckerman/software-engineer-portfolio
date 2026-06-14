import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { LanguageService } from '../../core/services/language.service';

interface ExperienceItem {
  id: string;
  gradient: string;
  iconPath?: string;
  image?: string;
  imageAltEs?: string;
  imageAltEn?: string;
  titleEs: string;
  titleEn: string;
  companyEs: string;
  companyEn: string;
  periodEs: string;
  periodEn: string;
  descriptionEs: string;
  descriptionEn: string;
  tagsEs: string[];
  tagsEn: string[];
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
      id: 'exp-freelance',
      gradient: 'from-blue-500 to-indigo-600',
      iconPath: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      titleEs: 'Desarrollador Web Freelance',
      titleEn: 'Freelance Web Developer',
      companyEs: 'Clientes independientes',
      companyEn: 'Independent clients',
      periodEs: '2025 — Presente',
      periodEn: '2025 — Present',
      descriptionEs: 'Desarrollo y mantenimiento de sitios web para clientes en México: tiendas Shopify con Liquid y temas custom, sitios WordPress con PHP y Tailwind. Trabajo directo con clientes desde levantamiento de requisitos hasta producción.',
      descriptionEn: 'Development and maintenance of websites for clients in Mexico: Shopify stores with Liquid and custom themes, WordPress sites with PHP and Tailwind. Direct client work from requirements gathering through production.',
      tagsEs: ['Shopify', 'WordPress', 'Liquid', 'Figma'],
      tagsEn: ['Shopify', 'WordPress', 'Liquid', 'Figma']
    },
    {
      id: 'exp-upqroo',
      gradient: 'from-slate-100 to-blue-50',
      image: '/assets/UPQROO.png',
      imageAltEs: 'Logotipo de la Universidad Politécnica de Quintana Roo',
      imageAltEn: 'Polytechnic University of Quintana Roo logo',
      titleEs: 'Ingeniería de Software',
      titleEn: 'Software Engineering',
      companyEs: 'Universidad Politécnica de Quintana Roo (UPQROO)',
      companyEn: 'Polytechnic University of Quintana Roo (UPQROO)',
      periodEs: '2022 — 2025 · Titulado',
      periodEn: '2022 — 2025 · Graduated',
      descriptionEs: 'Licenciatura en Ingeniería de Software. Egresado en 2025. Proyecto de estadías profesionales (~600 h): rediseño integral de tienda Shopify para Wattko, incluido en requisitos de titulación.',
      descriptionEn: 'Bachelor\'s degree in Software Engineering. Graduated in 2025. Professional internship capstone (~600 hrs): full Shopify store redesign for Wattko, included in graduation requirements.',
      tagsEs: ['Ingeniería de Software', 'Estadías', 'Proyecto de titulación'],
      tagsEn: ['Software Engineering', 'Internship', 'Capstone project']
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
      ? 'Formación y experiencia'
      : 'Education & experience';
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

  getTags(exp: ExperienceItem): string[] {
    return this.currentLanguage() === 'es' ? exp.tagsEs : exp.tagsEn;
  }

  getImageAlt(exp: ExperienceItem): string {
    return this.currentLanguage() === 'es'
      ? (exp.imageAltEs ?? '')
      : (exp.imageAltEn ?? '');
  }

  getDelayClass(index: number): string {
    return `scroll-reveal-delay-${Math.min(index + 1, 5)}`;
  }
}
