import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill, SkillCategory } from '../../core/models/skill.model';
import { LanguageService } from '../../core/services/language.service';
import { translations } from '../../shared/constants/translations.constant';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  currentLanguage = signal<'es' | 'en'>('es');
  selectedFilter = signal<SkillCategory | 'all'>('all');
  
  // Array de filtros disponibles
  filters: (SkillCategory | 'all')[] = ['all', 'backend', 'frontend', 'database', 'tools', 'soft'];
  
  // Array de habilidades - puedes agregar más aquí
  skills: Skill[] = [
    // Backend
    { id: 'nestjs', name: 'NestJS', type: 'technical', category: 'backend', icon: '/assets/skills/nestjs.svg' },
    { id: 'nodejs', name: 'Node.js', type: 'technical', category: 'backend', icon: '/assets/skills/nodejs.svg' },
    { id: 'php', name: 'PHP', type: 'technical', category: 'backend', icon: '/assets/skills/php.svg' },
    { id: 'rest-apis', name: 'APIs REST', type: 'technical', category: 'backend', icon: '/assets/skills/api.svg' },
    
    // Frontend
    { id: 'react', name: 'React.js', type: 'technical', category: 'frontend', icon: '/assets/skills/react.svg' },
    { id: 'javascript', name: 'JavaScript', type: 'technical', category: 'frontend', icon: '/assets/skills/javascript.svg' },
    { id: 'html-css', name: 'HTML5/CSS3', type: 'technical', category: 'frontend', icon: '/assets/skills/html5.svg' },
    
    // Base de Datos
    { id: 'postgresql', name: 'PostgreSQL', type: 'technical', category: 'database', icon: '/assets/skills/postgresql.svg' },
    { id: 'mysql', name: 'MySQL', type: 'technical', category: 'database', icon: '/assets/skills/mysql.svg' },
    { id: 'sql', name: 'SQL', type: 'technical', category: 'database', icon: '/assets/skills/sql.svg' },
    
    // Herramientas
    { id: 'figma', name: 'Figma', type: 'technical', category: 'tools', icon: '/assets/skills/figma.svg' },
    { id: 'git', name: 'Git / GitHub', type: 'technical', category: 'tools', icon: '/assets/skills/git.svg' },
    
    // Habilidades Blandas (sin iconos/logos)
    { id: 'communication', name: 'Comunicación', type: 'soft', category: 'soft' },
    { id: 'teamwork', name: 'Trabajo en Equipo', type: 'soft', category: 'soft' },
    { id: 'problem-solving', name: 'Resolución de Problemas', type: 'soft', category: 'soft' },
    { id: 'leadership', name: 'Liderazgo', type: 'soft', category: 'soft' },
    { id: 'adaptability', name: 'Adaptabilidad', type: 'soft', category: 'soft' },
    { id: 'time-management', name: 'Gestión del Tiempo', type: 'soft', category: 'soft' }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLanguage.set(this.languageService.current);
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage.set(lang);
    });
  }

  getFilteredSkills(): Skill[] {
    if (this.selectedFilter() === 'all') {
      return this.skills;
    }
    return this.skills.filter(skill => skill.category === this.selectedFilter());
  }

  setFilter(filter: SkillCategory | 'all'): void {
    this.selectedFilter.set(filter);
  }

  getFilterLabel(filter: SkillCategory | 'all'): string {
    if (filter === 'all') {
      return translations[this.currentLanguage()].skills.filters.all;
    }
    return translations[this.currentLanguage()].skills.filters[filter];
  }

  getCategoryLabel(category: SkillCategory): string {
    return translations[this.currentLanguage()].skills.categories[category];
  }

  getTitle(): string {
    return translations[this.currentLanguage()].skills.title;
  }

  shouldCenterGrid(): boolean {
    return this.getFilteredSkills().length <= 6;
  }
}
