import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  currentLanguage = signal<'es' | 'en'>('es');

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLanguage.set(this.languageService.current);
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage.set(lang);
    });
  }

  get title(): string {
    return this.currentLanguage() === 'es' ? 'Acerca de' : 'About';
  }

  get subtitle(): string {
    return this.currentLanguage() === 'es'
      ? 'Conóceme un poco más'
      : 'Get to know me a little better';
  }

  get bio1(): string {
    return this.currentLanguage() === 'es'
      ? 'Soy un Ingeniero de Software apasionado por construir productos digitales que generen impacto real. Me especializo en desarrollo full-stack con enfoque en el backend, aunque disfruto trabajar en todas las capas de una aplicación.'
      : "I'm a Software Engineer passionate about building digital products that make a real impact. I specialize in full-stack development with a focus on the backend, although I enjoy working across all layers of an application.";
  }

  get bio2(): string {
    return this.currentLanguage() === 'es'
      ? 'Me motiva resolver problemas complejos con soluciones elegantes y mantenibles. Disfruto aprender nuevas tecnologías, colaborar con equipos multidisciplinarios y seguir creciendo profesionalmente cada día.'
      : 'I am motivated by solving complex problems with elegant and maintainable solutions. I enjoy learning new technologies, collaborating with cross-functional teams, and continuing to grow professionally every day.';
  }

  get techTitle(): string {
    return this.currentLanguage() === 'es' ? 'Tecnologías principales' : 'Main technologies';
  }

  get softTitle(): string {
    return this.currentLanguage() === 'es' ? 'Habilidades blandas' : 'Soft skills';
  }

  get valuesTitle(): string {
    return this.currentLanguage() === 'es' ? 'Lo que me define' : 'What defines me';
  }

  techStack = [
    { name: 'Angular', icon: '/assets/skills/angular.svg' },
    { name: 'NestJS', icon: '/assets/skills/nestjs.svg' },
    { name: 'Node.js', icon: '/assets/skills/nodejs.svg' },
    { name: 'React.js', icon: '/assets/skills/react.svg' },
    { name: 'PostgreSQL', icon: '/assets/skills/postgresql.svg' },
    { name: 'PHP', icon: '/assets/skills/php.svg' },
    { name: 'Git / GitHub', icon: '/assets/skills/git.svg' },
    { name: 'Figma', icon: '/assets/skills/figma.svg' },
  ];

  softSkills = [
    { es: 'Trabajo en equipo', en: 'Teamwork', icon: '🤝' },
    { es: 'Comunicación', en: 'Communication', icon: '💬' },
    { es: 'Resolución de problemas', en: 'Problem solving', icon: '🧩' },
    { es: 'Adaptabilidad', en: 'Adaptability', icon: '🔄' },
    { es: 'Aprendizaje continuo', en: 'Continuous learning', icon: '📚' },
    { es: 'Liderazgo', en: 'Leadership', icon: '🚀' },
  ];

  values = [
    {
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      es: 'Código limpio',
      en: 'Clean code',
      descEs: 'Escribo código legible, mantenible y bien estructurado.',
      descEn: 'I write readable, maintainable, and well-structured code.'
    },
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      es: 'Alto rendimiento',
      en: 'High performance',
      descEs: 'Optimizo cada solución para que sea rápida y eficiente.',
      descEn: 'I optimize every solution to be fast and efficient.'
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0',
      es: 'Colaboración',
      en: 'Collaboration',
      descEs: 'Trabajo bien en equipo y aporto valor en cada proyecto.',
      descEn: 'I work well in teams and bring value to every project.'
    },
  ];

  getSoftSkillLabel(skill: { es: string; en: string }): string {
    return this.currentLanguage() === 'es' ? skill.es : skill.en;
  }

  getValueLabel(v: { es: string; en: string }): string {
    return this.currentLanguage() === 'es' ? v.es : v.en;
  }

  getValueDesc(v: { descEs: string; descEn: string }): string {
    return this.currentLanguage() === 'es' ? v.descEs : v.descEn;
  }
}
