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
        // proximity evita pelear con scroll-behavior: smooth del documento
        mainElement.style.scrollSnapType = 'y proximity';

        // Add snap-align to sections
        const sections = mainElement.querySelectorAll('app-projects, app-about, app-experience, app-contact');
        sections.forEach(section => {
          (section as HTMLElement).style.scrollSnapAlign = 'start';
        });
      }
    }
  }
}
