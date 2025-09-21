import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-search',
  standalone: true, 
  imports: [FormsModule], 
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchValue: string = '';

  constructor(private router: Router) {}

  search() {
    if (this.searchValue.trim()) {
      this.router.navigate(['/search-results'], { queryParams: { q: this.searchValue } });
    }
  }
}
