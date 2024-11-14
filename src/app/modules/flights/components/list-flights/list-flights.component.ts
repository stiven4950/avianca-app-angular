import { Component, EventEmitter, inject, Output } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Flight } from '../../../../models/flight.model';
import { IconButtonComponent } from "../../../shared/icon-button/icon-button.component";

import { FlightProviderService } from '../../../../providers/flight-provider.service';
import { FlightService } from '@services/flight.service';
import { ToastProviderService } from '../../../../providers/toast-provider.service';

@Component({
  selector: 'app-list-flights',
  standalone: true,
  imports: [IconButtonComponent],
  templateUrl: './list-flights.component.html',
  styleUrl: './list-flights.component.scss'
})
export class ListFlightsComponent {
  flightProviderService = inject(FlightProviderService);
  flightService = inject(FlightService);
  toastProvider = inject(ToastProviderService);
  @Output() onChangeModal = new EventEmitter<MouseEvent>();

  deleteIcon = faTrash;
  editIcon = faEdit;

  handleDelete(id: number) {
    this.flightService.delete(id).subscribe({
      next: () => {
        this.flightProviderService.deleteFlight(id);
        this.toastProvider.showToast("Eliminado correctamente :)", 5000);
      }
    });
  }

  handleModify(flight: Flight) {
    this.flightProviderService.setSelectedFlight(flight);
    this.onChangeModal.emit();
  }
}
