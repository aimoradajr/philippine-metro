import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonThumbnail,
  IonItem,
  IonMenuButton,
  IonSelect,
  IonSelectOption,
  ModalController,
} from '@ionic/angular/standalone';
import { StationDetailsComponent } from '../../station-details/station-details.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransitService } from 'src/app/core/transit.service';

@Component({
  selector: 'app-line-viewer',
  templateUrl: './line-viewer.page.html',
  styleUrls: ['./line-viewer.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonListHeader,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonThumbnail,
    IonItem,
    CommonModule,
    IonMenuButton,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
})
export class LineViewerPage implements OnInit {
  transitLines: any[] = [];

  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute,
    private transitService: TransitService
  ) {
    this.transitLines = this.transitService.getAllLines();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const lineCode = params['line_code'];
      // Handle the new lineId here
      console.log('Navigated to line:', lineCode);
      // Additional logic to handle the new lineId

      this.selectLineByCode(lineCode);
    });
  }

  selectedLine: any = null;

  onLineChange(event: any) {}

  selectLineByCode(lineCode: string) {
    if (lineCode) {
      this.selectedLine = this.transitLines.find(
        (line) => line.code === lineCode
      );
    }
  }

  async openStationDetails(station: any) {
    const modal = await this.modalController.create({
      component: StationDetailsComponent,
      componentProps: { station },
      // enterAnimation: this.slideInAnimation,
      // leaveAnimation: this.slideOutAnimation,
    });
    await modal.present();
  }
}
