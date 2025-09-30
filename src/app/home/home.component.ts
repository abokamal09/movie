import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, SearchComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  loading = false;
  error = '';

  currentPage = 1;
  totalPages = 1;

  constructor(private movieSvc: MovieService) {}

  ngOnInit(): void {
    this.loadMovies(1);
  }

  loadMovies(page: number): void {
    if (page < 1 || (this.totalPages && page > this.totalPages)) return;

    this.loading = true;
    this.movieSvc.getPopular(page).subscribe({
      next: (res) => {
        this.movies = res.results || [];
        this.totalPages = res.total_pages;
        this.currentPage = res.page;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load';
        this.loading = false;
      },
    });
  }

  goToPage(page: number) {
    this.loadMovies(page);
  }

  nextPage() {
    this.loadMovies(this.currentPage + 1);
  }

  prevPage() {
    this.loadMovies(this.currentPage - 1);
  }

  /** 🔹 Generate 5 page numbers around the current one */
  getPages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
