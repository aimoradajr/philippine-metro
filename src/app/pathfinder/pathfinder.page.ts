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
  IonButton,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransitService } from '../core/transit.service';

@Component({
  selector: 'app-pathfinder',
  templateUrl: './pathfinder.page.html',
  styleUrls: ['./pathfinder.page.scss'],
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
    IonButton,
  ],
})
export class PathFinderPage implements OnInit {
  allLines: any[] = [];

  selectedStartLineCode: string | null = null;
  selectedEndLineCode: string | null = null;

  filteredStartStations: any[] = [];
  filteredEndStations: any[] = [];

  selectedStartStationCode: string | null = null;
  selectedEndStationCode: string | null = null;

  calculatedPath: string[] = [];

  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute,
    private transitService: TransitService
  ) {
    this.allLines = this.transitService.getAllLines();

    // Set default values
    if (this.allLines.length > 0) {
      this.selectedStartLineCode = this.allLines[0].code;
      this.selectedEndLineCode = this.selectedStartLineCode;
      // Filter stations initially
      this.filterStartStations();
      this.filterEndStations();
    }
  }

  startStation: any = null;
  endStation: any = null;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const startStationCode = params['startStationCode'];
      const endStationCode = params['endStationCode'];

      this.startStation =
        this.transitService.getStationByCode(startStationCode);
      this.endStation = this.transitService.getStationByCode(endStationCode);

      if (this.startStation && this.endStation) {
        this.calculatePath();
      }
    });
  }

  onStartLineChange() {
    // Update the stations for the selected start line
    this.filterStartStations();
  }

  onEndLineChange() {
    // Update the stations for the selected end line
    this.filterEndStations();
  }

  onStartStationChange() {}

  onEndStationChange() {}

  filterStartStations() {
    const startLine = this.transitService.getLineByCode(
      this.selectedStartLineCode!
    );
    this.filteredStartStations = startLine ? startLine.stations : [];

    // Reset start station selection if it's no longer valid
    if (
      this.selectedStartStationCode &&
      !this.filteredStartStations.some(
        (s) => s.code === this.selectedStartStationCode
      )
    ) {
      this.selectedStartStationCode = null;
    }
  }

  filterEndStations() {
    const endLine = this.transitService.getLineByCode(
      this.selectedEndLineCode!
    );
    this.filteredEndStations = endLine ? endLine.stations : [];

    // Reset end station selection if it's no longer valid
    if (
      this.selectedEndStationCode &&
      !this.filteredEndStations.some(
        (s) => s.code === this.selectedEndStationCode
      )
    ) {
      this.selectedEndStationCode = null;
    }
  }

  calculatePath() {
    if (!this.selectedStartStationCode || !this.selectedEndStationCode) {
      console.error('Both start and end stations must be selected');
      return;
    }

    const startStation = this.transitService.getStationByCode(
      this.selectedStartStationCode
    );
    const endStation = this.transitService.getStationByCode(
      this.selectedEndStationCode
    );

    if (startStation && endStation) {
      this.calculatedPath = [startStation.name, endStation.name];
      // Replace this with actual pathfinding logic
    }
  }
}
