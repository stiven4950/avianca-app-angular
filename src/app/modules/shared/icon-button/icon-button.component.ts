import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'icon-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  @Input({ required: true }) icon!: IconProp;
  @Input({ required: true }) color!: string;
  @Input() size: string = "";
  @Output() click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
}
