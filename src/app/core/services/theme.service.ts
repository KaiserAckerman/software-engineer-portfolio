import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'app_theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly prefersDark = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  private readonly storedTheme = (): Theme | null => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    return raw === 'light' || raw === 'dark' ? raw : null;
  };

  private readonly themeSubject = new BehaviorSubject<Theme>(this.resolveInitialTheme());

  readonly theme$ = this.themeSubject.asObservable();

  constructor() {
    // Aplicar tema sin favicon primero (por si el DOM aún no está listo)
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const theme = this.themeSubject.value;
      root.classList.remove('light', 'dark');
      if (theme === 'dark') {
        root.classList.add('dark');
      }
    }

    // Asegurar que el favicon se cargue después de que el DOM esté listo
    if (typeof window !== 'undefined') {
      // Usar setTimeout para asegurar que el DOM esté completamente cargado
      setTimeout(() => {
        this.updateFavicon(this.themeSubject.value);
      }, 100);
    }
  }

  get current(): Theme {
    return this.themeSubject.value;
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
    this.applyTheme(theme);
  }

  toggle(): Theme {
    const next: Theme = this.current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }

  private resolveInitialTheme(): Theme {
    const stored = this.storedTheme();
    if (stored) return stored;
    return this.prefersDark() ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    // Remover ambas clases primero
    root.classList.remove('light', 'dark');
    // Agregar solo la clase correspondiente (Tailwind usa 'dark' para dark mode)
    if (theme === 'dark') {
      root.classList.add('dark');
    }
    // Para light mode, no necesitamos agregar clase, solo asegurarnos de que 'dark' no esté

    // Actualizar favicon según el tema
    this.updateFavicon(theme);
  }

  private updateFavicon(theme: Theme): void {
    if (typeof document === 'undefined') return;

    // Remover favicons existentes
    const existingFavicons = document.querySelectorAll('link[rel="icon"], link[rel="alternate icon"]');
    existingFavicons.forEach(link => link.remove());

    // Colores según el tema (igual que en el header)
    const bgColor = theme === 'dark' ? '#ffffff' : '#111827';
    const borderColor = theme === 'dark' ? '#d1d5db' : '#374151';

    // Gradiente del texto según el tema
    let gradientColors;
    if (theme === 'dark') {
      // Gradiente más claro para dark mode (como en el header)
      gradientColors = `
        <stop offset="0%" style="stop-color:#60a5fa;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#818cf8;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#a78bfa;stop-opacity:1" />
      `;
    } else {
      // Gradiente más oscuro para light mode (como en el header)
      gradientColors = `
        <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#6366f1;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
      `;
    }

    // Crear nuevo favicon SVG dinámico
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <defs>
          <linearGradient id="rvGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            ${gradientColors}
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="${bgColor}" stroke="${borderColor}" stroke-width="2"/>
        <text x="32" y="42" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="url(#rvGradient)">RV</text>
      </svg>
    `.trim();

    // Convertir SVG a data URL
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    // Crear link element para el favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = url;

    // Agregar al head
    document.head.appendChild(link);

    // Limpiar URL después de un momento (opcional)
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
}
