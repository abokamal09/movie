import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() movie: any | null = null;
  @Output() add = new EventEmitter<any>();

  get posterUrl() {
    return this.movie?.poster_path
      ? 'https://image.tmdb.org/t/p/w500' + this.movie.poster_path
      : 'https://via.placeholder.com/300x450?text=No+Image';
  }
  
  isFavorite = false;

  toggleFavorite(event: MouseEvent) {
    event.preventDefault();
    this.isFavorite = !this.isFavorite;
  }

  get voteAverage() {
    return Math.round(this.movie?.vote_average * 10);
  }
}
