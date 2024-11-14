import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { ModalComponent } from '@modules/shared/modal/modal.component';
import { HeaderComponent } from "../../../shared/modal/header/header.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus, faPaperPlane, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { BodyComponent } from '@modules/shared/modal/body/body.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Airplane } from '@models/airplane.model';
import { AirplaneService } from '../../../../services/airplane.service';
import { AirplaneProviderService } from '../../../../providers/airplane-provider.service';
import { ToastProviderService } from '../../../../providers/toast-provider.service';

@Component({
  selector: 'app-modal-airplanes',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, ModalComponent, HeaderComponent, BodyComponent],
  templateUrl: './modal-airplanes.component.html',
  styleUrl: './modal-airplanes.component.scss'
})
export class ModalAirplanesComponent {
  airplaneService = inject(AirplaneService);
  airplaneProviderService = inject(AirplaneProviderService);
  toastProviderService = inject(ToastProviderService);

  @Input({ required: true }) show: Boolean = true;
  @Output() onClose: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  createIcon = faCirclePlus;
  updateIcon = faPenToSquare;
  sendIcon = faPaperPlane;

  formAirplane = new FormGroup({
    model: new FormControl('', { validators: [Validators.required] }),
    capacity: new FormControl('', { validators: [Validators.required, Validators.min(1)] }),
  });

  get model() {
    return this.formAirplane.get("model") as FormControl;
  }

  get capacity() {
    return this.formAirplane.get("capacity") as FormControl;
  }

  ngOnInit() {
    this.airplaneProviderService.selectedAirplane$.subscribe((airplane: Airplane | null) => {
      if (airplane && airplane.id) {
        this.formAirplane.patchValue({
          model: airplane.model,
          capacity: String(airplane.capacity),
        });
      } else {
        this.formAirplane.reset();
      }
    });
  }

  handleClose() {
    this.onClose.emit();
  }

  onSubmit() {
    if (this.formAirplane.valid) {
      const airplane: Airplane = {
        model: this.model.getRawValue(),
        capacity: this.capacity.getRawValue(),
      }

      if (this.airplaneProviderService.getSelectedAirplane()?.id) {
        airplane.id = this.airplaneProviderService.getSelectedAirplane()?.id
        this.airplaneService.update(airplane).subscribe({
          next: ()=>{
            this.airplaneProviderService.updateAirplane(airplane);
            this.formAirplane.reset();
            this.handleClose();
            this.toastProviderService.showToast("Modificado exitosamente");
          }
        });
      } else {
        this.airplaneService.create(airplane).subscribe({
          next: (airplane) => {
            this.airplaneProviderService.addAirplane(airplane);
            this.formAirplane.reset();
            this.handleClose();
            this.toastProviderService.showToast("Creado exitosamente");
          }
        });
      }

    }
  }
}
