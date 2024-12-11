import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonImg,
} from '@ionic/angular/standalone';
import { AppConfig } from '../core/config'; // Adjust the path as needed

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonImg,
  ],
})
export class StationDetailsComponent {
  @Input() station: any;

  defaultStationImage = AppConfig.defaultStationImage;

  constructor(
    private modalController: ModalController,
    private router: Router
  ) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  startHere(station: any) {
    // Implement navigation logic
    this.station = station;

    // close the modal
    this.dismissModal();

    // navigate to pathfinder page route
    this.router.navigate(['/pathfinder'], {
      queryParams: {
        startStationCode: this.station.code,
      },
    });
  }

  getDirections(station: any) {
    // Implement navigation logic
    this.station = station;

    // close the modal
    this.dismissModal();

    // navigate to pathfinder page route
    this.router.navigate(['/pathfinder'], {
      queryParams: {
        endStationCode: this.station.code,
      },
    });
  }
}
