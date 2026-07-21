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
    id: 'lab-nodekit',
    titleEs: 'NodeKit',
    titleEn: 'NodeKit',
    summaryEs:
      'Laboratorio Shopify: e-commerce ficticio con ADRs y sprints.',
    summaryEn:
      'Shopify lab: fictional e-commerce with ADRs and sprints.',
    year: 2026,
    highlight: true,
    order: 3,
    badgeType: 'lab',
    image: '/assets/projects/nodekit/nodekit.png',
    gradient: 'from-green-500 to-emerald-600',
    iconPath:
      'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
    roleEs: 'Tech Lead / Solution Architect (laboratorio personal)',
    roleEn: 'Tech Lead / Solution Architect (personal lab)',
    contextEs:
      'Laboratorio de ingeniería personal creado para dominar de punta a punta los conceptos de Shopify que me faltaban. NodeKit es una empresa ficticia —un reseller curado de accesorios tecnológicos cuya propuesta de valor es la certeza de compatibilidad entre productos y dispositivos— que evoluciona sprint a sprint. Cada funcionalidad nace de un problema de negocio simulado (una solicitud de un fundador o de un área de la empresa), no de una lista de tecnologías a practicar, y queda documentada como case study completo: contexto, alternativas consideradas, decisión justificada, arquitectura, implementación y aprendizajes. Yo asumo el rol rotativo de desarrollador, Tech Lead y arquitecto, defendiendo cada decisión técnica frente a la pregunta de un founder pre-revenue: ¿esto ayuda a vender más rápido o es ingeniería que aún no necesitamos?',
    contextEn:
      'A personal engineering lab built to master, end to end, the Shopify concepts I was missing. NodeKit is a fictional company —a curated reseller of tech accessories whose value proposition is compatibility certainty between products and devices— that evolves sprint by sprint. Every feature stems from a simulated business problem (a request from a founder or a business area), not from a checklist of technologies to practice, and is documented as a full case study: context, alternatives considered, justified decision, architecture, implementation, and learnings. I take on the rotating role of developer, Tech Lead, and architect, defending each technical decision against a pre-revenue founder\'s question: does this help us sell faster, or is it engineering we don\'t need yet?',
    contributionsEs: [
      'Diseñé la arquitectura del tema Shopify custom (Online Store 2.0) con Liquid, Sections/Blocks y templates JSON, y modelé la "certeza de compatibilidad" dispositivo-producto con Metafields y Metaobjects.',
      'Construí automatizaciones internas de operación con la Admin API (GraphQL): reportes y alertas de inventario, carga masiva de catálogo (~88 SKUs), reporte de ventas con ingreso neto, devoluciones con motivo y auditoría de configuración de variantes.',
      'Trabajé descubribilidad con Search & Discovery (filtros por metafields) y performance móvil sobre Core Web Vitals, con Lighthouse CI como guardarraíl.',
      'Documenté cada decisión como ADR y cada sprint como case study, aplicando Git orientado a negocio, Conventional Commits, Theme Check y CI con GitHub Actions.',
    ],
    contributionsEn: [
      'Designed the custom Shopify theme architecture (Online Store 2.0) with Liquid, Sections/Blocks, and JSON templates, and modeled device-product "compatibility certainty" with Metafields and Metaobjects.',
      'Built internal operations automations with the Admin API (GraphQL): inventory reports and alerts, bulk catalog loading (~88 SKUs), a sales report with net revenue, returns with reason tracking, and variant configuration auditing.',
      'Worked on discoverability with Search & Discovery (metafield-based filters) and mobile performance around Core Web Vitals, with Lighthouse CI as a guardrail.',
      'Documented every decision as an ADR and every sprint as a case study, applying business-oriented Git, Conventional Commits, Theme Check, and CI with GitHub Actions.',
    ],
    technologies: [
      'Shopify',
      'Liquid',
      'Metafields',
      'Metaobjects',
      'Search & Discovery',
      'Shopify CLI',
      'Admin API GraphQL',
      'Webhooks',
      'Bulk Operations',
      'Shopify Flow',
      'Theme App Extensions',
      'Hydrogen',
      'Remix',
      'React',
      'Checkout Extensibility',
      'Shopify Functions',
      'Customer Accounts',
      'Shopify B2B',
      'Shopify Markets',
      'GitHub Actions',
    ],
    cardTechnologies: ['Shopify', 'Hydrogen', 'Metaobjects'],
    github: 'https://github.com/KaiserAckerman/nodekit',
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
    order: 4,
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
    order: 5,
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
    order: 6,
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
    order: 7,
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
