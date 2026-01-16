export interface Experience {
  id: string;
  role: string;              // Rol o puesto
  company: string;           // Empresa o institución
  period: string;            // Ej. '2022 - Actualidad'
  summary: string;           // Resumen corto
  technologies?: string[];   // IDs de Skill técnicas usadas
  order?: number;            // Para ordenar en UI
}

