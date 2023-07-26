import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://www.omdbapi.com/';
  private apiKey = 'c5c38f31';

  constructor(private http: HttpClient) {}

  
  getMovieById(movieId: string): Promise<any> {
    const queryUrl = `${this.apiUrl}?i=${movieId}&apikey=${this.apiKey}`;
    return this.http.get(queryUrl).toPromise();
  }

  getMovieDetailsById(movieId: string): Promise<any> {
    const queryUrl = `${this.apiUrl}?i=${movieId}&apikey=${this.apiKey}`;
    return this.http.get(queryUrl).toPromise();
  }

  getMovies(page: number): Promise<any> {
    const queryUrl = `${this.apiUrl}?s=movie&type=movie&page=${page}&apikey=${this.apiKey}`;
    return this.http.get(queryUrl).toPromise();
  }

  getSeries(page: number): Promise<any> {
    const queryUrl = `${this.apiUrl}?s=series&type=series&page=${page}&apikey=${this.apiKey}`;
    return this.http.get(queryUrl).toPromise();
  }

  getSerieDetailsById(serieId: string): Promise<any> {
    const queryUrl = `${this.apiUrl}?i=${serieId}&apikey=${this.apiKey}`;
    return this.http.get(queryUrl).toPromise();
  }
}
