import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-toogle',
  imports: [CommonModule],
  templateUrl: './theme-toogle.component.html',
  styleUrl: './theme-toogle.component.scss'
})
export class ThemeToogleComponent implements OnInit, OnDestroy {
  currentTheme: 'light' | 'dark' = 'light';
  private themeSubscription?: Subscription;

  constructor(private themeService: ThemeService, private cdr: ChangeDetectorRef) {
    this.currentTheme = this.themeService.current;
  }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
