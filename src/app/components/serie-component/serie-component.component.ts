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
      console.log(response); 
      this.totalResults = +response.totalResults || 0;
      this.series = response.Search || [];
      this.filteredSeries = this.series;
      console.log(this.series); 
    } catch (error) {
      console.error('Errore durante il recupero', error);
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

  
  async loadMoreSeries(event: any) {
    if (this.series.length >= this.totalResults) {
      event.target.complete();
      event.target.disabled = true;
      return;
    }

    this.currentPage++;
    try {
      const response = await this.movieService.getSeries(this.currentPage);
      const newSeries = response.Search || [];
      this.series.push(...newSeries);
      this.filterSeries(); 
      event.target.complete();
    } catch (error) {
      console.error('Errore durante il recupero', error);
      event.target.complete();
    }
  }

  async openSerieDetailsModal(serie: any) {
    try {
      const serieDetails = await this.movieService.getSerieDetailsById(
        serie.imdbID
      );

      
      const modal = await this.modalController.create({
        component: SerieDetailsModalComponent,
        componentProps: { serie: serieDetails }, 
      });

      await modal.present();
    } catch (error) {
      console.error('Errore durante il recupero ', error);
    }
  }
}
