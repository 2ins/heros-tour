import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent {
  @Input() maxStars: number = 5; // Numero massimo di stelle
  @Input() rating: number = 0; // Valore iniziale del rating
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [];
  hoveredRating: number | null = null;

  ngOnInit() {
    this.stars = Array(this.maxStars).fill(0);
  }

  setRating(value: number) {
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }

  hoverRating(value: number) {
    this.hoveredRating = value;
  }

  clearHover() {
    this.hoveredRating = null;
  }
}
