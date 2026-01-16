import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'es' | 'en';

const LANGUAGE_STORAGE_KEY = 'app_language';
const DEFAULT_LANGUAGE: Language = 'es';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly languageSubject = new BehaviorSubject<Language>(this.resolveInitialLanguage());
  readonly language$ = this.languageSubject.asObservable();

  constructor() {
    this.applyLanguage(this.languageSubject.value);
  }

  get current(): Language {
    return this.languageSubject.value;
  }

  setLanguage(lang: Language): void {
    if (lang === this.current) return;
    this.languageSubject.next(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
    this.applyLanguage(lang);
  }

  toggle(): Language {
    const next: Language = this.current === 'es' ? 'en' : 'es';
    this.setLanguage(next);
    return next;
  }

  private resolveInitialLanguage(): Language {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === 'es' || stored === 'en') return stored;
      const navLang = navigator.language?.toLowerCase();
      if (navLang.startsWith('es')) return 'es';
      if (navLang.startsWith('en')) return 'en';
    }
    return DEFAULT_LANGUAGE;
  }

  private applyLanguage(lang: Language): void {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
  }
}
