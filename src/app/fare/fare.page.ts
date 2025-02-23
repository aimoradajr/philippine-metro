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
  IonItem,
  IonLabel,
  IonSelectOption,
  IonSelect,
} from '@ionic/angular/standalone';
import { FAREMATRIX } from '../core/transit.config'; // Adjust the path as needed
import { TransitService } from 'src/app/core/transit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fare',
  templateUrl: './fare.page.html',
  styleUrls: ['./fare.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
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
    IonItem,
    IonSelectOption,
    IonSelect,
  ],
})
export class FarePage implements OnInit {
  transitLines: any[] = [];

  origins: string[] = [];
  destinations: string[] = [];

  selectedLine: any = null;

  constructor(
    // private modalController: ModalController,
    private route: ActivatedRoute,
    private transitService: TransitService,
    private router: Router
  ) {
    this.transitLines = this.transitService.getAllLines();

    if (this.selectedLine) {
      this.selectLine(this.selectedLine.code);
    }
  }

  selectLine(lineCode: string) {
    const lineData = FAREMATRIX[lineCode];
    this.origins = Object.keys(lineData);
    if (this.origins.length) {
      this.destinations = Object.keys(lineData[this.origins[0]]);
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const lineCode = params['line_code'];
      this.selectLineByCode(lineCode);
    });
  }

  getFare(origin: string, destination: string): number {
    return FAREMATRIX[this.selectedLine.code][origin][destination];
  }

  // Remove the text before the underscore and replace underscores with spaces
  cleanStationName(name: string): string {
    const parts = name.split('_');
    parts.shift(); // remove first part
    return parts.join(' ').trim();
  }

  selectLineByCode(lineCode: string) {
    if (lineCode) {
      this.selectedLine = this.transitLines.find(
        (line) => line.code === lineCode
      );

      this.selectLine(this.selectedLine.code);
    }
  }

  onLineChange(event: any) {
    const lineCode = event.detail.value.code;
    // Update the route with the selected line code
    this.router.navigate(['/fare', lineCode]);
  }

  selectedRowIndex: number | null = null;
  selectedColIndex: number | null = null;

  selectCell(rowIndex: number, colIndex: number): void {
    this.selectedRowIndex = rowIndex;
    this.selectedColIndex = colIndex;
  }

  selectRow(rowIndex: number): void {
    this.selectedRowIndex = rowIndex;
  }

  selectCol(colIndex: number): void {
    this.selectedColIndex = colIndex;
  }
}
