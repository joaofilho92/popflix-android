import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FilmComponentComponent } from '../components/film-component/film-component.component';
import { SerieComponentComponent } from '../components/serie-component/serie-component.component';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage, FilmComponentComponent, SerieComponentComponent],
})
export class HomePageModule {}
