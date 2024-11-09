import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "@modules/shared/header/header.component";
import { MenuBarComponent } from "@modules/shared/menu-bar/menu-bar.component";
import { ToastComponent } from "@modules/shared/toast/toast.component";
import { ToastProviderService } from '../../../providers/toast-provider.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MenuBarComponent, ToastComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  toasProviderService = inject(ToastProviderService);
}
