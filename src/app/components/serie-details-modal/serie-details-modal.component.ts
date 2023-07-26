import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-serie-details-modal',
  templateUrl: './serie-details-modal.component.html',
  styleUrls: ['./serie-details-modal.component.scss'],
})
export class SerieDetailsModalComponent {
  @Input() serie: any;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }
}
