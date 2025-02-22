import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { FAREMATRIX } from '../core/transit.config'; // Adjust the path as needed

@Component({
  selector: 'app-fare',
  templateUrl: './fare.page.html',
  styleUrls: ['./fare.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class FarePage implements OnInit {
  constructor() {}

  lineKey = 'MRT3';
  origins: string[] = [];
  destinations: string[] = [];

  ngOnInit() {
    const lineData = FAREMATRIX[this.lineKey];
    this.origins = Object.keys(lineData);
    if (this.origins.length) {
      this.destinations = Object.keys(lineData[this.origins[0]]);
    }
  }

  getFare(origin: string, destination: string): number {
    return FAREMATRIX[this.lineKey][origin][destination];
  }

  // Remove the text before the underscore and replace underscores with spaces
  cleanStationName(name: string): string {
    const parts = name.split('_');
    parts.shift(); // remove first part
    return parts.join(' ').trim();
  }
}
