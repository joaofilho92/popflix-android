import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ModalController } from '@ionic/angular'; // Importe o ModalController

import { MovieDetailsModalComponent } from '../movie-details-modal-component/movie-details-modal-component.component'; // Importe o componente do modal aqui

@Component({
  selector: 'app-film-component',
  templateUrl: './film-component.component.html',
  styleUrls: ['./film-component.component.scss'],
})
export class FilmComponentComponent implements OnInit {
  currentPage: number = 1;
  totalResults: number = 0;
  pageSize: number = 10;
  movies: any[] = [];
  filteredMovies: any[] = [];
  selectedFilter: string = 'Anno';
  searchQuery: string = '';

  constructor(
    private movieService: MovieService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getMovies();
  }

  async getMovies() {
    try {
      const response = await this.movieService.getMovies(this.currentPage);
      console.log(response); 
      this.totalResults = +response.totalResults || 0;
      this.movies = response.Search || [];
      this.filteredMovies = this.movies;
      
      
    } catch (error) {
      console.error('Errore durante il recupero della lista', error);
    }
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
    this.filterMovies();
  }

  onSearch(event: any) {
    this.searchQuery = event.detail.value;
    this.filterMovies();
  }

  filterMovies() {
    this.filteredMovies = this.movies.filter((movie) =>
      movie.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (this.selectedFilter === 'Anno') {
      this.filteredMovies = this.filteredMovies.sort((a, b) => a.Year - b.Year);
    } else if (this.selectedFilter === 'ordine alfabetico') {
      this.filteredMovies = this.filteredMovies.sort((a, b) =>
        a.Title.localeCompare(b.Title)
      );
    } else if (this.selectedFilter === 'classificazione') {
      this.filteredMovies = this.filteredMovies.sort((a, b) =>
        a.Rated.localeCompare(b.Rated)
      );
    }
  }

  async loadMoreMovies(event: any) {
    if (this.movies.length >= this.totalResults) {
      event.target.complete();
      event.target.disabled = true;
      return;
    }

    this.currentPage++;
    try {
      const response = await this.movieService.getMovies(this.currentPage);
      const newMovies = response.Search || [];
      this.movies.push(...newMovies);
      this.filterMovies(); 
      event.target.complete();
    } catch (error) {
      console.error('Errore durante il recupero della lista', error);
      event.target.complete();
    }
  }
  async doRefresh(event: any) {
    this.currentPage = 1; 
    this.totalResults = 0; 
    this.movies = []; 
    this.filteredMovies = []; 
    await this.getMovies(); 
    event.target.complete(); 
  }

  async showMovieDetails(movieId: string) {
    try {
      const movieDetails = await this.movieService.getMovieById(movieId);
      console.log(movieDetails);
    } catch (error) {
      console.error('Errore durante il recupero della lista', error);
    }
  }

  async openMovieDetailsModal(movie: any) {
    try {
      const movieDetails = await this.movieService.getMovieDetailsById(
        movie.imdbID
      );

      const modal = await this.modalController.create({
        component: MovieDetailsModalComponent,
        componentProps: { movie: movieDetails }, 
        cssClass: 'custom-modal-class', 
      });

      await modal.present();
    } catch (error) {
      console.error('Errore durante il recupero della lista', error);
    }
  }
}
