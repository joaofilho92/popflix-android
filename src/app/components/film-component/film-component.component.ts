import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

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
      ) {}

  ngOnInit() {
    this.getMovies();
  }

  async getMovies() {
    try {
      const response = await this.movieService.getMovies(this.currentPage);
      console.log(response); // Verifique se os dados estão sendo recebidos corretamente
      this.totalResults = +response.totalResults || 0;
      this.movies = response.Search || [];
      this.filteredMovies = this.movies;
      console.log(this.movies); // Verifique se os filmes estão sendo armazenados corretamente
    } catch (error) {
      console.error('Erro ao obter lista de filmes:', error);
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

  // Método para carregar mais filmes ao rolar a página (carregamento infinito)
  async loadMoreMovies(event: any) {
    if (this.movies.length >= this.totalResults) {
      // Todos os filmes já foram carregados, desabilita o carregamento infinito
      event.target.complete();
      event.target.disabled = true;
      return;
    }

    this.currentPage++;
    try {
      const response = await this.movieService.getMovies(this.currentPage);
      const newMovies = response.Search || [];
      this.movies.push(...newMovies);
      this.filterMovies(); // Reaplica o filtro na lista atualizada
      event.target.complete();
    } catch (error) {
      console.error('Erro ao carregar mais filmes:', error);
      event.target.complete();
    }
  }
  async doRefresh(event: any) {
    this.currentPage = 1; // Reinicia a página atual para a primeira página
    this.totalResults = 0; // Reinicia o total de resultados para zero
    this.movies = []; // Limpa a lista de filmes
    this.filteredMovies = []; // Limpa a lista de filmes filtrados
    await this.getMovies(); // Obtém a lista de filmes atualizada
    event.target.complete(); // Finaliza o carregamento do ion-refresher
  }

}
