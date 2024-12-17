import {
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
import { Edge, Station, TransitLine } from '../core/transit.config';
import { TransitService } from '../core/transit.service';
import { MapViewerComponent } from './map-viewer/map-viewer';

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
    MapViewerComponent,
  ],
})
export class MapPage implements OnInit {
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  allLines: TransitLine[] = [];
  allStations: Station[] = [];

  public folder!: string;
  constructor(private transitService: TransitService) {
    this.allLines = this.transitService.getAllLines();

    this.allStations = this.transitService.getAllStationsFlatArray();
  }

  ngOnInit() {
    this.generateDummyPath();
  }

  highlightStationsArray: Station[] = [];
  highlightEdgesArray: Edge[] = [];
  generateDummyPath() {
    const stations: Station[] = [];
    const edgesWithPaths: Edge[] = [];

    this.allStations.forEach((station) => {
      if (station.coordinates) {
        if (
          station.code === 'LRT1_LIBERTAD' ||
          station.code === 'LRT1_GIL_PUYAT' ||
          station.code === 'LRT1_VITO_CRUZ'
        ) {
          stations.push(station);

          if (station.edges) {
            station.edges.forEach((edge) => {
              if (edge.path && edge.path.length > 0) {
                edgesWithPaths.push(edge);
              }
            });
          }
        }
      }
    });

    this.highlightStationsArray = stations; // TODO: get this function in transitService
    this.highlightEdgesArray = edgesWithPaths; // TODO: get this function in transitService
  }
}
