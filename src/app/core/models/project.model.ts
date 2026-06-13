export interface Project {
  id: string;
  titleEs: string;
  titleEn: string;
  summaryEs: string;
  summaryEn: string;
  year?: number;
  technologies: string[];
  cardTechnologies?: string[];
  image?: string;
  gradient?: string;
  iconPath?: string;
  highlight?: boolean;
  order?: number;

  roleEs?: string;
  roleEn?: string;
  contextEs?: string;
  contextEn?: string;
  contributionsEs?: string[];
  contributionsEn?: string[];
  link?: string;
  github?: string;
}
