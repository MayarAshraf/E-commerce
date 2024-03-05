import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {
  @Output() searchId = new EventEmitter<number>();
  onSearchInput(event: any): void {
    const enteredId = parseInt(event.target.value.trim(), 10);
    if (!isNaN(enteredId)) {
      this.searchId.emit(enteredId);
    }
  }
}
