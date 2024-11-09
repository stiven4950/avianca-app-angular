import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { IconButtonComponent } from '@modules/shared/icon-button/icon-button.component';

@Component({
  selector: 'modal-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, IconButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() class: String = "";
  @Input() showCloseButton: Boolean = true;
  @Output() onClose: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  closeIcon = faClose;

  handleClose(){
    this.onClose.emit();
  }
}
