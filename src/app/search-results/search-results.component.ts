import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  imports: [CommonModule, MovieCardComponent, SearchComponent],
  standalone: true
})
export class SearchResultsComponent implements OnInit {

  searchQuery: string = '';
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.currentPage = +params['page'] || 1;
      if(this.searchQuery){
        this.fetchMovies();
      }
    });
  }
  

  fetchMovies() {
    this.searchService.searchMovies(this.searchQuery, this.currentPage).subscribe((res: any) => {
      this.movies = res.results;
      this.totalPages = res.total_pages;
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.router.navigate([], { 
        queryParams: { q: this.searchQuery, page: page },
        queryParamsHandling: 'merge'
      });
    }
  }
}
