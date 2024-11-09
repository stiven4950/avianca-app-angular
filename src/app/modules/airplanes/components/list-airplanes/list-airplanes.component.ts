import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Airplane } from '../../../../models/airplane.model';
import { IconButtonComponent } from "../../../shared/icon-button/icon-button.component";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AirplaneProviderService } from '../../../../providers/airplane-provider.service';
import { AirplaneService } from '@services/airplane.service';
import { ToastProviderService } from '../../../../providers/toast-provider.service';

@Component({
  selector: 'app-list-airplanes',
  standalone: true,
  imports: [IconButtonComponent],
  templateUrl: './list-airplanes.component.html',
  styleUrl: './list-airplanes.component.scss'
})
export class ListAirplanesComponent {
  airplaneProviderService = inject(AirplaneProviderService);
  airplaneService = inject(AirplaneService);
  toastProvider = inject(ToastProviderService);
  @Output() onChangeModal = new EventEmitter<MouseEvent>();

  deleteIcon = faTrash;
  editIcon = faEdit;

  handleDelete(id: number) {
    this.airplaneService.delete(id).subscribe({
      next: () => {
        this.airplaneProviderService.deleteAirplane(id);
        this.toastProvider.showToast("Eliminado correctamente :)", 5000);
      }
    });
  }

  handleModify(airplane: Airplane) {
    this.airplaneProviderService.setSelectedAirplane(airplane);
    this.onChangeModal.emit();
  }
}
