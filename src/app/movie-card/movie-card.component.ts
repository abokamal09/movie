import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true, // Assuming this is a standalone component
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: any | null = null;

  isFavorite: boolean = false;

  ngOnInit(): void {
    // Check if the movie is already in the watchlist on component initialization.
    this.checkFavoriteStatus();
  }

  get posterUrl(): string {
    return this.movie?.poster_path
      ? 'https://image.tmdb.org/t/p/w500' + this.movie.poster_path
      : 'https://via.placeholder.com/300x450?text=No+Image';
  }

  get voteAverage(): number {
    return Math.round(this.movie?.vote_average * 10);
  }

  onImageError(event: any): void {
    event.target.src =
      'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';
  }

  /**
   * Checks if the current movie is in the local storage watchlist.
   */
  checkFavoriteStatus(): void {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    this.isFavorite = watchlist.some((m: any) => m.id === this.movie.id);
  }

  /**
   * Toggles the favorite status and updates the local storage watchlist.
   * @param event The click event to prevent parent link navigation.
   */
  toggleFavorite(event: MouseEvent): void {
    // Prevent navigation to the movie details page
    event.preventDefault();
    event.stopPropagation();

    let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

    if (this.isFavorite) {
      // Remove the movie from the watchlist
      watchlist = watchlist.filter((m: any) => m.id !== this.movie.id);
    } else {
      // Add the movie to the watchlist
      watchlist.push(this.movie);
    }

    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    this.isFavorite = !this.isFavorite;
  }
}
