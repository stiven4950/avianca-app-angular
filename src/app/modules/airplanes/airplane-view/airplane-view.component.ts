import { Component, inject, signal } from '@angular/core';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ListAirplanesComponent } from "../components/list-airplanes/list-airplanes.component";
import { SearchBarComponent } from "../../shared/search-bar/search-bar.component";
import { ModalAirplanesComponent } from '../components/modal-airplanes/modal-airplanes.component';

import { AirplaneProviderService } from '../../../providers/airplane-provider.service';
import { AirplaneService } from '@services/airplane.service';
import { SHOW_MODAL } from '../../../constants/constants';

@Component({
  selector: 'app-airplane-view',
  standalone: true,
  imports: [FontAwesomeModule, ListAirplanesComponent, SearchBarComponent, ModalAirplanesComponent],
  templateUrl: './airplane-view.component.html',
  styleUrl: './airplane-view.component.scss'
})
export class AirplaneViewComponent {
  private airplaneProviderService = inject(AirplaneProviderService);
  private airplaneService = inject(AirplaneService);

  addAirplane = faPlane;
  showModal = signal(false);

  ngOnInit(){
    this.airplaneService.getAll().subscribe();
  }

  handleShowModal(value: boolean) {
    this.showModal.set(value);
  }

  handleCreate() {
    this.airplaneProviderService.setSelectedAirplane(null);
    this.showModal.set(SHOW_MODAL);
  }

  handleSearch(text:string) {
    this.airplaneProviderService.searchPlane(text);
  }
}
