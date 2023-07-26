import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-movie-details-modal',
  templateUrl: './movie-details-modal-component.component.html',
  styleUrls: ['./movie-details-modal-component.component.scss'],
})
export class MovieDetailsModalComponent {
  @Input() movie: any; // Recebe o objeto do filme do componente pai

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}
