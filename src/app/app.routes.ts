import { Routes } from '@angular/router';
import { AirplaneViewComponent } from '@modules/airplanes/airplane-view/airplane-view.component';
import { DashboardComponent } from '@modules/layout/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children:[
      {
        path: "airplanes",
        component: AirplaneViewComponent
      }
    ]
  }
];
