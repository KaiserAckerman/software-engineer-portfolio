export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tu-perfil',
    icon: 'linkedin'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/tu-usuario',
    icon: 'github'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/tu-usuario',
    icon: 'twitter'
  },
  {
    name: 'Email',
    url: 'mailto:tu-email@ejemplo.com',
    icon: 'email'
  }
];

