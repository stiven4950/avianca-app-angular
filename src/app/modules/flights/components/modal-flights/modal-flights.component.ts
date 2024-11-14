import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faPaperPlane, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ModalComponent } from '@modules/shared/modal/modal.component';
import { HeaderComponent } from "../../../shared/modal/header/header.component";
import { BodyComponent } from '@modules/shared/modal/body/body.component';

import { Flight } from '@models/flight.model';
import { FlightService } from '../../../../services/flight.service';
import { FlightProviderService } from '../../../../providers/flight-provider.service';
import { ToastProviderService } from '../../../../providers/toast-provider.service';
import { AirplaneProviderService } from '../../../../providers/airplane-provider.service';
import { AirplaneService } from '@services/airplane.service';

@Component({
  selector: 'app-modal-flights',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, ModalComponent, HeaderComponent, BodyComponent],
  templateUrl: './modal-flights.component.html',
  styleUrl: './modal-flights.component.scss'
})
export class ModalFlightsComponent {
  flightService = inject(FlightService);
  flightProviderService = inject(FlightProviderService);
  airplaneProvider = inject(AirplaneProviderService);
  airplaneService = inject(AirplaneService);
  toastProviderService = inject(ToastProviderService);

  @Input({ required: true }) show: Boolean = true;
  @Output() onClose: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  createIcon = faCirclePlus;
  updateIcon = faPenToSquare;
  sendIcon = faPaperPlane;

  formFlight = new FormGroup({
    flightNumber: new FormControl('', { validators: [Validators.required] }),
    arrivalDate: new FormControl('', { validators: [Validators.required] }),
    arrivalHour: new FormControl('', { validators: [Validators.required] }),
    departureDate: new FormControl('', { validators: [Validators.required] }),
    departureHour: new FormControl('', { validators: [Validators.required] }),
    destiny: new FormControl('', { validators: [Validators.required] }),
    origin: new FormControl('', { validators: [Validators.required] }),
    airplaneId: new FormControl('', { validators: [Validators.required, Validators.min(1)] }),
  });

  ngOnInit() {
    this.flightProviderService.selectedFlight$.subscribe((flight: Flight | null) => {
      if (flight && flight.id) {
        this.formFlight.patchValue({
          flightNumber: flight.flightNumber,
          arrivalDate: flight.arrivalDate,
          arrivalHour: flight.arrivalHour,
          departureDate: flight.departureDate,
          departureHour: flight.departureHour,
          destiny: flight.destiny,
          origin: flight.origin,
          airplaneId: String(flight.airplaneId),
        });
      } else {
        this.formFlight.reset();
      }
    });
    this.airplaneService.getAll().subscribe();
  }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit() {
    if (this.formFlight.valid) {
      const flight: Flight = {
        flightNumber: this.flightNumber.getRawValue(),
        arrivalDate: this.arrivalDate.getRawValue(),
        arrivalHour: this.arrivalHour.getRawValue(),
        departureDate: this.departureDate.getRawValue(),
        departureHour: this.departureHour.getRawValue(),
        destiny: this.destiny.getRawValue(),
        origin: this.origin.getRawValue(),
        airplaneId: Number(this.airplaneId.getRawValue()),
      }

      if (this.flightProviderService.getSelectedFlight()?.id) {
        flight.id = this.flightProviderService.getSelectedFlight()?.id
        this.flightService.update(flight).subscribe({
          next: () => {
            this.flightProviderService.updateFlight(flight);
            this.formFlight.reset();
            this.handleClose();
            this.toastProviderService.showToast("Modificado exitosamente");
          }
        });
      } else {
        this.flightService.create(flight).subscribe({
          next: (flight) => {
            this.flightProviderService.addFlight(flight);
            this.formFlight.reset();
            this.handleClose();
            this.toastProviderService.showToast("Creado exitosamente");
          }
        });
      }

    }
  }

  get flightNumber() {
    return this.formFlight.get("flightNumber") as FormControl;
  }

  get arrivalDate() {
    return this.formFlight.get("arrivalDate") as FormControl;
  }

  get arrivalHour() {
    return this.formFlight.get("arrivalHour") as FormControl;
  }

  get departureDate() {
    return this.formFlight.get("departureDate") as FormControl;
  }

  get departureHour() {
    return this.formFlight.get("departureHour") as FormControl;
  }

  get destiny() {
    return this.formFlight.get("destiny") as FormControl;
  }

  get origin() {
    return this.formFlight.get("origin") as FormControl;
  }

  get airplaneId() {
    return this.formFlight.get("airplaneId") as FormControl;
  }
}
