import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, NgClass, NgFor, NgIf, SlicePipe } from '@angular/common'; // Import CommonModule features directly

@Component({
  selector: 'app-watchlist',
  standalone: true, // If it's a standalone component
  imports: [CommonModule, NgIf, NgFor, NgClass, DatePipe, SlicePipe], // Use specific pipes/directives
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  isWatchlistEmpty: boolean = true;
  watchlistMovies: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkWatchlist();
  }

  // Helper to construct poster URL
  getPosterUrl(posterPath: string | null): string {
    return posterPath
      ? 'https://image.tmdb.org/t/p/w200' + posterPath // Smaller size for list view
      : 'https://via.placeholder.com/100x150?text=No+Image'; // Placeholder for missing poster
  }

  // Handle image error if poster is not found
  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/100x150?text=No+Image'; // Fallback image
  }

  checkWatchlist(): void {
    const watchlist = localStorage.getItem('watchlist');
    if (watchlist) {
      const parsedWatchlist = JSON.parse(watchlist);
      this.watchlistMovies = parsedWatchlist; // Store movies
      this.isWatchlistEmpty = parsedWatchlist.length === 0;
    } else {
      this.isWatchlistEmpty = true;
      this.watchlistMovies = [];
    }
  }

  // New method to remove a movie from the watchlist
  removeFromWatchlist(movieId: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent any parent click events

    let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    watchlist = watchlist.filter((m: any) => m.id !== movieId);

    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    this.watchlistMovies = watchlist; // Update the displayed list
    this.isWatchlistEmpty = watchlist.length === 0; // Re-check if list is now empty
  }

  goToHomePage(): void {
    this.router.navigate(['/']);
  }
}
