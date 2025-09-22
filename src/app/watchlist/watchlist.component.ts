import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  isWatchlistEmpty: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkWatchlist();
  }

  checkWatchlist(): void {
    const watchlist = localStorage.getItem('watchlist');
    if (watchlist) {
      const parsedWatchlist = JSON.parse(watchlist);
      this.isWatchlistEmpty = parsedWatchlist.length === 0;
    } else {
      // If 'watchlist' item doesn't exist in local storage, it's considered empty.
      this.isWatchlistEmpty = true;
    }
  }

  goToHomePage(): void {
    this.router.navigate(['/']); // Assuming the home page route is '/'
  }
}
