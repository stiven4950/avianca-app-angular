import { Injectable, signal } from '@angular/core';
import { Flight } from '@models/flight.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightProviderService {
  private selectedFlightSubject = new BehaviorSubject<Flight | null>(null);
  selectedFlight$ = this.selectedFlightSubject.asObservable();

  flights = signal<Flight[]>([]);
  filteredFlights = signal<Flight[]>([]);

  setSelectedFlight(flight: Flight | null) {
    this.selectedFlightSubject.next(flight);
  }

  getSelectedFlight() {
    return this.selectedFlightSubject.getValue();
  }

  addFlight(flight: Flight) {
    this.flights.update((state) => [...state, flight]);
    this.filteredFlights.update((state) => [...state, flight]);
  }

  updateFlight(flight: Flight) {
    this.flights.update((state) => {
      return state.map(item => {
        if (item.id === flight.id) return flight;
        return item;
      })
    });
    this.filteredFlights.update((state) => {
      return state.map(item => {
        if (item.id === flight.id) return flight;
        return item;
      })
    });
  }

  deleteFlight(id: number) {
    this.flights.update((state) => state.filter(plane => plane.id !== id));
    this.filteredFlights.update((state) => state.filter(plane => plane.id !== id));
  }

  searchFlight(text: string) {
    if (!text) {
      this.filteredFlights.set(this.flights());
    }

    const newList = this.flights().filter(plane => plane.flightNumber.toLowerCase().includes(text.toLowerCase()));
    this.filteredFlights.set(newList);
  }
}
