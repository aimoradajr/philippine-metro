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

  center: google.maps.LatLngLiteral = {
    lat: 14.581111288955865,
    lng: 121.04244137485719,
  }; // Example coordinates
  zoom = 12;

  // Define the restriction and other map options
  mapOptions: google.maps.MapOptions = {
    restriction: {
      latLngBounds: {
        north: 14.934959773480792, // Northern boundary of NCR
        south: 14.172512762132273, // Southern boundary of NCR    // 121.24296679460922
        east: 121.24296679460922, // Eastern boundary of NCR
        west: 120.84009025026046, // Western boundary of NCR
      },
      strictBounds: false, // Allows the user to "touch" the boundary
    },
    minZoom: 10, // Optional: restrict zoom levels
    maxZoom: 18, // Optional: restrict zoom levels
  };

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
    scaledSize: new google.maps.Size(12, 12), // Desired size
    anchor: new google.maps.Point(6, 6), // Anchor point
  };
  stationActiveIcon_Min: google.maps.Icon = {
    url: 'assets/icons/station-active-min.png', // Path to your active station icon
    scaledSize: new google.maps.Size(6, 6), // Desired size
    anchor: new google.maps.Point(3, 3), // Anchor point
  };

  stationInactiveIcon: google.maps.Icon = {
    url: 'assets/icons/station-inactive.png', // Path to your inactive station icon
    scaledSize: new google.maps.Size(12, 12), // Desired size
    anchor: new google.maps.Point(6, 6), // Anchor point
  };
  stationInactiveIcon_Min: google.maps.Icon = {
    url: 'assets/icons/station-inactive-min.png', // Path to your inactive station icon
    scaledSize: new google.maps.Size(6, 6), // Desired size
    anchor: new google.maps.Point(3, 3), // Anchor point
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

    // override minimal
    if (mode === 'minimal') {
      if (station.stationActiveIcon_Min && station?.isOperational) {
        icon.url = station.stationActiveIcon_Min!;
      }
      if (station.stationInactiveIcon_Min && !station?.isOperational) {
        icon.url = station.stationInactiveIcon_Min!;
      }
    }

    // Estimate the label width (average width per character)
    const label = station.shortName || station.name;
    const charWidth = 7; // Adjust based on font size and style
    const nameLength = label.length || 1;
    const labelOffsetX =
      (nameLength * charWidth) / 2 + 13 + (station.labelOffsetx ?? 0);
    const labelOffsetY = 10 + (station.labelOffsety ?? 0); // Default vertical offset

    // Set the label origin
    icon.labelOrigin = new google.maps.Point(labelOffsetX, labelOffsetY);

    return icon;
  }

  getStationLabel(station: Station, displayMode = ''): google.maps.MarkerLabel {
    const mode = displayMode || this.masterMapDisplayMode;

    if (mode === 'minimal') {
      return {
        text: station.shortName || station.name,
        className: 'custom-marker-label-hide', // CSS class for styling
      };
    }

    if (mode === 'highlight') {
      return {
        text: station.shortName || station.name,
        color: 'black',
        fontWeight: 'bold',
        fontSize: '13px',
        className: 'custom-marker-label-highlight', // CSS class
      } as google.maps.MarkerLabel;
    }

    return {
      text: station.shortName || station.name,
      color: '#444',
      fontSize: '12px',
      className: 'custom-marker-label', // CSS class for styling
    } as google.maps.MarkerLabel;
  }

  getStationActionIcon(station: Station): google.maps.Icon {
    // Clone the base icon
    let icon: google.maps.Icon = {
      url: 'assets/icons/station-action-board.png', // Path to your active station icon
      scaledSize: new google.maps.Size(50, 50), // Desired size
      anchor: new google.maps.Point(25, 60), // Anchor point
    };

    // Override icon for specific station types
    if (station.stationAction === 'board-initial') {
      icon.url = 'assets/icons/station-action-board-initial.png';
    } else if (station.stationAction === 'board') {
      icon.url = '';
    } else if (station.stationAction === 'alight-and-transfer') {
      icon.url = 'assets/icons/station-action-transfer.png';
      icon.scaledSize = new google.maps.Size(60, 60);
      icon.anchor = new google.maps.Point(30, 50);
      // icon.url = 'assets/icons/station-action-exit.png';
      // icon.scaledSize = new google.maps.Size(40, 40);
      // icon.anchor = new google.maps.Point(20, 40);
    } else if (station.stationAction === 'alight-end') {
      icon.url = 'assets/icons/station-action-alight-end.png';
      icon.anchor = new google.maps.Point(25, 50);
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
    strokeWeight: 1, // Thiner line
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
    strokeWeight: 6, // Thicker line
    icons: [
      {
        icon: {
          path: 'M 0,-0.25 0,0.25', // Dash length = (0.5 - (-0.5)) × scale
          strokeOpacity: 0.69,
          scale: 6, // Controls dash thickness
        }, // Dashed line symbol
        offset: '0', // Start at the beginning
        repeat: '15px', // Distance between dashes
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
            path: 'M 0,-0.25 0,0.25', // Dash length = (0.5 - (-0.5)) × scale
            strokeOpacity: 0.69,
            scale: 6, // Controls dash thickness
          }, // Dashed line symbol
          offset: '0', // Start at the beginning
          repeat: '15px', // Distance between dashes
        },
      ];
    }

    return edgeOptions;
  }

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
