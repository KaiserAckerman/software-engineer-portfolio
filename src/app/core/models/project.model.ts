export interface Project {
  id: string;
  title: string;
  description: string;      // Texto corto, sin “muro” de texto
  technologies: string[];   // IDs de Skill técnicas usadas
  link?: string;            // Demo / producción
  github?: string;          // Repositorio
  image?: string;           // Imagen de portada
  year?: number;            // Año del proyecto
  highlight?: boolean;      // Marcar proyectos clave
  order?: number;           // Para ordenar en UI
}

