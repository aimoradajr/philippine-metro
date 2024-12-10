// src/app/shared/services/transit-lines.service.ts
import { Injectable } from '@angular/core';
import { TRANSIT_LINES } from './transit.config';

// @ts-ignore
import Graph from 'node-dijkstra';

@Injectable({
  providedIn: 'root',
})
export class TransitService {
  private transitLines = TRANSIT_LINES;

  private route = new Graph();

  constructor() {
    this.initializeGraph();
  }

  private initializeGraph(): void {
    // Loop through each line and station
    TRANSIT_LINES.forEach((line) => {
      line.stations.forEach((station) => {
        const edges: Record<string, number> = {};

        // Define neighbors based on the station's edges property
        station?.edges?.forEach((edge) => {
          edges[edge.to] = edge.weight;
        });

        // Add the station and its edges to the graph
        this.route.addNode(station.code, edges);
      });
    });

    console.log('Graph initialized:', this.route);
  }

  findShortestPath(
    startCode: string,
    endCode: string
  ): { path: string[]; cost: number } | null {
    // Check if the start node exists in the graph
    if (!this.route.graph.has(startCode)) {
      console.error(
        `Start station '${startCode}' does not exist in the graph.`
      );
      return null;
    }

    // Check if the end node exists in the graph
    if (!this.route.graph.has(endCode)) {
      console.error(`End station '${endCode}' does not exist in the graph.`);
      return null;
    }

    // Find the shortest path
    const result = this.route.path(startCode, endCode, { cost: true });
    if (!result) {
      console.error(`No path exists between '${startCode}' and '${endCode}'.`);
      return null;
    }

    return result;
  }

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
