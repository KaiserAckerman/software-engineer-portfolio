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

    const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (link) {
      const baseHref = theme === 'dark' ? 'favicon-dark.svg' : 'favicon-light.svg';
      link.href = `${baseHref}?t=${Date.now()}`;
    }
  }
}
