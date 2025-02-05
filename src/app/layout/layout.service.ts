import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly sidebarState = signal(true);
  readonly isSidebarOpen = this.sidebarState.asReadonly();
  readonly sidebarState$ = toObservable(this.sidebarState);

  toggleSidebar(): void {
    this.sidebarState.update((state) => !state);
  }
}
