import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  IonBadge,
  IonModal,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TransitService } from '../core/transit.service';
import { Edge, Station } from '../core/transit.config';
import { addIcons } from 'ionicons';
import {
  analyticsOutline,
  cardOutline,
  expandOutline,
  listOutline,
  locationOutline,
  mapOutline,
  timeOutline,
  walkOutline,
  swapHorizontalOutline,
} from 'ionicons/icons';
import { MapViewerComponent } from '../map/map-viewer/map-viewer';

@Component({
  selector: 'app-pathfinder',
  templateUrl: './pathfinder.page.html',
  styleUrls: ['./pathfinder.page.scss'],
  standalone: true,
  imports: [
    IonCardSubtitle,
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
    IonBadge,
    MapViewerComponent,
    IonModal,
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class PathFinderPage implements OnInit {
  allLines: any[] = [];
  allStationsFlatObj: any = {};
  allStationsFlatArray: Station[] = [];

  // start
  selectedStartStationCode: string | null = null;
  selectedStartStation?: Station;
  // end
  selectedEndStationCode: string | null = null;
  selectedEndStation?: Station;

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
    addIcons({
      swapHorizontalOutline,
      timeOutline,
      analyticsOutline,
      mapOutline,
      listOutline,
      walkOutline,
      expandOutline,
      locationOutline,
      cardOutline,
    });

    this.allLines = this.transitService.getAllLines();
    this.allStationsFlatObj = this.transitService.getAllStationsFlatObj();
    this.allStationsFlatArray = this.transitService.getAllStationsFlatArray();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const startStationCode =
        params['startStationCode'] || localStorage.getItem('startStationCode');
      const endStationCode =
        params['endStationCode'] || localStorage.getItem('endStationCode');

      if (startStationCode) {
        this.preselectStartStation(startStationCode);
      }

      if (endStationCode) {
        this.preselectEndStation(endStationCode);
      }
    });

    this.onRouteChange(); // Initialize the current route
  }

  loadLastSelection() {
    // Load the last selected stations from localStorage
    this.selectedStartStationCode = localStorage.getItem('startStationCode');
    this.selectedEndStationCode = localStorage.getItem('endStationCode');
  }

  // preselect the start line and station
  preselectStartStation(stationCode: string) {
    const station = this.allStationsFlatObj[stationCode];
    if (!station) {
      console.error('Invalid station code:', stationCode);
      return;
    }

    // Set the selected start station
    this.selectedStartStationCode = stationCode;
    this.selectedStartStation = station;

    this.calculatePath();
  }

  // preselect the end line and station
  preselectEndStation(stationCode: string) {
    const station = this.allStationsFlatObj[stationCode];
    if (!station) {
      console.error('Invalid station code:', stationCode);
      return;
    }

    // Set the selected end station
    this.selectedEndStationCode = stationCode;
    this.selectedEndStation = station;

    this.calculatePath();
  }

  // select start station --------------------------------
  @ViewChild('startStationSearchbar', { static: false })
  startStationSearchbar?: IonSearchbar;

  startStations: Station[] = [];
  searchQueryStartStation: string = '';
  filterStartStations2() {
    // if not searching, show all stations
    if (!this.searchQueryStartStation) {
      this.startStations = this.allStationsFlatArray;
    } else {
      // filter by partial match
      this.startStations = this.allStationsFlatArray.filter((station) =>
        station.name
          .toLowerCase()
          .includes(this.searchQueryStartStation.toLowerCase())
      );
    }

    // focus searchbar
    setTimeout(() => {
      this.startStationSearchbar?.setFocus();
    }, 100);
  }

  searchQueryStartStationLine: string = '';
  filterStartStations2_ByLine(lineCode: string) {
    // this.searchQueryStartStationLine = lineCode;

    // filter by line
    this.startStations = this.allStationsFlatArray.filter(
      (station) => station.lineCode === lineCode
    );
  }

  selectStartStation(station: Station) {
    this.selectedStartStationCode = station.code;
    this.selectedStartStation = station;

    this.calculateKPaths();
  }

  // select end station --------------------------------
  @ViewChild('endStationSearchbar', { static: false })
  endStationSearchbar?: IonSearchbar;

  endStations: Station[] = [];
  searchQueryEndStation: string = '';
  filterEndStations2() {
    // if not searching, show all stations
    if (!this.searchQueryEndStation) {
      this.endStations = this.allStationsFlatArray;
    } else {
      // filter by partial match
      this.endStations = this.allStationsFlatArray.filter((station) =>
        station.name
          .toLowerCase()
          .includes(this.searchQueryEndStation.toLowerCase())
      );
    }

    // focus searchbar
    setTimeout(() => {
      this.endStationSearchbar?.setFocus();
    }, 100);
  }

  searchQueryEndStationLine: string = '';
  filterEndStations2_ByLine(lineCode: string) {
    // this.searchQueryEndStationLine = lineCode;

    // filter by line
    this.endStations = this.allStationsFlatArray.filter(
      (station) => station.lineCode === lineCode
    );
  }

  selectEndStation(station: Station) {
    this.selectedEndStationCode = station.code;
    this.selectedEndStation = station;

    this.calculateKPaths();
  }

  calculatePath() {
    this.calculateKPaths();
  }

  calculatedPaths: any[] = [];
  calculatedPathsEnriched: any[] = [];
  isCalculationDone: boolean = false; // Tracks if calculation has been performed
  calculateKPaths() {
    if (!this.selectedStartStationCode || !this.selectedEndStationCode) {
      console.error('Both start and end stations must be selected');
      return;
    }

    // save start and end to local storage
    localStorage.setItem('startStationCode', this.selectedStartStationCode);
    localStorage.setItem('endStationCode', this.selectedEndStationCode);

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
      let allStations: Station[] = [];
      let allEdges: Edge[] = [];

      let pathSegments: any[] = [];

      const enrichedPath = path.map((stationCode, index, arr) => {
        const station = this.allStationsFlatObj?.[stationCode] || {};
        const prevStationCode = index > 0 ? arr[index - 1] : null;
        const nextStationCode = index < arr.length - 1 ? arr[index + 1] : null;

        // reset display settings
        station.customIconPath = null;
        station.customIconPathWidth = undefined;
        station.customIconPathHeight = undefined;

        let stationAction:
          | 'board-initial'
          | 'board'
          | 'alight-and-transfer'
          | 'alight-end'
          | null = null;

        if (index === 0) {
          // start station
          stationAction ??= 'board-initial';

          // create new segment
          pathSegments.push({
            lineCode: station.lineCode,
            stations: [],
            fare: 0,
            fareBreakdown: [],
          });
        } else if (index === arr.length - 1) {
          // end station
          stationAction ??= 'alight-end';
        }

        // Find the edge from the previous station to the current station
        const prevStation = this.transitService.getStationByCode(
          prevStationCode!
        );
        let prevEdge;
        if (prevStation) {
          prevEdge = prevStation.edges?.find(
            (edge: Edge) => edge.to === stationCode
          );
        }

        // Find the edge from the current station to the next station
        const nextEdge = station.edges?.find(
          (edge: Edge) => edge.to === nextStationCode
        );

        if (
          prevEdge?.transferType === 'inter-station' &&
          nextEdge?.transferType === 'inter-station' &&
          prevEdge?.lineCode === nextEdge?.lineCode
        ) {
          // mark stations that are just in between inter-station transfers
          station.isInBetweenStationTransfer = true;
        }

        // alight and transfer to another line
        if (nextEdge?.transferType === 'inter-line') {
          stationAction ??= 'alight-and-transfer';
        }

        // board from another line
        if (prevEdge?.transferType === 'inter-line') {
          stationAction ??= 'board';

          // create new segment
          pathSegments.push({
            lineCode: station.lineCode,
            stations: [],
            fare: 0,
            fareBreakdown: [],
          });
        }

        // generate custom icon based on station action
        switch (stationAction) {
          case 'board-initial':
            station.customIconPath =
              'assets/icons/station-action-board-initial.png';
            break;
          case 'board':
            station.customIconPath = 'assets/icons/station-action-board.png';
            break;
          case 'alight-and-transfer':
            // station.customIconPath =
            //   'assets/icons/littleman/station-action-alight-and-transfer-littleman.png';
            station.customIconPath = 'assets/icons/station-action-exit.png';
            break;
          case 'alight-end':
            station.customIconPath =
              'assets/icons/station-action-alight-end.png';
            break;
          default:
            station.customIconPath = null;
          // station.customIconPath = 'assets/icons/station-active-min.png';
          // station.customIconPathWidth = 10;
          // station.customIconPathHeight = 10;
        }

        // path node
        const pathStation = {
          ...station,
          stationAction: stationAction,
          prevEdge: prevEdge || null,
          nextEdge: nextEdge || null,
        };

        // add station to the current segment
        pathSegments[pathSegments.length - 1].stations.push(pathStation);

        // Add station to allStations for mapping
        allStations.push({
          ...station,
          stationAction: stationAction,
        });
        allEdges.push(nextEdge);

        return pathStation;
      });

      // Calculate interline transfers
      const transfers = enrichedPath.reduce(
        (transferCount, station) =>
          station.nextEdge?.transferType === 'inter-line'
            ? transferCount + 1
            : transferCount,
        0
      );

      // Calculate total duration based on edge.duration + station.wait
      // totalDuration in minutes
      const totalDuration = enrichedPath.reduce(
        (duration, station, index, arr) => {
          const edge = station.nextEdge;

          return (
            duration + (edge?.duration || 3) + (station?.boardingTime || 1)
          );
        },
        0
      );

      // calculate total price of each pathSegments
      let pathFare: number = 0;
      pathSegments.forEach((segment) => {
        // get start of segment
        const startStation = segment.stations[0];

        // get end of segment
        const endStation = segment.stations[segment.stations.length - 1];

        // get fare by matrix
        const fare = this.transitService.calculateFare(
          startStation,
          endStation
        );

        pathFare += fare || 0;
      });

      // Return enriched path with additional details
      return {
        enrichedPath,
        cost,
        transfers,
        totalDuration,

        // for mapping
        allStations: allStations,
        allEdges: allEdges,

        // for pricing
        pathSegments: pathSegments,
        pathFare: pathFare,
      };
    });
  }

  isPathCollapsed: boolean = false;
  togglePathCollapse() {
    this.isPathCollapsed = !this.isPathCollapsed;
  }

  pathViewMode: 'map' | 'list' = 'list';
  showPathInMap() {
    this.pathViewMode = 'map';
  }

  showPathInList() {
    this.pathViewMode = 'list';
  }

  swapStations() {
    const startCode = this.selectedStartStationCode;
    const endCode = this.selectedEndStationCode;

    this.preselectStartStation(endCode || '');
    this.preselectEndStation(startCode || '');
  }
}
