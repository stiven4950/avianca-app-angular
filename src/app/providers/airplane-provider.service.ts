import { Injectable, signal } from '@angular/core';
import { Airplane } from '@models/airplane.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirplaneProviderService {
  private selectedAirplaneSubject = new BehaviorSubject<Airplane | null>(null);
  selectedAirplane$ = this.selectedAirplaneSubject.asObservable();

  airplanes = signal<Airplane[]>([]);
  filteredAirplanes = signal<Airplane[]>([]);

  setSelectedAirplane(airplane: Airplane | null) {
    this.selectedAirplaneSubject.next(airplane);
  }

  getSelectedAirplane() {
    return this.selectedAirplaneSubject.getValue();
  }

  addAirplane(airplane: Airplane) {
    this.airplanes.update((state) => [...state, airplane]);
    this.filteredAirplanes.update((state) => [...state, airplane]);
  }

  deleteAirplane(id: number) {
    this.airplanes.update((state) => state.filter(plane => plane.id !== id));
    this.filteredAirplanes.update((state) => state.filter(plane => plane.id !== id));
  }

  searchPlane(text: string) {
    if (!text) {
      this.filteredAirplanes.set(this.airplanes());
    }

    const newList = this.airplanes().filter(plane => plane.model.toLowerCase().includes(text.toLowerCase()));
    this.filteredAirplanes.set(newList);
  }
}
