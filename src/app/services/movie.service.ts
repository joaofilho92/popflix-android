import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://www.omdbapi.com/';
  private apiKey = 'c5c38f31';

  constructor(private http: HttpClient) {}

  // Método para obter informações completas de um filme pelo ID
  getMovieById(movieId: string): Promise<any> {
    const queryUrl = `${this.apiUrl}?i=${movieId}&apikey=${this.apiKey}`;
    return this.http.get(queryUrl).toPromise();
  }

  getMovieDetailsById(movieId: string): Promise<any> {
    const queryUrl = `${this.apiUrl}?i=${movieId}&apikey=${this.apiKey}`;
    return this.http.get(queryUrl).toPromise();
  }

  // Método para obter a lista de filmes da API do OMDB com base na página
  getMovies(page: number): Promise<any> {
    const queryUrl = `${this.apiUrl}?s=movie&type=movie&page=${page}&apikey=${this.apiKey}`;
    return this.http.get(queryUrl).toPromise();
  }

  // Método para obter a lista de séries da API do OMDB com base na página
  getSeries(page: number): Promise<any> {
    const queryUrl = `${this.apiUrl}?s=series&type=series&page=${page}&apikey=${this.apiKey}`;
    return this.http.get(queryUrl).toPromise();
  }
}
