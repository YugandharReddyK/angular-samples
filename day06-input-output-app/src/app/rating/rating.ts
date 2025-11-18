import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-rating',
  imports: [NgFor],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class RatingComponent {
  // @Input - Receive initial rating from parent
  @Input() rating: number = 0;
  
  // @Output - Send new rating to parent
  @Output() ratingChange = new EventEmitter<number>();
  
  stars = [1, 2, 3, 4, 5];
  
  // Set rating and notify parent
  setRating(star: number): void {
    this.rating = star;
    this.ratingChange.emit(this.rating);
  }
}
