import { Component } from '@angular/core';
import { ItemNavigationComponent } from './item-navigation/item-navigation.component';
import { faGear, faPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'menu-bar',
  standalone: true,
  imports: [ItemNavigationComponent],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  airplanesIcon = faPlane;
  configurationIcon = faGear;
}
