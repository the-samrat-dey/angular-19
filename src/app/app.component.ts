import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, LoadingComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public readonly title =
    'demo-ng-app sdf   sd fd sf ds f ds fd  f df sd f sd f d f dsf ds f sd f ds f sdf  sdf ds f ds f ds f ds f dsf ds f ds f sdf dsf d';

  private readonly _as12 = this.title;
  public sadasdas = 'safsfsa';
}
