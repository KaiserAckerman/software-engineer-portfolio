import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toogle',
  imports: [CommonModule],
  templateUrl: './theme-toogle.component.html',
  styleUrl: './theme-toogle.component.scss'
})
export class ThemeToogleComponent implements OnInit {
  currentTheme: 'light' | 'dark' = 'light';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.current;
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
