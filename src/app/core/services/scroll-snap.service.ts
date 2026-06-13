import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollSnapService {

  constructor() { }

  initialize(): void {
    // Desactivado: scroll-snap + scroll-behavior: smooth compiten y ralentizan la navegación.
  }
}
