import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ModalController } from '@ionic/angular';
import { SerieDetailsModalComponent } from '../../components/serie-details-modal/serie-details-modal.component';

@Component({
  selector: 'app-serie-component',
  templateUrl: './serie-component.component.html',
  styleUrls: ['./serie-component.component.scss'],
})
export class SerieComponentComponent implements OnInit {
  currentPage: number = 1;
  totalResults: number = 0;
  pageSize: number = 10;
  series: any[] = [];
  filteredSeries: any[] = [];
  selectedFilter: string = 'Anno';
  searchQuery: string = '';

  constructor(
    private movieService: MovieService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getSeries();
  }

  async getSeries() {
    try {
      const response = await this.movieService.getSeries(this.currentPage);
      console.log(response); // Verifique se os dados estão sendo recebidos corretamente
      this.totalResults = +response.totalResults || 0;
      this.series = response.Search || [];
      this.filteredSeries = this.series;
      console.log(this.series); // Verifique se as séries estão sendo armazenadas corretamente
    } catch (error) {
      console.error('Erro ao obter lista de séries:', error);
    }
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
    this.filterSeries();
  }

  onSearch(event: any) {
    this.searchQuery = event.detail.value;
    this.filterSeries();
  }

  filterSeries() {
    this.filteredSeries = this.series.filter((serie) =>
      serie.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (this.selectedFilter === 'Anno') {
      this.filteredSeries = this.filteredSeries.sort((a, b) => a.Year - b.Year);
    } else if (this.selectedFilter === 'ordine alfabetico') {
      this.filteredSeries = this.filteredSeries.sort((a, b) =>
        a.Title.localeCompare(b.Title)
      );
    } else if (this.selectedFilter === 'classificazione') {
      this.filteredSeries = this.filteredSeries.sort((a, b) =>
        a.Rated.localeCompare(b.Rated)
      );
    }
  }

  // Método para carregar mais séries ao rolar a página (carregamento infinito)
  async loadMoreSeries(event: any) {
    if (this.series.length >= this.totalResults) {
      // Todas as séries já foram carregadas, desabilita o carregamento infinito
      event.target.complete();
      event.target.disabled = true;
      return;
    }

    this.currentPage++;
    try {
      const response = await this.movieService.getSeries(this.currentPage);
      const newSeries = response.Search || [];
      this.series.push(...newSeries);
      this.filterSeries(); // Reaplica o filtro na lista atualizada
      event.target.complete();
    } catch (error) {
      console.error('Erro ao carregar mais séries:', error);
      event.target.complete();
    }
  }

  async openSerieDetailsModal(serie: any) {
    try {
      // Obter informações completas da série pelo ID usando o serviço MovieService
      const serieDetails = await this.movieService.getSerieDetailsById(
        serie.imdbID
      );

      // Abrir o modal com as informações detalhadas da série
      const modal = await this.modalController.create({
        component: SerieDetailsModalComponent,
        componentProps: { serie: serieDetails }, // Passar o objeto de informações completas da série para o modal
      });

      await modal.present();
    } catch (error) {
      console.error('Erro ao obter informações da série:', error);
    }
  }
}
