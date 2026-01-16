export type SkillType = 'technical' | 'soft';
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'soft';

export interface Skill {
  id: string;          // ej. 'angular', 'typescript', 'communication'
  name: string;        // Nombre legible: 'Angular', 'Comunicación'
  type: SkillType;     // 'technical' | 'soft'
  icon?: string;       // Ruta a icono/logo (ej: '/assets/skills/angular.svg') - opcional para soft skills
  category: SkillCategory;  // 'frontend', 'backend', 'database', 'tools', 'soft'
  order?: number;      // Opcional: para ordenar en UI
}

