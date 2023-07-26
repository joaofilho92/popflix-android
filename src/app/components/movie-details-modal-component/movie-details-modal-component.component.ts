import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-movie-details-modal',
  templateUrl: './movie-details-modal-component.component.html',
  styleUrls: ['./movie-details-modal-component.component.scss'],
})
export class MovieDetailsModalComponent {
  @Input() movie: any; 

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}
