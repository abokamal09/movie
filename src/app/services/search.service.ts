import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private API_KEY = 'caa8300bc818e7643ea53ed6f19509f7'; 
  private BASE_URL = 'https://api.themoviedb.org/3/search/movie';

  constructor(private http: HttpClient) { }

searchMovies(query: string, page: number = 1): Observable<any> {
  return this.http.get(`${this.BASE_URL}?api_key=${this.API_KEY}&query=${query}&page=${page}`);
}

}
