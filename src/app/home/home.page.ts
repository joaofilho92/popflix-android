import { Component } from '@angular/core';
import { FilmComponentComponent } from '../components/film-component/film-component.component';
import { SerieComponentComponent } from '../components/serie-component/serie-component.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedSegment: string = 'film'; // Segmento padrão é "filme"

  constructor() {}
}
