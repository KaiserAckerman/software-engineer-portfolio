import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toogle',
  imports: [CommonModule],
  templateUrl: './theme-toogle.component.html',
  styleUrl: './theme-toogle.component.scss'
})
export class ThemeToogleComponent implements OnInit {
  // Leer el tema inicial directamente del localStorage o preferencia del sistema
  // para evitar el flash visual
  currentTheme = signal<'light' | 'dark'>(this.getInitialTheme());

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // Sincronizar con el servicio
    this.currentTheme.set(this.themeService.current);
    
    // Suscribirse a cambios del tema
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme.set(theme);
    });
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  private getInitialTheme(): 'light' | 'dark' {
    // Leer directamente del localStorage para evitar delay
    if (typeof window === 'undefined') return 'light';
    
    const stored = localStorage.getItem('app_theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    
    // Si no hay preferencia guardada, usar la preferencia del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }
}
