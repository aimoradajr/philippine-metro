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
  IonSegment,
  IonSegmentButton,
  IonAvatar,
  IonIcon,
  IonChip,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransitService } from '../core/transit.service';
import { Edge, Station } from '../core/transit.config';

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
    IonLabel,
    IonButtons,
    IonItem,
    CommonModule,
    IonMenuButton,
    IonSelect,
    IonSelectOption,
    FormsModule,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonAvatar,
    IonIcon,
    IonChip,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
})
export class PathFinderPage implements OnInit {
  allLines: any[] = [];
  allStationsFlatObj: any = {};

  selectedStartLineCode: string | null = null;
  selectedEndLineCode: string | null = null;

  filteredStartStations: any[] = [];
  filteredEndStations: any[] = [];

  selectedStartStationCode: string | null = null;
  selectedEndStationCode: string | null = null;

  calculatedPath: any;

  selectedRoute: string = 'preferred';
  currentRoute: any; // Holds the currently selected route
  onRouteChange() {
    const routeMap: { [key: string]: number } = {
      preferred: 0,
      alternate1: 1,
      alternate2: 2,
    };

    const index = routeMap[this.selectedRoute] ?? 0;
    this.currentRoute = this.calculatedPathsEnriched[index] || null;
  }

  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute,
    private transitService: TransitService
  ) {
    this.allLines = this.transitService.getAllLines();
    this.allStationsFlatObj = this.transitService.getAllStationsFlatObj();

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

    this.onRouteChange(); // Initialize the current route
  }

  onStartLineChange() {
    // Update the stations for the selected start line
    this.filterStartStations();

    // Auto-select End Line if no end station is selected
    if (!this.selectedEndStationCode) {
      this.selectedEndLineCode = this.selectedStartLineCode;
      this.onEndLineChange(); // Update filteredEndStations
    }
  }

  onEndLineChange() {
    // Update the stations for the selected end line
    this.filterEndStations();
  }

  onStartStationChange() {
    // this.selectedStartStationCode;

    this.calculateKPaths();
  }

  onEndStationChange() {
    this.calculateKPaths();
  }

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

    try {
      this.calculatedPath = this.transitService.findShortestPath(
        this.selectedStartStationCode,
        this.selectedEndStationCode
      );
      // console.log('Calculated Path:', this.calculatedPath);
    } catch (error: any) {
      console.error(error?.message);
    }
  }

  calculatedPaths: any[] = [];
  calculatedPathsEnriched: any[] = [];
  isCalculationDone: boolean = false; // Tracks if calculation has been performed
  calculateKPaths() {
    if (!this.selectedStartStationCode || !this.selectedEndStationCode) {
      console.error('Both start and end stations must be selected');
      return;
    }

    try {
      this.calculatedPaths = this.transitService.findKShortestPaths(
        this.selectedStartStationCode,
        this.selectedEndStationCode,
        3
      );

      // enrich paths, using allStationsFlatObj
      this.calculatedPathsEnriched = this.enrichPaths(this.calculatedPaths);

      this.onRouteChange(); // Update currentRoute after new data

      this.isCalculationDone = true; // Mark calculation as done
    } catch (error: any) {
      console.error(error?.message);
    }
  }

  enrichPaths(paths: { path: string[]; cost: number }[]): any[] {
    return paths.map(({ path, cost }) => {
      const enrichedPath = path.map((stationCode, index, arr) => {
        const station = this.allStationsFlatObj?.[stationCode] || {};
        const nextStationCode = index < arr.length - 1 ? arr[index + 1] : null;

        // Find the edge from the current station to the next station
        const activatedEdge = station.edges?.find(
          (edge: Edge) => edge.to === nextStationCode
        );

        return {
          ...station,
          activatedEdge: activatedEdge || null,
        };
      });

      // Calculate interline transfers
      const transfers = enrichedPath.reduce(
        (transferCount, station) =>
          station.activatedEdge?.transferType === 'inter-line'
            ? transferCount + 1
            : transferCount,
        0
      );

      // Calculate total duration (e.g., 2 minutes per station + 5 minutes per transfer)
      const stationTravelTime = 2; // Minutes per station
      const transferTime = 5; // Minutes per transfer
      const totalDuration =
        enrichedPath.length * stationTravelTime + transfers * transferTime;

      // Return enriched path with additional details
      return {
        enrichedPath,
        cost,
        transfers,
        totalDuration,
      };
    });
  }
}
