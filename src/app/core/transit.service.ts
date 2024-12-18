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

  findKShortestPaths(startCode: string, endCode: string, k: number): any[] {
    const paths: { path: string[]; cost: number }[] = [];

    if (!this.route.graph.has(startCode) || !this.route.graph.has(endCode)) {
      console.error(
        `Start station '${startCode}' or end station '${endCode}' does not exist in the graph.`
      );
      return [];
    }

    try {
      // Step 1: Find the first shortest path
      let firstPath = this.route.path(startCode, endCode, { cost: true });
      if (firstPath) {
        paths.push(firstPath);
      } else {
        console.error(
          `No path exists between '${startCode}' and '${endCode}'.`
        );
        return [];
      }

      // Step 2: Find the next k-1 paths
      for (let i = 1; i < k; i++) {
        const lastPath = paths[paths.length - 1];
        const candidatePaths: { path: string[]; cost: number }[] = [];

        for (let j = 0; j < lastPath.path.length - 1; j++) {
          const spurNode = lastPath.path[j];
          const rootPath = lastPath.path.slice(0, j + 1);
          const visitedSet = new Set(rootPath); // Track visited nodes

          // Create a temporary graph
          const tempGraph = new Graph();
          this.route.graph.forEach(
            (edges: Map<string, number>, node: string) => {
              const edgesObject = Array.from(edges.entries()).reduce(
                (acc, [key, value]) => {
                  acc[key] = value;
                  return acc;
                },
                {} as Record<string, number>
              );
              tempGraph.addNode(node, edgesObject);
            }
          );

          // Remove only the edge leading out of the spur node
          if (j < lastPath.path.length - 1) {
            const nextNode = lastPath.path[j + 1];
            const edgesForSpurNode = tempGraph.graph.get(spurNode);

            if (!edgesForSpurNode) {
              console.error(`Spur Node ${spurNode} has no edges in tempGraph.`);
              continue; // Skip this spur node if it has no edges
            }

            const updatedEdges: any = Array.from(
              edgesForSpurNode.entries()
            ).reduce((obj: any, [key, value]: any) => {
              obj[key] = value;
              return obj;
            }, {});
            delete updatedEdges[nextNode];

            if (Object.keys(updatedEdges).length === 0) {
              console.error(
                `After removing the edge, Spur Node ${spurNode} has no remaining connections.`
              );
            }

            tempGraph.addNode(spurNode, updatedEdges);
          }

          // Calculate the spur path, avoiding visited nodes
          const spurPath = tempGraph.path(spurNode, endCode, { cost: true });

          if (spurPath && spurPath.path) {
            // Ensure the spur path doesn't revisit nodes in the root path
            // console.log('Visited Set:', Array.from(visitedSet));
            // console.log('Spur Path:', spurPath.path);

            // Skip the first node (spurNode) when checking for revisited nodes
            const hasRevisited = spurPath.path
              .slice(1) // Exclude the spurNode
              .some((node: any) => visitedSet.has(String(node)));

            if (!hasRevisited) {
              // Combine root path and spur path
              const fullPath = {
                path: [...rootPath.slice(0, -1), ...spurPath.path],
                cost: spurPath.cost,
              };

              // Ensure the path is unique
              if (
                !paths.some(
                  (p) =>
                    JSON.stringify(p.path) === JSON.stringify(fullPath.path)
                )
              ) {
                candidatePaths.push(fullPath);
              }
            }
          }
        }

        // Sort candidate paths by cost
        candidatePaths.sort((a, b) => a.cost - b.cost);

        if (candidatePaths.length > 0) {
          paths.push(candidatePaths[0]);
        } else {
          console.warn(`No more unique paths found after ${i} iterations.`);
          break;
        }
      }
    } catch (error) {
      console.error(
        `Error finding k-shortest paths: ${
          error instanceof Error ? error.message : error
        }`
      );
      return [];
    }

    return paths;
  }

  getAllLines() {
    return this.transitLines;
  }

  getAllStationsFlatObj() {
    return this.transitLines.reduce((acc: Record<string, any>, line) => {
      line.stations.forEach((station: any) => {
        let newStation = {
          ...station,
          lineCode: line.code,
          lineColor: line.color,
          lineBgColor: line.bgColor,
          lineTextColor: line.textColor,

          stationActiveIcon: line.stationActiveIcon,
          stationInactiveIcon: line.stationInactiveIcon,
        };

        // attach line config to each edge
        if (station.edges) {
          newStation.edges = station.edges.map((edge: any) => {
            return {
              ...edge,

              from: edge.from || station.code,

              lineCode: line.code,
              lineColor: line.color,
              lineBgColor: line.bgColor,
              lineTextColor: line.textColor,

              stationActiveIcon: line.stationActiveIcon,
              stationInactiveIcon: line.stationInactiveIcon,
            };
          });
        }

        acc[station.code] = newStation;
      });
      return acc;
    }, {} as Record<string, any>);
  }

  getAllStationsFlatArray() {
    return this.transitLines.reduce((acc: any[], line) => {
      line.stations.forEach((station) => {
        let newStation = {
          ...station,
          lineCode: line.code,
          lineColor: line.color,
          lineBgColor: line.bgColor,
          lineTextColor: line.textColor,

          stationActiveIcon: line.stationActiveIcon,
          stationInactiveIcon: line.stationInactiveIcon,
        };

        // attach line config to each edge
        if (station.edges) {
          newStation.edges = station.edges.map((edge: any) => {
            return {
              ...edge,

              from: edge.from || station.code,

              lineCode: line.code,
              lineColor: line.color,
              lineBgColor: line.bgColor,
              lineTextColor: line.textColor,

              stationActiveIcon: line.stationActiveIcon,
              stationInactiveIcon: line.stationInactiveIcon,
            };
          });
        }

        acc.push(newStation);
      });
      return acc;
    }, []);
  }

  getLineByCode(code: string) {
    return this.transitLines.find((line) => line.code === code);
  }

  // simplify getStationByCode
  getStationByCode(stationCode: string) {
    return this.getAllStationsFlatObj()[stationCode];
  }
}
