import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Flight } from '@models/flight.model';
import { environment } from '../../environments/environment';
import { FlightProviderService } from '../providers/flight-provider.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private http = inject(HttpClient);
  private flightProviderService = inject(FlightProviderService);
  // private headers: HttpHeaders;

  getAll() {
    return this.http.get<Flight[]>(environment.apiUrl + "/flights").pipe(tap(value=> {
      this.flightProviderService.flights.set(value);
      this.flightProviderService.filteredFlights.set(value);
    }))
  }

  create(flight: Flight) {
    return this.http.post<Flight>(environment.apiUrl + "/flights", flight);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/flights/" + id);
  }

  update(flight: Flight) {
    return this.http.put<Flight>(environment.apiUrl + "/flights/" + flight.id, flight)
  }
}
