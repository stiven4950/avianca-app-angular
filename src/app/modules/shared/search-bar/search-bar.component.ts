import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { IconButtonComponent } from "../icon-button/icon-button.component";

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, IconButtonComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  searchIcon = faSearch;
  closeIcon = faCircleXmark;

  searchControl = new FormControl("");

  handleSearch(){
    this.onSearch.emit(this.searchControl.value ?? '');
  }

  handleClean(){
    this.searchControl.setValue("");
    this.onSearch.emit("");
  }
}
