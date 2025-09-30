import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  movie: any | null = null;
  loading = false;
  error = '';
  recommendations: any[] = [];

  constructor(private route: ActivatedRoute, private movieSvc: MovieService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      this.fetchDetails(id);
    });
  }

  private fetchDetails(id: string) {
    this.loading = true;
    this.error = '';

    this.movieSvc.getMovieDetails(id).subscribe({
      next: (m) => {
        this.movie = m;
        this.loading = false;
        this.loadRecommendations(id);
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load movie';
        this.loading = false;
      },
    });
  }

  private loadRecommendations(id: string) {
    this.movieSvc.getRecommendations(id).subscribe({
      next: (res) => {
        this.recommendations = res?.results || [];
      },
      error: () => {},
    });
  }

  get posterUrl(): string {
    return this.movie?.poster_path
      ? 'https://image.tmdb.org/t/p/w500' + this.movie.poster_path
      : 'https://via.placeholder.com/300x450?text=No+Image';
  }

  get runtime(): string {
    const mins = this.movie?.runtime;
    if (!mins && mins !== 0) return '';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  }

  get voteAverage(): number {
    return Math.round((this.movie?.vote_average || 0) * 10);
  }

  // ⭐ Convert TMDB 10-point score to 5-star rating
  get fiveStarRating(): number {
    return (this.movie?.vote_average || 0) / 2;
  }

  get starPositions(): number[] {
    return [1, 2, 3, 4, 5];
  }

  get filledStars(): number {
    return Math.floor(this.fiveStarRating);
  }

  get hasHalfStar(): boolean {
    const fraction = this.fiveStarRating - this.filledStars;
    return fraction >= 0.5 && this.filledStars < 5;
  }
}
