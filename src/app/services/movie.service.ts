import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private base = environment.tmdbBase;
  private headers = new HttpHeaders({
    Accept: 'application/json',
    Authorization: environment.tmdbToken,
  });

  constructor(private http: HttpClient) {}

  // Authentication test
  getAuth(): Observable<any> {
    return this.http.get(`${this.base}/authentication`, {
      headers: this.headers,
    });
  }

  // Popular movies with pagination
  getPopular(page: number = 1): Observable<any> {
    return this.http.get(`${this.base}/movie/popular?page=${page}`, {
      headers: this.headers,
    });
  }
  // Movie details by id go form here
  getMovieDetails(id: string): Observable<any> {
    return this.http.get(`${this.base}/movie/${id}`, {
      headers: this.headers,
    });
  }
}
