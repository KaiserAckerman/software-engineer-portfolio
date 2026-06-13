import { Project } from '../../core/models/project.model';

const DEFAULT_ICON =
  'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4';

export const PROJECTS: Project[] = [
  {
    id: 'prod-wattko',
    titleEs: 'Wattko',
    titleEn: 'Wattko',
    summaryEs:
      'Tienda Shopify de iluminación LED con venta online y asesoría técnica.',
    summaryEn:
      'Shopify LED lighting store with online sales and technical advisory.',
    year: 2025,
    highlight: true,
    order: 1,
    image: '/assets/projects/wattko/cover.webp',
    gradient: 'from-yellow-500 to-amber-600',
    iconPath: DEFAULT_ICON,
    roleEs: 'Desarrollador Shopify y diseñador de interfaces',
    roleEn: 'Shopify Developer and UI Designer',
    contextEs:
      'Proyecto de estadías (~600 h) para graduación: rediseño integral de la tienda en línea de Wattko, comercio de iluminación LED en México. El sitio original, armado por el dueño con una plantilla genérica, tenía mala UX, bajas conversiones, carencias operativas y pocas herramientas para promocionar contenido. Propuse una nueva identidad de marca y paleta de colores, prototipé las interfaces en Figma mediante iteración constante con el cliente y desarrollé la tienda en Shopify con código custom en el tema (Liquid, HTML, CSS y JavaScript), priorizando secciones editables desde el editor de la plataforma.',
    contextEn:
      'Internship capstone project (~600 hrs) for graduation: full redesign of Wattko\'s online store, an LED lighting retailer in Mexico. The original site, built by the owner from a generic template, had poor UX, low conversions, operational gaps, and limited tools to promote content on social media. I proposed a new brand identity and color palette, prototyped interfaces in Figma through constant iteration with the client, and built the Shopify store with custom theme code (Liquid, HTML, CSS, and JavaScript), prioritizing sections the client can manage from the theme editor.',
    contributionsEs: [
      'Levanté requerimientos con el cliente y prototipé las interfaces en Figma mediante ciclos de diseño hasta validar cada página de la nueva tienda.',
      'Definí identidad visual y paleta de colores para sustituir la plantilla genérica y alinear marca, catálogo y experiencia de compra.',
      'Programé secciones y funcionalidades custom en Liquid, HTML, CSS y JavaScript, combinando código del tema con herramientas nativas de Shopify.',
      'Diseñé bloques editables en el theme editor para que el cliente actualice contenido, promociones y secciones sin depender de desarrollo.',
    ],
    contributionsEn: [
      'Gathered requirements with the client and prototyped interfaces in Figma through design cycles until each page of the new store was approved.',
      'Defined visual identity and color palette to replace the generic template and align brand, catalog, and shopping experience.',
      'Built custom sections and features in Liquid, HTML, CSS, and JavaScript, combining theme code with Shopify\'s native tools.',
      'Designed theme-editor blocks so the client can update content, promotions, and sections without developer dependency.',
    ],
    technologies: ['Shopify', 'Liquid', 'HTML', 'CSS', 'JavaScript', 'Figma'],
    link: 'https://www.wattko.com/',
  },
  {
    id: 'prod-dadyo-mezcal',
    titleEs: "Dady'O Mezcal",
    titleEn: "Dady'O Mezcal",
    summaryEs:
      'Tienda Shopify de mezcal artesanal: venta, marca, proceso y cócteles.',
    summaryEn:
      'Artisan mezcal Shopify store: sales, brand story, process, and cocktails.',
    year: 2026,
    highlight: true,
    order: 2,
    image: '/assets/projects/dadyo-mezcal/cover.webp',
    gradient: 'from-amber-500 to-orange-600',
    iconPath: DEFAULT_ICON,
    roleEs: 'Desarrollador Shopify',
    roleEn: 'Shopify Developer',
    contextEs:
      'Tienda en línea para DADY\'O Mezcal, marca de mezcal artesanal de Oaxaca. Al incorporarme, el sitio estaba incompleto y con fallas de código y de interfaz; faltaban secciones y funcionalidades clave. Trabajé de forma continua con el cliente para estabilizar la tienda, resolver incidencias y materializar sus ideas en el tema Shopify.',
    contextEn:
      'Online store for DADY\'O Mezcal, an artisan mezcal brand from Oaxaca. When I joined, the site was incomplete with code and UI issues, and key sections and features were missing. I worked continuously with the client to stabilize the store, fix issues, and turn their ideas into code on the Shopify theme.',
    contributionsEs: [
      'Diagnostiqué y corregí fallas de código, diseño e integraciones en el tema Shopify (Liquid, HTML, CSS y JavaScript).',
      'Desarrollé nuevas secciones y funcionalidades a partir de las ideas del cliente: storytelling de marca, proceso artesanal y recetas de cócteles.',
      'Brindé mantenimiento continuo, orientación al cliente y propuestas de mejora para la experiencia de compra y la identidad visual de la tienda.',
    ],
    contributionsEn: [
      'Diagnosed and fixed code, design, and integration issues in the Shopify theme (Liquid, HTML, CSS, and JavaScript).',
      'Built new sections and features from client ideas: brand storytelling, craft process, and cocktail recipes.',
      'Provided ongoing maintenance, client guidance, and improvement proposals for the shopping experience and store visual identity.',
    ],
    technologies: ['Shopify', 'Liquid', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://dadyomezcal.mx/',
  },
  {
    id: 'prod-marian-castro-garza',
    titleEs: 'Marian Castro Garza',
    titleEn: 'Marian Castro Garza',
    summaryEs:
      'Portfolio WordPress de artista contemporánea con galería de obras en venta.',
    summaryEn:
      'WordPress portfolio for a contemporary artist with artwork gallery for sale.',
    year: 2026,
    highlight: true,
    order: 3,
    image: '/assets/projects/marian-castro-garza/cover.webp',
    gradient: 'from-rose-500 to-violet-600',
    iconPath: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    roleEs: 'Desarrollador WordPress y diseñador de interfaces',
    roleEn: 'WordPress Developer and UI Designer',
    contextEs:
      'La clienta había contratado a una agencia para su sitio web de exposición de obras, pero no quedó satisfecha con el resultado. Me contactó para mejorarlo y finalmente se optó por rehacerlo por completo sobre la infraestructura ya desplegada en Hostinger con WordPress. Realicé levantamiento de requerimientos para entender qué buscaba, qué rechazaba del sitio anterior y qué referencias orientarían el diseño. Prototipé cada página en Figma y, una vez aprobado, desarrollé el tema custom en Local WP para pruebas locales antes de producción, con control de versiones en GitHub. Cerré con trabajo de SEO y monitoreo en Google Search Console.',
    contextEn:
      'The client had hired an agency for her artwork showcase website but was unsatisfied with the result. She reached out to improve it and ultimately decided on a full rebuild on the existing Hostinger and WordPress setup. I gathered requirements to understand her goals, what she rejected from the previous site, and design references. I prototyped each page in Figma and, once approved, built the custom theme in Local WP for local testing before production, with version control on GitHub. I finished with SEO work and monitoring through Google Search Console.',
    contributionsEs: [
      'Levanté requerimientos, realicé research de UX/UI y prototipé en Figma cada página hasta validarlas con la clienta.',
      'Desarrollé un tema WordPress a medida en PHP con Tailwind CSS, JavaScript nativo y Polylang para español e inglés.',
      'Monté la infraestructura y la base de datos en WordPress para gestionar el catálogo de obras.',
      'Implementé SEO y monitoreo con Google Search Console para medir las interacciones del sitio.',
    ],
    contributionsEn: [
      'Gathered requirements, conducted UX/UI research, and prototyped each page in Figma until approved by the client.',
      'Built a custom WordPress theme in PHP with Tailwind CSS, vanilla JavaScript, and Polylang for Spanish and English.',
      'Set up infrastructure and database in WordPress to manage the artwork catalog.',
      'Implemented SEO and monitoring with Google Search Console to track site interactions.',
    ],
    technologies: ['WordPress', 'PHP', 'Tailwind CSS', 'JavaScript', 'Polylang', 'Figma', 'GitHub'],
    link: 'https://mariancastrogarza.com/',
  },
  {
    id: 'prod-kunko',
    titleEs: 'Kunko',
    titleEn: 'Kunko',
    summaryEs:
      'Tienda WooCommerce de bebidas energéticas naturales de yerba mate y maracuyá.',
    summaryEn:
      'WooCommerce store for natural yerba mate and passion fruit energy drinks.',
    year: 2026,
    highlight: false,
    order: 4,
    image: '/assets/projects/kunko/Kunko.webp',
    gradient: 'from-green-500 to-lime-600',
    iconPath: DEFAULT_ICON,
    roleEs: 'Desarrollador WordPress',
    roleEn: 'WordPress Developer',
    contextEs:
      'Mantenimiento continuo de la tienda en línea de Kunko, marca de bebidas energéticas naturales a base de yerba mate en la Riviera Maya. Analicé cómo estaba construido el sitio en WordPress con WooCommerce y Elementor para aplicar los ajustes y nuevas funcionalidades que solicitaba la empresa, además de atender errores e incidencias en producción.',
    contextEn:
      'Ongoing maintenance of Kunko\'s online store, a natural yerba mate energy drink brand in the Riviera Maya. I analyzed how the site was built with WordPress, WooCommerce, and Elementor to apply adjustments and new features requested by the company, while also handling production errors and issues.',
    contributionsEs: [
      'Analicé la estructura del sitio (WordPress, WooCommerce y Elementor) para entender cómo aplicar cambios de forma segura.',
      'Implementé ajustes y nuevas funcionalidades solicitadas por la empresa en la tienda en línea.',
      'Diagnostiqué y resolví errores e incidencias en producción de forma continua.',
    ],
    contributionsEn: [
      'Analyzed the site structure (WordPress, WooCommerce, and Elementor) to understand how to apply changes safely.',
      'Implemented adjustments and new features requested by the company on the online store.',
      'Diagnosed and resolved production errors and issues on an ongoing basis.',
    ],
    technologies: ['WordPress', 'WooCommerce', 'Elementor', 'PHP', 'CSS'],
    link: 'https://kunko.mx/',
  },
  {
    id: 'prod-villa-bianca-cancun',
    titleEs: 'Villa Bianca Cancún',
    titleEn: 'Villa Bianca Cancún',
    summaryEs:
      'Plataforma WordPress para reservar suites de lujo en Cancún.',
    summaryEn:
      'WordPress platform to book luxury suites in Cancún.',
    year: 2026,
    highlight: false,
    order: 5,
    image: '/assets/projects/villabianca/Villabianca.webp',
    gradient: 'from-cyan-500 to-blue-600',
    iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    roleEs: 'Desarrollador WordPress',
    roleEn: 'WordPress Developer',
    contextEs:
      'Mantenimiento del sitio web de Villa Bianca Cancún, plataforma en WordPress para reservaciones de suites de lujo en la zona hotelera. Orienté al cliente para llevar a cabo sus ideas, además de realizar ajustes de textos, tamaños, márgenes y estilos, e integrar nuevas funcionalidades y secciones al sitio.',
    contextEn:
      'Maintenance of the Villa Bianca Cancún website, a WordPress platform for booking luxury suites in the hotel zone. I guided the client to implement their ideas, adjusted copy, sizing, margins, and styles, and integrated new features and sections on the site.',
    contributionsEs: [
      'Brindé mantenimiento continuo y orientación al cliente para materializar sus ideas en el sitio.',
      'Ajusté textos, tamaños, márgenes y estilos en páginas construidas con Elementor.',
      'Integré nuevas funcionalidades y secciones para la reserva de suites disponibles.',
    ],
    contributionsEn: [
      'Provided ongoing maintenance and client guidance to turn their ideas into site updates.',
      'Adjusted copy, sizing, margins, and styles on pages built with Elementor.',
      'Integrated new features and sections for booking available luxury suites.',
    ],
    technologies: ['WordPress', 'Elementor', 'PHP', 'CSS'],
    link: 'https://villabiancacancun.com/',
  },
  {
    id: 'prod-cbtis-272',
    titleEs: 'CBTis 272',
    titleEn: 'CBTis 272',
    summaryEs:
      'Sitio informativo para la preparatoria CBTis 272 en Quintana Roo.',
    summaryEn:
      'Informational website for CBTis 272 preparatory school in Quintana Roo.',
    year: 2026,
    highlight: false,
    order: 6,
    image: '/assets/projects/cbtis272/Cbtis272.webp',
    gradient: 'from-indigo-500 to-blue-600',
    iconPath: DEFAULT_ICON,
    roleEs: 'Desarrollador Full Stack',
    roleEn: 'Full Stack Developer',
    contextEs:
      'Desarrollo del sitio web informativo del CBTis 272, preparatoria pública en Quintana Roo. Trabajé en equipo: una persona lideró el prototipado en Figma y yo implementé los diseños sobre una base de código legacy que reestructuré por completo, manteniendo las mismas tecnologías. Reescribí la lógica del backend desde cero con Node.js, Express y MongoDB, desarrollé el frontend con HTML, Tailwind CSS y JavaScript, y desplegué el sitio asegurando el funcionamiento correcto de toda la plataforma.',
    contextEn:
      'Development of the CBTis 272 informational website, a public preparatory school in Quintana Roo. I worked on a team: one person led Figma prototyping and I implemented the designs on top of legacy code that I fully restructured while keeping the same technologies. I rewrote the backend logic from scratch with Node.js, Express, and MongoDB, built the frontend with HTML, Tailwind CSS, and JavaScript, and deployed the site ensuring the full platform worked correctly.',
    contributionsEs: [
      'Reestructuré el código legacy del frontend e implementé las interfaces a partir de los diseños en Figma.',
      'Rediseñé y desarrollé el backend desde cero con Node.js, Express, MongoDB y JWT, incluyendo carga de Excel e imágenes.',
      'Desplegué el sitio y validé el funcionamiento integral de la plataforma en producción.',
    ],
    contributionsEn: [
      'Restructured legacy frontend code and implemented interfaces from Figma designs.',
      'Redesigned and built the backend from scratch with Node.js, Express, MongoDB, and JWT, including Excel and image uploads.',
      'Deployed the site and validated full platform functionality in production.',
    ],
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    cardTechnologies: ['Node.js', 'MongoDB', 'Tailwind CSS'],
    link: 'https://www.cbtis272.mx/',
  },
];

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const highlightA = a.highlight ? 0 : 1;
    const highlightB = b.highlight ? 0 : 1;
    if (highlightA !== highlightB) return highlightA - highlightB;
    return (a.order ?? 99) - (b.order ?? 99);
  });
}
