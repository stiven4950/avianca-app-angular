import { Component, Input } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'item-navigation',
  standalone: true,
  imports: [FontAwesomeModule, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './item-navigation.component.html',
  styleUrl: './item-navigation.component.css'
})
export class ItemNavigationComponent {
  @Input({required: true}) icon!: IconProp;
  @Input({required: true}) name!: string;
  @Input({required: true}) route!: string;
}
