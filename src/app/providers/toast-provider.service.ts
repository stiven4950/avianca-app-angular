import { Injectable, signal } from '@angular/core';
import { HIDE_MODAL, SHOW_MODAL } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ToastProviderService {
  show = signal(false);
  message = signal("");
  type = signal<"success" | "error" | "information">("success");

  showToast(message: string, ms: number = 3000, type: "success" | "error" | "information" = "success") {
    this.show.set(SHOW_MODAL);
    this.message.set(message);

    setTimeout(() => {
      this.show.set(HIDE_MODAL);
      this.message.set("");
      this.type.set(type);
    }, ms);
  }
}
