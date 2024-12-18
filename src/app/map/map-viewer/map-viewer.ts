import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { GoogleMapsModule } from '@angular/google-maps';
import { Edge, Station, TransitLine } from '../../core/transit.config';
import { TransitService } from '../../core/transit.service';

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.html',
  styleUrls: ['./map-viewer.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    CommonModule,
    FormsModule,
    IonMenuButton,
    GoogleMapsModule,
  ],
})
export class MapViewerComponent implements OnInit {
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  @Input() highlightStationsArray: Station[] = [];
  @Input() highlightEdgesArray: Edge[] = [];

  // base: display all stations and edges with base markers
  // minimal: display only highlighted stations and edges with minimal markers
  @Input() masterMapDisplayMode: 'base' | 'minimal' | 'highlight' = 'base';

  // allLines: TransitLine[] = [];
  allStationsFlatObj: any = {};
  allStationsFlatArray: Station[] = [];

  // Define icon objects with size and anchor properties
  stationActiveIcon: google.maps.Icon = {
    url: 'assets/icons/station-active.png', // Path to your active station icon
    scaledSize: new google.maps.Size(30, 30), // Desired size
    anchor: new google.maps.Point(15, 15), // Anchor point
  };
  stationActiveIcon_Min: google.maps.Icon = {
    url: 'assets/icons/station-active-min.png', // Path to your active station icon
    scaledSize: new google.maps.Size(8, 8), // Desired size
    anchor: new google.maps.Point(4, 4), // Anchor point
  };

  stationInactiveIcon: google.maps.Icon = {
    url: 'assets/icons/station-inactive.png', // Path to your inactive station icon
    scaledSize: new google.maps.Size(30, 30), // Desired size
    anchor: new google.maps.Point(15, 15), // Anchor point
  };
  stationInactiveIcon_Min: google.maps.Icon = {
    url: 'assets/icons/station-inactive-min.png', // Path to your inactive station icon
    scaledSize: new google.maps.Size(8, 8), // Desired size
    anchor: new google.maps.Point(4, 4), // Anchor point
  };

  // Function to determine the appropriate icon based on operational status
  getStationIcon(station: Station, displayMode = ''): google.maps.Icon {
    const mode = displayMode || this.masterMapDisplayMode;
    let icon;

    switch (mode) {
      case 'highlight':
        icon = {
          ...(station?.isOperational
            ? this.stationActiveIcon
            : this.stationInactiveIcon),
        };
        break;
      case 'minimal':
        icon = {
          ...(station?.isOperational
            ? this.stationActiveIcon_Min
            : this.stationInactiveIcon_Min),
        };
        break;
      case 'base':
      default:
        icon = {
          ...(station?.isOperational
            ? this.stationActiveIcon
            : this.stationInactiveIcon),
        };
    }

    // overrides
    if (mode !== 'minimal') {
      if (station.stationActiveIcon && station?.isOperational) {
        icon.url = station.stationActiveIcon!;
      }
      if (station.stationInactiveIcon && !station?.isOperational) {
        icon.url = station.stationInactiveIcon!;
      }
    }

    return icon;
  }

  getStationActionIcon(station: Station): google.maps.Icon {
    // Clone the base icon
    let icon: google.maps.Icon = {
      url: 'assets/icons/station-action-board.png', // Path to your active station icon
      scaledSize: new google.maps.Size(30, 30), // Desired size
      anchor: new google.maps.Point(15, 55), // Anchor point
    };

    // Override icon for specific station types
    if (station.stationAction === 'board-initial') {
      icon.url = 'assets/icons/station-action-board-initial.png';
    } else if (station.stationAction === 'board') {
      icon.url = 'assets/icons/station-action-board.png';
    } else if (station.stationAction === 'alight-and-transfer') {
      icon.url = 'assets/icons/station-action-alight-and-transfer.png';
    } else if (station.stationAction === 'alight-end') {
      icon.url = 'assets/icons/station-action-alight-end.png';
    }

    return icon;
  }

  // Define polyline options for operational and non-operational edges
  operationalEdgeOptions: google.maps.PolylineOptions = {
    strokeColor: '#00FF00', // Green color for operational edges
    strokeOpacity: 1.0,
    strokeWeight: 6, // Thicker line
    icons: [], // Solid line
  };
  operationalEdgeOptions_Min: google.maps.PolylineOptions = {
    strokeColor: '#00FF00', // Green color for operational edges
    strokeOpacity: 1.0,
    strokeWeight: 2, // Thiner line
    icons: [], // Solid
  };
  operationalEdgeOptions_Highlight: google.maps.PolylineOptions = {
    strokeColor: '#00FF00', // Green color for operational edges
    strokeOpacity: 1.0,
    strokeWeight: 10, // Thicker line
    icons: [], // Solid
  };

  nonOperationalEdgeOptions: google.maps.PolylineOptions = {
    strokeColor: 'orange', // Red color for non-operational edges
    strokeOpacity: 0,
    strokeWeight: 4, // Thicker line
    icons: [
      {
        icon: {
          path: 'M 0,-1 0,1', // Simple line segment
          strokeOpacity: 1,
          scale: 4, // Controls dash thickness
        }, // Dashed line symbol
        offset: '0', // Start at the beginning
        repeat: '20px', // Distance between dashes
      },
    ],
  };
  nonOperationalEdgeOptions_Min: google.maps.PolylineOptions = {
    strokeColor: 'orange', // Red color for non-operational edges
    strokeOpacity: 0,
    strokeWeight: 2, // Thiner line
    icons: [
      {
        icon: {
          path: 'M 0,-1 0,1', // Simple line segment
          strokeOpacity: 1,
          scale: 2, // Controls dash thickness
        }, // Dashed line symbol
        offset: '0', // Start at the beginning
        repeat: '10px', // Distance between dashes
      },
    ],
  };
  nonOperationalEdgeOptions_Highlight: google.maps.PolylineOptions = {
    strokeColor: 'orange', // Red color for non-operational edges
    strokeOpacity: 0,
    strokeWeight: 10, // Thicker line
    icons: [
      {
        icon: {
          path: 'M 0,-1 0,1', // Simple line segment
          strokeOpacity: 1,
          scale: 4, // Controls dash thickness
        }, // Dashed line symbol
        offset: '0', // Start at the beginning
        repeat: '20px', // Distance between dashes
      },
    ],
  };

  // Function to determine the appropriate polyline options based on operational status
  getEdgeOptions(edge: Edge, displayMode = ''): google.maps.PolylineOptions {
    let edgeOptions: google.maps.PolylineOptions = this.operationalEdgeOptions;

    switch (displayMode || this.masterMapDisplayMode) {
      case 'highlight':
        edgeOptions = {
          ...(edge?.isOperational
            ? this.operationalEdgeOptions_Highlight
            : this.nonOperationalEdgeOptions_Highlight),
        };
        break;
      case 'minimal':
        edgeOptions = {
          ...(edgeOptions = edge?.isOperational
            ? this.operationalEdgeOptions_Min
            : this.nonOperationalEdgeOptions_Min),
        };
        break;
      case 'base':
      default:
        edgeOptions = {
          ...(edge?.isOperational
            ? this.operationalEdgeOptions
            : this.nonOperationalEdgeOptions),
        };
    }

    // apply station.lineColor to edgeOptions.strokeColor
    if (edge.lineColor) {
      edgeOptions.strokeColor = edge.lineColor;
    }

    if (edge.transferType === 'inter-line') {
      edgeOptions.strokeColor = 'black';
    }

    // transitMode
    if (edge.transitMode === 'walk') {
      // make dashed
      edgeOptions.strokeOpacity = 0;
      edgeOptions.strokeWeight = 4;
      edgeOptions.icons = [
        {
          icon: {
            path: 'M 0,-1 0,1', // Simple line segment
            strokeOpacity: 1,
            scale: 4, // Controls dash thickness
          }, // Dashed line symbol
          offset: '0', // Start at the beginning
          repeat: '15px', // Distance between dashes
        },
      ];
    }

    return edgeOptions;
  }

  center: google.maps.LatLngLiteral = { lat: 14.5995, lng: 120.9842 }; // Example coordinates
  zoom = 12;

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private transitService: TransitService) {
    // this.allLines = this.transitService.getAllLines();
    this.allStationsFlatObj = this.transitService.getAllStationsFlatObj();
    this.allStationsFlatArray = this.transitService.getAllStationsFlatArray();

    this.processMapMarkers();
  }

  ngOnInit() {}

  stationsArray: Station[] = [];
  edgesArray: Edge[] = [];
  processMapMarkers() {
    const stations: Station[] = [];
    const edgesWithPaths: Edge[] = [];

    this.allStationsFlatArray.forEach((station) => {
      if (station.coordinates) {
        stations.push(station);
      }
      if (station.edges) {
        station.edges.forEach((edge) => {
          if (edge.path && edge.path.length > 0) {
            edgesWithPaths.push(edge);
          }
        });
      }
    });

    this.stationsArray = stations; // TODO: get this function in transitService
    this.edgesArray = edgesWithPaths; // TODO: get this function in transitService
  }

  // Customize marker options
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: 'path/to/custom-icon.png', // Path to your custom icon
      scaledSize: new google.maps.Size(40, 40), // Scale the icon to desired size
    },
    label: {
      text: 'A', // Label text
      color: '#FFFFFF', // Label color
      fontSize: '16px', // Label font size
      fontWeight: 'bold', // Label font weight
    },
    title: 'Custom Marker', // Tooltip text on hover
  };
}
