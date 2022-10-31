import { Component } from '@angular/core';
import { FullLoaderService } from '@core/services/full-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(protected fullLoader: FullLoaderService) {}
}
