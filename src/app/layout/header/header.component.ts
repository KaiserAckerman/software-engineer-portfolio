import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { ThemeService } from '../../core/services/theme.service';
import { ScrollSnapService } from '../../core/services/scroll-snap.service';
import { LanguageToggleComponent } from '../../shared/components/language-toggle/language-toggle.component';
import { ThemeToogleComponent } from '../../shared/components/theme-toogle/theme-toogle.component';
import { translations } from '../../shared/constants/translations.constant';
import { socialLinks } from '../../shared/constants/social-links.constant';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LanguageToggleComponent, ThemeToogleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentLanguage = signal<'es' | 'en'>('es');
  isMenuOpen = signal(false);
  socialLinks = socialLinks;

  navItems = [
    { id: 'hero', key: 'home' as const },
    { id: 'skills', key: 'skills' as const },
    { id: 'projects', key: 'projects' as const },
    { id: 'experience', key: 'experience' as const },
    { id: 'availability', key: 'availability' as const }
  ];

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService,
    private scrollSnapService: ScrollSnapService
  ) {}

  ngOnInit(): void {
    this.currentLanguage.set(this.languageService.current);
    this.languageService.language$.subscribe(lang => {
      this.currentLanguage.set(lang);
    });
  }

  getNavLabel(key: 'home' | 'skills' | 'projects' | 'experience' | 'availability'): string {
    return translations[this.currentLanguage()].header[key];
  }

  scrollToSection(sectionId: string): void {
    this.scrollSnapService.scrollToSectionById(sectionId);
      this.isMenuOpen.set(false);
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  openSocialLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}