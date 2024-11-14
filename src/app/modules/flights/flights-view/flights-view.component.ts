import { Component, inject, signal } from '@angular/core';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { FlightProviderService } from '../../../providers/flight-provider.service';
import { FlightService } from '@services/flight.service';
import { SHOW_MODAL } from '../../../constants/constants';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchBarComponent } from "../../shared/search-bar/search-bar.component";
import { ListFlightsComponent } from "../components/list-flights/list-flights.component";
import { ModalFlightsComponent } from "../components/modal-flights/modal-flights.component";

@Component({
  selector: 'app-flights-view',
  standalone: true,
  imports: [FontAwesomeModule, SearchBarComponent, ListFlightsComponent, ModalFlightsComponent],
  templateUrl: './flights-view.component.html',
  styleUrl: './flights-view.component.scss'
})
export class FlightsViewComponent {
  private flightProviderService = inject(FlightProviderService);
  private flightService = inject(FlightService);

  addFlight = faPlane;
  showModal = signal(false);

  ngOnInit(){
    this.flightService.getAll().subscribe();
  }

  handleShowModal(value: boolean) {
    this.showModal.set(value);
  }

  handleCreate() {
    this.flightProviderService.setSelectedFlight(null);
    this.showModal.set(SHOW_MODAL);
  }

  handleSearch(text:string) {
    this.flightProviderService.searchFlight(text);
  }
}
