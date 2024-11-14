import { Component } from '@angular/core';
import { ItemNavigationComponent } from './item-navigation/item-navigation.component';
import { faGear, faPlane, faPlaneCircleCheck, faTicket, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'menu-bar',
  standalone: true,
  imports: [ItemNavigationComponent],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent {
  airplanesIcon = faPlane;
  fligthsIcon = faPlaneCircleCheck;
  ticketsIcon = faTicket;
  clientsIcon = faUsers;
  configurationIcon = faGear;
}
