import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
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
import { Edge, Station, TransitLine } from '../core/transit.config';
import { TransitService } from '../core/transit.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
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
export class MapPage implements OnInit {
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  allLines: TransitLine[] = [];
  allStationsFlatObj: any = {};

  center: google.maps.LatLngLiteral = { lat: 14.5995, lng: 120.9842 }; // Example coordinates
  zoom = 12;

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private transitService: TransitService) {
    this.allLines = this.transitService.getAllLines();
    this.allStationsFlatObj = this.transitService.getAllStationsFlatObj();

    this.processMapMarkers();
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  stationsArray: Station[] = [];
  edgesArray: Edge[] = [];
  processMapMarkers() {
    const stations: Station[] = [];
    const edgesWithPaths: Edge[] = [];

    this.allLines.forEach((line) => {
      line.stations.forEach((station) => {
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
