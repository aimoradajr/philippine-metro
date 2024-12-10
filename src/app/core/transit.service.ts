// src/app/shared/services/transit-lines.service.ts
import { Injectable } from '@angular/core';
import { TRANSIT_LINES } from './transit.config';

@Injectable({
  providedIn: 'root',
})
export class TransitService {
  private transitLines = TRANSIT_LINES;

  getAllLines() {
    return this.transitLines;
  }

  getLineByCode(code: string) {
    return this.transitLines.find((line) => line.code === code);
  }

  getStationByCode(stationCode: string) {
    return this.transitLines
      .map((line) => line.stations)
      .reduce((acc, val) => acc.concat(val), [])
      .find((station) => station.code === stationCode);
  }
}
