import { Component } from '@angular/core';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

@Component({
  selector: 'app-root',
  template: `<app-leaflet-map></app-leaflet-map>`,
  standalone: true,  // standalone AppComponent
  imports: [LeafletMapComponent],  // Import standalone komponenty
})
export class AppComponent {
  title = 'My Angular Standalone App';
}

