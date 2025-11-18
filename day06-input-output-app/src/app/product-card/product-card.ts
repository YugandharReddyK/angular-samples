import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCardComponent {
  // @Input - Receive product data from parent
  @Input() product: any;
  
  // @Output - Send event to parent when button clicked
  @Output() addToCartClicked = new EventEmitter<any>();
  
  // Emit event to parent
  onAddToCart(): void {
    this.addToCartClicked.emit(this.product);
  }
}
