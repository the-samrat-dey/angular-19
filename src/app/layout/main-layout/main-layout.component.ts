import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `<app-header /><router-outlet />`,
})
export class MainLayoutComponent {
  protected layoutService = inject(LayoutService);
}
