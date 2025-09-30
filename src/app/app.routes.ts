import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: DetailsComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'watchlist', component: WatchlistComponent },
];
