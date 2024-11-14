import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Airplane } from '@models/airplane.model';
import { environment } from '../../environments/environment';
import { AirplaneProviderService } from '../providers/airplane-provider.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirplaneService {
  private http = inject(HttpClient);
  private airplaneProviderService = inject(AirplaneProviderService);
  // private headers: HttpHeaders;

  getAll() {
    return this.http.get<Airplane[]>(environment.apiUrl + "/airplanes").pipe(tap(value=> {
      this.airplaneProviderService.airplanes.set(value);
      this.airplaneProviderService.filteredAirplanes.set(value);
    }))
  }

  create(plane: Airplane) {
    return this.http.post<Airplane>(environment.apiUrl + "/airplanes", plane);
  }

  delete(id: number) {
    return this.http.delete(environment.apiUrl + "/airplanes/" + id);
  }

  update(plane: Airplane) {
    return this.http.put<Airplane>(environment.apiUrl + "/airplanes/" + plane.id, plane)
  }
}
