import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactModalService {
  private readonly openRequest = new Subject<void>();
  readonly openRequested$ = this.openRequest.asObservable();

  open(): void {
    this.openRequest.next();
  }
}
