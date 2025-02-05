import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    @if (showLoading()) {
      <div class="loading-container">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        @if (loadingText()) {
          <span class="loading-text">{{ loadingText() }}</span>
        }
      </div>
    }
  `,
  styles: [
    `
      .loading-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
      }
      .loading-text {
        position: absolute;
        width: 100%;
        text-align: center;
        margin-top: 8px;
        font-size: 14px;
        color: #666;
      }
    `,
  ],
})
export class LoadingComponent {
  private loadingService = inject(LoadingService);

  // Computed signals for template
  protected showLoading = computed(
    () => this.loadingService.debouncedLoading().isLoading
  );

  protected loadingText = computed(
    () => this.loadingService.debouncedLoading().loadingText
  );
}
