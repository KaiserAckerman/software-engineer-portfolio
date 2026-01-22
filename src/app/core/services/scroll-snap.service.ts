import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollSnapService {

  constructor() { }

  initialize(): void {
    if (typeof window !== 'undefined') {
      // Enable scroll snap on the main element
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.style.scrollSnapType = 'y mandatory';
        mainElement.style.scrollBehavior = 'smooth';

        // Add snap-align to sections
        const sections = mainElement.querySelectorAll('app-hero, app-skills, app-projects, app-experience, app-availability');
        sections.forEach(section => {
          (section as HTMLElement).style.scrollSnapAlign = 'start';
        });
      }
    }
  }
}
