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

  ngOnInit() {}
}
