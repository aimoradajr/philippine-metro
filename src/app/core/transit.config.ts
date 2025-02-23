export interface TransitLine {
  name: string;
  code: string;
  stations: Station[];
  color?: string;
  bgColor?: string;
  textColor?: string;

  stationActiveIcon?: string; // file path to icon
  stationInactiveIcon?: string; // file path to icon

  stationActiveIcon_Min?: string; // file path to icon
  stationInactiveIcon_Min?: string; // file path to icon

  // pricing
  minFare?: number; // in PHP
  maxFare?: number; // in PHP
}

export interface Station {
  id: number;
  code: string;
  name: string;
  shortName?: string;
  isOperational: boolean;
  description?: string;
  edges?: Edge[];

  // geo
  coordinates?: { lat: number; lng: number }; // Geographic coordinates

  // mapping
  labelOffsetx?: number; // default 60
  labelOffsety?: number; // default 15

  // auto derived line properties
  lineCode?: string;
  lineColor?: string;
  lineBgColor?: string;
  lineTextColor?: string;

  // auto derive from line
  stationActiveIcon?: string; // file path to icon
  stationInactiveIcon?: string; // file path to icon

  stationActiveIcon_Min?: string; // file path to icon
  stationInactiveIcon_Min?: string; // file path to icon

  // properties used for pathing and mapping
  stationAction?:
    | 'board-initial'
    | 'board'
    | 'alight-and-transfer'
    | 'alight-end'
    | null;
  prevEdge?: Edge; // in pathfinding context, the actual edge taken to reach this station
  nextEdge?: Edge; // in pathfinding context, the actual edge to take to reach the next station

  //
  boardingTime?: number; // in minutes. boarding time for passengers.

  //
  imageLocal?: string; // file path to image
  image?: string;
  imageAttributionHtml?: string; // New property for image attribution
}

export interface Edge {
  // code: string;
  from?: string;
  to: string;
  weight: number;
  transferType: 'inter-station' | 'inter-line' | 'inter-modal';
  duration: number; // in minutes
  transitMode?:
    | 'walk'
    | 'bicycle'
    | 'motorcycle'
    | 'tricycle'
    | 'taxi'
    | 'car'
    | 'jeepney'
    | 'bus'
    | 'train'
    | 'lrt'
    | 'mrt'
    | 'pnr'
    | 'ferry';
  isOperational: boolean;
  hide?: boolean; // hide edges so dashed lines are not conflicting
  transferDescription?: string;
  transferDistance?: string;
  accessibility?: string;
  additionalCost?: string;
  direction?: string; // northbound, southbound, eastbound, westbound, clockwise, counterclockwise

  // geo
  path?: { lat: number; lng: number }[]; // Sequence of coordinates defining the path

  // auto derived line properties
  lineCode?: string;
  lineColor?: string;
  lineBgColor?: string;
  lineTextColor?: string;
}

export const TRANSIT_LINES: TransitLine[] = [
  // LRT1
  {
    name: 'LRT 1',
    code: 'LRT1',
    color: 'green',
    bgColor: 'green',
    textColor: 'white',
    stationActiveIcon: 'assets/icons/station-active-lrt1.png',
    stationInactiveIcon: 'assets/icons/station-inactive-lrt1.png',
    stationActiveIcon_Min: 'assets/icons/station-active-min-lrt1.png',
    stationInactiveIcon_Min: 'assets/icons/station-inactive-min-lrt1.png',
    minFare: 1,
    maxFare: 3,
    stations: [
      {
        id: 0,
        code: 'LRT1_NORTH_TRIANGLE',
        name: 'North Triangle Common Station (LRT 1)',
        shortName: 'North Triangle',
        isOperational: false,
        description:
          'Common station for LRT-1, MRT-3, and MRT-7, located in Quezon City.',
        // 14.654907212698745, 121.03061845087198
        coordinates: { lat: 14.654907212698745, lng: 121.03061845087198 }, // North Triangle Station
        labelOffsetx: 60,
        labelOffsety: 15,
        edges: [
          {
            from: 'LRT1_NORTH_TRIANGLE',
            to: 'LRT1_FPJ',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from North Triangle to Balintawak is 5 minutes
            duration: 5,
            path: [
              // from me
              { lat: 14.654907212698745, lng: 121.03061845087198 }, // from me
              // 14.655518416460406, 121.03014953946366
              { lat: 14.655518416460406, lng: 121.03014953946366 }, // sub
              // 14.655673633202678, 121.02987130138196
              { lat: 14.655673633202678, lng: 121.02987130138196 }, // sub
              // 14.655835856974873, 121.02937651150218
              { lat: 14.655835856974873, lng: 121.02937651150218 }, // sub
              // 14.65740130434706, 121.02203216686243
              { lat: 14.65740130434706, lng: 121.02203216686243 }, // sub
              // to next
              { lat: 14.657615323114445, lng: 121.02094825800144 }, // to next
            ],
          },
          // inter-line: to mrt3
          {
            from: 'LRT1_NORTH_TRIANGLE',
            to: 'MRT3_NORTH_TRIANGLE',
            weight: 3, // Approximate walking time in minutes
            transferType: 'inter-line',
            // walk from LRT-1 North Triangle to MRT-3 North Triangle
            duration: 3,
            transitMode: 'walk',
            isOperational: false,
            transferDescription: 'Interchange to MRT-3',
            transferDistance: 'Approximately a 3-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'none',
            direction: 'southbound',
            path: [
              // from me
              { lat: 14.654907212698745, lng: 121.03061845087198 }, // from me
              // 14.65432411565809, 121.03097284680013
              { lat: 14.65432411565809, lng: 121.03097284680013 }, // to next
            ],
          },
          // inter-line: to mrt7
          {
            from: 'LRT1_NORTH_TRIANGLE',
            to: 'MRT7_NORTH_TRIANGLE',
            weight: 3, // Approximate walking time in minutes
            transferType: 'inter-line',
            // walk from LRT-1 North Triangle to MRT-7 North Triangle
            duration: 3,
            transitMode: 'walk',
            isOperational: false,
            transferDescription: 'Interchange to MRT-7',
            transferDistance: 'Approximately a 3-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'none',
            direction: 'southbound',
            path: [
              // from me
              { lat: 14.654907212698745, lng: 121.03061845087198 }, // from me
              { lat: 14.65524642912457, lng: 121.03168704337259 }, // North Triangle (MRT7) Common Station
            ],
          },
        ],
      },
      {
        id: 1,
        code: 'LRT1_FPJ',
        name: 'Fernando Poe Jr. (formerly Roosevelt)',
        shortName: 'FPJ (Roosevelt)',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_FPJ.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/7/79/LRT_Line_1_%28Metro_Manila_Districts%3B_2023-08-20%29_E911a_11.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:LRT_Line_1_(Metro_Manila_Districts;_2023-08-20)_E911a_11.jpg">E911a</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description:
          'Northern terminus of LRT-1, serving the Muñoz area in Quezon City.',
        // 14.657615323114445, 121.02094825800144
        coordinates: { lat: 14.657615323114445, lng: 121.02094825800144 }, // FPJ Station
        labelOffsetx: -30,
        labelOffsety: -13,
        edges: [
          {
            from: 'LRT1_FPJ',
            to: 'LRT1_NORTH_TRIANGLE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from FPJ to North Triangle is 5 minutes
            duration: 5,
            path: [
              { lat: 14.657615323114445, lng: 121.02094825800144 }, // from me
              // 14.65740130434706, 121.02203216686243
              { lat: 14.65740130434706, lng: 121.02203216686243 }, // sub
              // 14.655835856974873, 121.02937651150218
              { lat: 14.655835856974873, lng: 121.02937651150218 }, // sub
              // 14.655673633202678, 121.02987130138196
              { lat: 14.655673633202678, lng: 121.02987130138196 }, // sub
              // 14.655518416460406, 121.03014953946366
              { lat: 14.655518416460406, lng: 121.03014953946366 }, // sub
              { lat: 14.654907212698745, lng: 121.03061845087198 }, // to prev
            ],
          },
          {
            from: 'LRT1_FPJ',
            to: 'LRT1_BALINTAWAK',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from FPJ to Balintawak is 5 minutes
            duration: 5,
            path: [
              { lat: 14.657615323114445, lng: 121.02094825800144 }, // from me
              { lat: 14.657535163572017, lng: 121.00386348386314 }, // to next
            ],
          },
        ],
      },
      {
        id: 2,
        code: 'LRT1_BALINTAWAK',
        name: 'Balintawak',
        isOperational: true,
        description: 'Located in Quezon City, near Balintawak Market.',
        // 14.657535163572017, 121.00386348386314
        coordinates: { lat: 14.657535163572017, lng: 121.00386348386314 }, // Balintawak Station
        labelOffsetx: -40,
        labelOffsety: -15,
        imageLocal: 'assets/images/lines/lrt1/LRT1_BALINTAWAK.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/7/71/Balintawak_station_platform.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Balintawak_station_platform.jpg">PhiliptheNumber1</a>, CC0, via Wikimedia Commons',
        edges: [
          {
            from: 'LRT1_BALINTAWAK',
            to: 'LRT1_FPJ',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Balintawak to FPJ is 5 minutes
            duration: 5,
            path: [
              { lat: 14.657535163572017, lng: 121.00386348386314 }, // from me
              { lat: 14.657615323114445, lng: 121.02094825800144 }, // to prev
            ],
          },
          {
            from: 'LRT1_BALINTAWAK',
            to: 'LRT1_MONUMENTO',
            weight: 4,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Balintawak to Monumento is 4 minutes
            duration: 4,
            path: [
              { lat: 14.657535163572017, lng: 121.00386348386314 }, // from me
              // 14.657209605641192, 120.98572964783018
              { lat: 14.657209605641192, lng: 120.98572964783018 },
              // 14.657091618200797, 120.98457751234524
              { lat: 14.657091618200797, lng: 120.98457751234524 },
              // 14.656876707442757, 120.98423082884985
              { lat: 14.656876707442757, lng: 120.98423082884985 },
              // 14.656675180217537, 120.98401854406549
              { lat: 14.656675180217537, lng: 120.98401854406549 },
              // 14.65631867518301, 120.98388632643425
              { lat: 14.65631867518301, lng: 120.98388632643425 },
              { lat: 14.65432216386683, lng: 120.98384231447913 }, // to next
            ],
          },
        ],
      },
      {
        id: 3,
        code: 'LRT1_MONUMENTO',
        name: 'Monumento',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_MONUMENTO.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/a/ad/LRT-1_Monumento_2023-08-04.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:LRT-1_Monumento_2023-08-04.jpg">LMP 2001</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description:
          'A major station in Caloocan City, near the Bonifacio Monument.',
        // 14.65432216386683, 120.98384231447913
        coordinates: { lat: 14.65432216386683, lng: 120.98384231447913 }, // Monumento Station
        labelOffsetx: 5,
        edges: [
          {
            from: 'LRT1_MONUMENTO',
            to: 'LRT1_BALINTAWAK',
            weight: 4,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Monumento to Balintawak is 4 minutes
            duration: 4,
            path: [
              { lat: 14.65432216386683, lng: 120.98384231447913 }, // from me
              // reverse path from Balintawak to Monumento
              { lat: 14.65631867518301, lng: 120.98388632643425 },
              { lat: 14.656675180217537, lng: 120.98401854406549 },
              { lat: 14.656876707442757, lng: 120.98423082884985 },
              { lat: 14.657091618200797, lng: 120.98457751234524 },
              { lat: 14.657209605641192, lng: 120.98572964783018 },
              { lat: 14.657535163572017, lng: 121.00386348386314 }, // to prev
            ],
          },
          {
            from: 'LRT1_MONUMENTO',
            to: 'LRT1_5TH_AVENUE',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Monumento to 5th Avenue is 3 minutes
            duration: 3,
            path: [
              { lat: 14.65432216386683, lng: 120.98384231447913 }, // from me
              { lat: 14.644436303427462, lng: 120.983385695334 }, // to next
            ],
          },
        ],
      },
      {
        id: 4,
        code: 'LRT1_5TH_AVENUE',
        name: '5th Avenue',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_5TH_AVENUE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/f/fa/5th_Avenue_LRT_Station.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:5th_Avenue_LRT_Station.jpg">Ramon FVelasquez</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description: 'Located in Caloocan City, near 5th Avenue.',
        // 14.644436303427462, 120.983385695334
        coordinates: { lat: 14.644436303427462, lng: 120.983385695334 }, // 5th Avenue Station
        edges: [
          {
            from: 'LRT1_5TH_AVENUE',
            to: 'LRT1_MONUMENTO',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from 5th Avenue to Monumento is 3 minutes
            duration: 3,
            path: [
              { lat: 14.644436303427462, lng: 120.983385695334 }, // from me
              { lat: 14.65432216386683, lng: 120.98384231447913 }, // to prev
            ],
          },
          {
            from: 'LRT1_5TH_AVENUE',
            to: 'LRT1_R_PAPA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from 5th Avenue to R. Papa is 2 minutes
            duration: 2,
            path: [
              { lat: 14.644436303427462, lng: 120.983385695334 }, // from me
              // 14.638898949127556, 120.98327580498872
              { lat: 14.638898949127556, lng: 120.98327580498872 }, // sub
              // 14.638451312667224, 120.98322421261228
              { lat: 14.638451312667224, lng: 120.98322421261228 }, // sub
              // 14.637911788724617, 120.9830749623172
              { lat: 14.637911788724617, lng: 120.9830749623172 }, // sub
              // 14.637522231384345, 120.98290807193274
              { lat: 14.637522231384345, lng: 120.98290807193274 }, // sub
              { lat: 14.636138537552963, lng: 120.98228369673073 }, // to next
            ],
          },
        ],
      },
      {
        id: 5,
        code: 'LRT1_R_PAPA',
        name: 'R. Papa',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_R_PAPA.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/4/47/R._Papa_station_3351.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:R._Papa_station_3351.jpg">SwarmCheng</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Situated in Manila, near R. Papa Street.',
        // 14.636138537552963, 120.98228369673073
        coordinates: { lat: 14.636138537552963, lng: 120.98228369673073 }, // R. Papa Station
        edges: [
          {
            to: 'LRT1_5TH_AVENUE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from R. Papa to 5th Avenue is 2 minutes
            duration: 2,
            path: [
              { lat: 14.636138537552963, lng: 120.98228369673073 }, // from me
              // reverse path of subpoints from 5th Avenue to R. Papa
              { lat: 14.637522231384345, lng: 120.98290807193274 }, // sub
              { lat: 14.637911788724617, lng: 120.9830749623172 }, // sub
              { lat: 14.638451312667224, lng: 120.98322421261228 }, // sub
              { lat: 14.638898949127556, lng: 120.98327580498872 }, // sub
              { lat: 14.644436303427462, lng: 120.983385695334 }, // to prev
            ],
          },
          {
            to: 'LRT1_ABAD_SANTOS',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from R. Papa to Abad Santos is 2 minutes
            duration: 2,
            path: [
              { lat: 14.636138537552963, lng: 120.98228369673073 }, // from me
              // 14.633060481274489, 120.98079563862822
              { lat: 14.633060481274489, lng: 120.98079563862822 }, // sub
              // 14.632408286924557, 120.98060840870806
              { lat: 14.632408286924557, lng: 120.98060840870806 }, // sub
              // 14.632000666073349, 120.98057096607319
              { lat: 14.632000666073349, lng: 120.98057096607319 }, // sub
              // 14.631429999441794, 120.98071140056861
              { lat: 14.631429999441794, lng: 120.98071140056861 }, // sub
              // 14.631154881103795, 120.98089188598263
              { lat: 14.631154881103795, lng: 120.98089188598263 }, // sub
              { lat: 14.630590938571148, lng: 120.98129525929572 }, // to next
            ],
          },
        ],
      },
      {
        id: 6,
        code: 'LRT1_ABAD_SANTOS',
        name: 'Abad Santos',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_ABAD_SANTOS.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/8/8d/Abad_Santos_Station2.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Abad_Santos_Station2.jpg">SwarmCheng</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Located in Manila, near Abad Santos Avenue.',
        // 14.630590938571148, 120.98129525929572
        coordinates: { lat: 14.630590938571148, lng: 120.98129525929572 }, // Abad Santos Station
        edges: [
          {
            to: 'LRT1_R_PAPA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Abad Santos to R. Papa is 2 minutes
            duration: 2,
            path: [
              { lat: 14.630590938571148, lng: 120.98129525929572 }, // from me
              // reverse path of subpoints from R. Papa to Abad Santos
              { lat: 14.631154881103795, lng: 120.98089188598263 }, // sub
              { lat: 14.631429999441794, lng: 120.98071140056861 }, // sub
              { lat: 14.632000666073349, lng: 120.98057096607319 }, // sub
              { lat: 14.632408286924557, lng: 120.98060840870806 }, // sub
              { lat: 14.633060481274489, lng: 120.98079563862822 }, // sub
              { lat: 14.636138537552963, lng: 120.98228369673073 }, // to prev
            ],
          },
          {
            to: 'LRT1_BLUMENTRITT',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Abad Santos to Blumentritt is 2 minutes
            duration: 2,
            path: [
              { lat: 14.630590938571148, lng: 120.98129525929572 }, // from me
              // 14.629216400235583, 120.98265187722332
              { lat: 14.629216400235583, lng: 120.98265187722332 }, // sub
              // 14.628681955329705, 120.98289529553641
              { lat: 14.628681955329705, lng: 120.98289529553641 }, // sub
              // 14.62822903468541, 120.98296083455104
              { lat: 14.62822903468541, lng: 120.98296083455104 }, // sub
              { lat: 14.622652585067982, lng: 120.98286856250003 }, // to next
            ],
          },
        ],
      },
      {
        id: 7,
        code: 'LRT1_BLUMENTRITT',
        name: 'Blumentritt',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_BLUMENTRITT.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/4/48/Blumentritt_station_15.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Blumentritt_station_15.jpg">SwarmCheng</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'A station in Manila, near Blumentritt Road.',
        // 14.622652585067982, 120.98286856250003
        coordinates: { lat: 14.622652585067982, lng: 120.98286856250003 }, // Blumentritt Station
        labelOffsetx: -3,
        edges: [
          {
            to: 'LRT1_ABAD_SANTOS',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Blumentritt to Abad Santos is 2 minutes
            duration: 2,
            path: [
              { lat: 14.622652585067982, lng: 120.98286856250003 }, // from me
              // reverse path of subpoints from Abad Santos to Blumentritt
              { lat: 14.62822903468541, lng: 120.98296083455104 }, // sub
              { lat: 14.628681955329705, lng: 120.98289529553641 }, // sub
              { lat: 14.629216400235583, lng: 120.98265187722332 }, // sub
              { lat: 14.630590938571148, lng: 120.98129525929572 }, // to prev
            ],
          },
          {
            to: 'LRT1_TAYUMAN',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Blumentritt to Tayuman is 2 minutes
            duration: 2,
            path: [
              { lat: 14.622652585067982, lng: 120.98286856250003 }, // from me
              { lat: 14.61675788330022, lng: 120.98270392147654 }, // to next
            ],
          },
        ],
      },
      {
        id: 8,
        code: 'LRT1_TAYUMAN',
        name: 'Tayuman',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_TAYUMAN.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/1/1c/Tayuman_station_03.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Tayuman_station_03.jpg">RamaGaspar</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Located in Manila, near Tayuman Street.',
        // 14.61675788330022, 120.98270392147654
        coordinates: { lat: 14.61675788330022, lng: 120.98270392147654 }, // Tayuman Station
        labelOffsetx: 3,
        edges: [
          {
            to: 'LRT1_BLUMENTRITT',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Tayuman to Blumentritt is 2 minutes
            duration: 2,
            path: [
              { lat: 14.61675788330022, lng: 120.98270392147654 }, // from me
              { lat: 14.622652585067982, lng: 120.98286856250003 }, // to prev
            ],
          },
          {
            to: 'LRT1_BAMBANG',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Tayuman to Bambang is 2 minutes
            duration: 2,
            path: [
              { lat: 14.61675788330022, lng: 120.98270392147654 }, // from me
              // 14.613186646981697, 120.98262042848863
              { lat: 14.613186646981697, lng: 120.98262042848863 }, // sub
              { lat: 14.61117057596535, lng: 120.9822890904357 }, // to next
            ],
          },
        ],
      },
      {
        id: 9,
        code: 'LRT1_BAMBANG',
        name: 'Bambang',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_BAMBANG.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/f/ff/Bambang_station_02.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Bambang_station_02.jpg">SwarmCheng</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Situated in Manila, near Bambang Street.',
        // 14.61117057596535, 120.9822890904357
        coordinates: { lat: 14.61117057596535, lng: 120.9822890904357 }, // Bambang Station
        labelOffsetx: 3,
        edges: [
          {
            to: 'LRT1_TAYUMAN',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Bambang to Tayuman is 2 minutes
            duration: 2,
            path: [
              { lat: 14.61117057596535, lng: 120.9822890904357 }, // from me
              // 14.613186646981697, 120.98262042848863
              { lat: 14.613186646981697, lng: 120.98262042848863 }, // sub
              { lat: 14.61675788330022, lng: 120.98270392147654 }, // to prev
            ],
          },
          {
            to: 'LRT1_DOROTEO_JOSE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Bambang to Doroteo Jose is 2 minutes
            duration: 2,
            path: [
              { lat: 14.61117057596535, lng: 120.9822890904357 }, // from me
              { lat: 14.605461953754634, lng: 120.98194541980351 }, // to next
            ],
          },
        ],
      },
      {
        id: 10,
        code: 'LRT1_DOROTEO_JOSE',
        name: 'Doroteo Jose',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_DOROTEO_JOSE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/8/81/Doroteo_Jose_LRT-1_2019-12-21.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Doroteo_Jose_LRT-1_2019-12-21.jpg">LMP 2001</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'A major transfer point in Manila, connecting to LRT-2.',
        // 14.605461953754634, 120.98194541980351
        coordinates: { lat: 14.605461953754634, lng: 120.98194541980351 }, // Doroteo Jose Station
        labelOffsety: -8,
        edges: [
          {
            to: 'LRT1_BAMBANG',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Doroteo Jose to Bambang is 2 minutes
            duration: 2,
            path: [
              { lat: 14.605461953754634, lng: 120.98194541980351 }, // from me
              { lat: 14.61117057596535, lng: 120.9822890904357 }, // to prev
            ],
          },
          {
            to: 'LRT1_CARRIEDO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Doroteo Jose to Carriedo is 2 minutes
            duration: 2,
            path: [
              { lat: 14.605461953754634, lng: 120.98194541980351 }, // from me
              // 14.602470553625214, 120.98179378869963
              { lat: 14.602470553625214, lng: 120.98179378869963 }, // sub
              { lat: 14.59904708041471, lng: 120.98140067370474 }, // to next
            ],
          },
          {
            from: 'LRT1_DOROTEO_JOSE',
            to: 'LRT2_RECTO',
            weight: 2,
            transferType: 'inter-line',
            // travel duration from Doroteo Jose to LRT-2 Recto walking thru the elevated walkway is 2 minutes
            duration: 2,
            transitMode: 'walk',
            isOperational: true,
            transferDescription: 'Connected via an elevated walkway.',
            transferDistance: 'Approximately 2-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'Separate fare required',
            direction: 'northbound', // Assuming Recto is northbound relative to LRT-1 Doroteo Jose
            path: [
              { lat: 14.605461953754634, lng: 120.98194541980351 }, // from me
              // 14.605224784266968, 120.98226550443184
              { lat: 14.605224784266968, lng: 120.98226550443184 }, // sub
              // 14.605202192121055, 120.98260949708005
              { lat: 14.605202192121055, lng: 120.98260949708005 }, // sub
              // 14.60506192232233, 120.98277693634905
              { lat: 14.60506192232233, lng: 120.98277693634905 }, // sub
              // 14.603899607486674, 120.98251841770447
              { lat: 14.603899607486674, lng: 120.98251841770447 }, // sub
              // 14.603764263986196, 120.98337020088941
              { lat: 14.603764263986196, lng: 120.98337020088941 }, // sub
              { lat: 14.60348141245216, lng: 120.9834813414183 }, // to next line (LRT-2 Recto)
            ],
          },
        ],
      },
      {
        id: 11,
        code: 'LRT1_CARRIEDO',
        name: 'Carriedo',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_CARRIEDO.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Carriedo_station_platform.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Carriedo_station_platform.jpg">PhiliptheNumber1</a>, CC0, via Wikimedia Commons',
        description: 'Located in Manila, near Carriedo Street.',
        // 14.59904708041471, 120.98140067370474
        coordinates: { lat: 14.59904708041471, lng: 120.98140067370474 }, // Carriedo Station
        labelOffsety: 10,
        edges: [
          {
            to: 'LRT1_DOROTEO_JOSE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Carriedo to Doroteo Jose is 2 minutes
            duration: 2,
            path: [
              { lat: 14.59904708041471, lng: 120.98140067370474 }, // from me
              // 14.602470553625214, 120.98179378869963
              { lat: 14.602470553625214, lng: 120.98179378869963 }, // sub
              { lat: 14.605461953754634, lng: 120.98194541980351 }, // to prev
            ],
          },
          {
            to: 'LRT1_CENTRAL_TERMINAL',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Carriedo to Central Terminal is 2 minutes
            duration: 2,
            path: [
              { lat: 14.59904708041471, lng: 120.98140067370474 }, // from me
              // 14.598500583033132, 120.98116348440263
              { lat: 14.598500583033132, lng: 120.98116348440263 }, // sub
              // 14.597768660274586, 120.98080824915152
              { lat: 14.597768660274586, lng: 120.98080824915152 }, // sub
              // 14.597535776705588, 120.98076241515649
              { lat: 14.597535776705588, lng: 120.98076241515649 }, // sub
              // 14.596094120338769, 120.98064784602249
              { lat: 14.596094120338769, lng: 120.98064784602249 }, // sub
              // 14.595628355995272, 120.98069369216049
              { lat: 14.595628355995272, lng: 120.98069369216049 }, // sub
              { lat: 14.592772584129786, lng: 120.98160257975337 }, // to next
            ],
          },
        ],
      },
      {
        id: 12,
        code: 'LRT1_CENTRAL_TERMINAL',
        name: 'Central Terminal',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_CENTRAL_TERMINAL.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/7/76/Central_Terminal_Platform.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Central_Terminal_Platform.jpg">Ultimatemetalhead485</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Situated in Manila, near the Manila City Hall.',
        // 14.592772584129786, 120.98160257975337
        coordinates: { lat: 14.592772584129786, lng: 120.98160257975337 }, // Central Terminal Station
        labelOffsetx: -5,
        labelOffsety: 10,
        edges: [
          {
            to: 'LRT1_CARRIEDO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Central Terminal to Carriedo is 2 minutes
            duration: 2,
            path: [
              { lat: 14.592772584129786, lng: 120.98160257975337 }, // from me
              // reverse path of subpoints from Carriedo to Central Terminal
              { lat: 14.595628355995272, lng: 120.98069369216049 }, // sub
              { lat: 14.596094120338769, lng: 120.98064784602249 }, // sub
              { lat: 14.597535776705588, lng: 120.98076241515649 }, // sub
              { lat: 14.597768660274586, lng: 120.98080824915152 }, // sub
              { lat: 14.598500583033132, lng: 120.98116348440263 }, // sub
              { lat: 14.59904708041471, lng: 120.98140067370474 }, // to prev
            ],
          },
          {
            to: 'LRT1_UN_AVENUE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Central Terminal to UN Avenue is 2 minutes
            duration: 2,
            path: [
              { lat: 14.592772584129786, lng: 120.98160257975337 }, // from me
              // 14.591835040958324, 120.98182731071763
              { lat: 14.591835040958324, lng: 120.98182731071763 }, // sub
              // 14.590484494584318, 120.98190383972505
              { lat: 14.590484494584318, lng: 120.98190383972505 }, // sub
              // 14.589078455659797, 120.9821141863224
              { lat: 14.589078455659797, lng: 120.9821141863224 }, // sub
              // 14.587690908820747, 120.98192306636662
              { lat: 14.587690908820747, lng: 120.98192306636662 }, // sub
              // 14.587043393076977, 120.98201867449129
              { lat: 14.587043393076977, lng: 120.98201867449129 }, // sub
              { lat: 14.582547796804986, lng: 120.98454208223805 }, // to next
            ],
          },
        ],
      },
      {
        id: 13,
        code: 'LRT1_UN_AVENUE',
        name: 'United Nations (UN) Avenue',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_UN_AVENUE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/6/68/UN_Station_06-2024.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:UN_Station_06-2024.jpg">FlorZi</a>, CC0, via Wikimedia Commons',
        description: 'Located in Manila, near the United Nations Avenue.',
        // 14.582547796804986, 120.98454208223805
        coordinates: { lat: 14.582547796804986, lng: 120.98454208223805 }, // UN Avenue Station
        labelOffsetx: -5,
        edges: [
          {
            to: 'LRT1_CENTRAL_TERMINAL',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from UN Avenue to Central Terminal is 2 minutes
            duration: 2,
            path: [
              { lat: 14.582547796804986, lng: 120.98454208223805 }, // from me
              // reverse path of subpoints from Central Terminal to UN Avenue
              { lat: 14.587043393076977, lng: 120.98201867449129 }, // sub
              { lat: 14.587690908820747, lng: 120.98192306636662 }, // sub
              { lat: 14.589078455659797, lng: 120.9821141863224 }, // sub
              { lat: 14.590484494584318, lng: 120.98190383972505 }, // sub
              { lat: 14.591835040958324, lng: 120.98182731071763 }, // sub
              { lat: 14.592772584129786, lng: 120.98160257975337 }, // to prev
            ],
          },
          {
            to: 'LRT1_PEDRO_GIL',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from UN Avenue to Pedro Gil is 2 minutes
            duration: 2,
            path: [
              { lat: 14.582547796804986, lng: 120.98454208223805 }, // from me
              { lat: 14.576554438385337, lng: 120.98800315230707 }, // to next
            ],
          },
        ],
      },
      {
        id: 14,
        code: 'LRT1_PEDRO_GIL',
        name: 'Pedro Gil',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_PEDRO_GIL.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/9/9c/LRT1_1G_%281000_class%29_train_at_Pedro_Gil_station.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:LRT1_1G_(1000_class)_train_at_Pedro_Gil_station.jpg">GFDL</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA 2.0</a>, via Wikimedia Commons',
        description:
          'Situated in Ermita, Manila, near Pedro Gil Street. Nearby landmarks include Robinsons Place Manila and the University of the Philippines Manila.',
        // 14.576554438385337, 120.98800315230707
        coordinates: { lat: 14.576554438385337, lng: 120.98800315230707 }, // Pedro Gil Station
        edges: [
          {
            to: 'LRT1_UN_AVENUE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Pedro Gil to UN Avenue is 2 minutes
            duration: 2,
            path: [
              { lat: 14.576554438385337, lng: 120.98800315230707 }, // from me
              { lat: 14.582547796804986, lng: 120.98454208223805 }, // to prev
            ],
          }, // Northbound
          {
            to: 'LRT1_QUIRINO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Pedro Gil to Quirino is 2 minutes
            duration: 2,
            path: [
              { lat: 14.576554438385337, lng: 120.98800315230707 }, // from me
              { lat: 14.570502454798115, lng: 120.99151131231389 }, // to next
            ],
          }, // Southbound
        ],
      },
      {
        id: 15,
        code: 'LRT1_QUIRINO',
        name: 'Quirino',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_QUIRINO.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/9/95/9663LRT_Stations_Manila_Landmarks_03.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:9663LRT_Stations_Manila_Landmarks_03.jpg">Judgefloro</a>, CC0, via Wikimedia Commons',
        description: 'Located in Manila, near Quirino Avenue.',
        // 14.570502454798115, 120.99151131231389
        coordinates: { lat: 14.570502454798115, lng: 120.99151131231389 }, // Quirino Station
        edges: [
          {
            to: 'LRT1_PEDRO_GIL',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Quirino to Pedro Gil is 2 minutes
            duration: 2,
            path: [
              { lat: 14.570502454798115, lng: 120.99151131231389 }, // from me
              { lat: 14.576554438385337, lng: 120.98800315230707 }, // to prev
            ],
          },
          {
            to: 'LRT1_VITO_CRUZ',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Quirino to Vito Cruz is 2 minutes
            duration: 2,
            path: [
              { lat: 14.570502454798115, lng: 120.99151131231389 }, // from me
              { lat: 14.563565052791175, lng: 120.99481603865144 }, // to next
            ],
          },
        ],
      },
      {
        id: 16,
        code: 'LRT1_VITO_CRUZ',
        name: 'Vito Cruz',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_VITO_CRUZ.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/7/72/9663LRT_Stations_Manila_Landmarks_14.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:9663LRT_Stations_Manila_Landmarks_14.jpg">Judgefloro</a>, CC0, via Wikimedia Commons',
        description: 'Situated in Manila, near Vito Cruz Street.',
        // 14.563565052791175, 120.99481603865144
        coordinates: { lat: 14.563565052791175, lng: 120.99481603865144 }, // Vito Cruz Station
        edges: [
          {
            to: 'LRT1_QUIRINO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Vito Cruz to Quirino is 2 minutes
            duration: 2,
            path: [
              { lat: 14.563565052791175, lng: 120.99481603865144 }, // from me
              { lat: 14.570502454798115, lng: 120.99151131231389 }, // to prev
            ],
          },
          {
            to: 'LRT1_GIL_PUYAT',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Vito Cruz to Gil Puyat is 2 minutes
            duration: 2,
            path: [
              { lat: 14.563565052791175, lng: 120.99481603865144 }, // from me
              // 14.562467767309625, 120.99518000734405
              { lat: 14.562467767309625, lng: 120.99518000734405 }, // sub
              { lat: 14.55428697609849, lng: 120.99712587034271 }, // to next
            ],
          },
        ],
      },
      {
        id: 17,
        code: 'LRT1_GIL_PUYAT',
        name: 'Gil Puyat',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_GIL_PUYAT.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/c/c2/Line_1_Gil_Puyat_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_1_Gil_Puyat_Station_Platform_1.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description: 'Located in Pasay City, near Gil Puyat Avenue.',
        // 14.55428697609849, 120.99712587034271
        coordinates: { lat: 14.55428697609849, lng: 120.99712587034271 }, // Gil Puyat Station
        edges: [
          {
            to: 'LRT1_VITO_CRUZ',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Gil Puyat to Vito Cruz is 2 minutes
            duration: 2,
            path: [
              { lat: 14.55428697609849, lng: 120.99712587034271 }, // from me
              // reverse path of subpoints from Vito Cruz to Gil Puyat
              { lat: 14.562467767309625, lng: 120.99518000734405 }, // sub
              { lat: 14.563565052791175, lng: 120.99481603865144 }, // to prev
            ],
          },
          {
            to: 'LRT1_LIBERTAD',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Gil Puyat to Libertad is 2 minutes
            duration: 2,
            path: [
              { lat: 14.55428697609849, lng: 120.99712587034271 }, // from me
              { lat: 14.547796780097222, lng: 120.99855948289108 }, // to next
            ],
          },
        ],
      },
      {
        id: 18,
        code: 'LRT1_LIBERTAD',
        name: 'Libertad',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_LIBERTAD.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/c/cb/LRT-1_Libertad_Station%2C_Pasay_City%2C_Mar_2024.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:LRT-1_Libertad_Station,_Pasay_City,_Mar_2024.jpg">Ralff Nestor Nacor</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Situated in Pasay City, near Libertad Street.',
        // 14.547796780097222, 120.99855948289108
        coordinates: { lat: 14.547796780097222, lng: 120.99855948289108 }, // Libertad Station
        edges: [
          {
            to: 'LRT1_GIL_PUYAT',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Libertad to Gil Puyat is 2 minutes
            duration: 2,
            path: [
              { lat: 14.547796780097222, lng: 120.99855948289108 }, // from me
              { lat: 14.55428697609849, lng: 120.99712587034271 }, // to prev
            ],
          },
          {
            to: 'LRT1_EDSA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Libertad to EDSA is 2 minutes
            duration: 2,
            path: [
              { lat: 14.547796780097222, lng: 120.99855948289108 }, // from me
              { lat: 14.538714843616395, lng: 121.00063929330985 }, // to next
            ],
          },
        ],
      },
      {
        id: 19,
        code: 'LRT1_EDSA',
        name: 'EDSA',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_EDSA.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/c/cf/Essential_workers_await_the_arrival_of_an_LRT_train_at_the_Edsa_Station.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Essential_workers_await_the_arrival_of_an_LRT_train_at_the_Edsa_Station.jpg">PNA photo by Jess M. Escaros Jr.</a>, Public domain, via Wikimedia Commons',
        description:
          'Located in Pasay City, near the intersection of Taft Avenue and Epifanio de los Santos Avenue (EDSA).',
        // 14.538714843616395, 121.00063929330985
        coordinates: { lat: 14.538714843616395, lng: 121.00063929330985 }, // EDSA Station
        labelOffsetx: 5,
        labelOffsety: -10,
        edges: [
          {
            to: 'LRT1_LIBERTAD',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from EDSA to Libertad is 2 minutes
            duration: 2,
            path: [
              { lat: 14.538714843616395, lng: 121.00063929330985 }, // from me
              { lat: 14.547796780097222, lng: 120.99855948289108 }, // to prev
            ],
          },
          {
            to: 'LRT1_BACLARAN',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from EDSA to Baclaran is 2 minutes
            duration: 2,
            path: [
              { lat: 14.538714843616395, lng: 121.00063929330985 }, // from me
              // 14.5381857914863, 121.00068469805295
              { lat: 14.5381857914863, lng: 121.00068469805295 }, // sub
              // 14.53788938104625, 121.00063366385056
              { lat: 14.53788938104625, lng: 121.00063366385056 }, // sub
              // 14.537568269908629, 121.00056987099117
              { lat: 14.537568269908629, lng: 121.00056987099117 }, // sub
              // 14.537271859514542, 121.00045504260623
              { lat: 14.537271859514542, lng: 121.00045504260623 }, // sub
              // 14.537074252611333, 121.00037849050025
              { lat: 14.537074252611333, lng: 121.00037849050025 }, // sub
              { lat: 14.534216158572693, lng: 120.99823494117172 }, // to next
            ],
          },
          {
            from: 'LRT1_EDSA',
            to: 'MRT3_TAFT_AVENUE',
            weight: 5, // Approximate walking time in minutes
            transferType: 'inter-line',
            // travel duration from LRT-1 EDSA to MRT-3 Taft Avenue walking thru the covered footbridge is 5 minutes
            duration: 5,
            transitMode: 'walk',
            isOperational: true,
            transferDescription: 'Connected via a covered footbridge.',
            transferDistance: 'Approximately a 5-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'Separate fare required',
            direction: 'northbound', // Assuming MRT-3 Taft Avenue is northbound relative to LRT-1 EDSA
            path: [
              { lat: 14.538714843616395, lng: 121.00063929330985 }, // from me
              // reverse path of subpoints from MRT-3 Taft Avenue to LRT-1 EDSA
              // 14.538406455821, 121.00083645055177
              { lat: 14.538406455821, lng: 121.00083645055177 }, // sub
              // 14.538177389200289, 121.00085596709869
              { lat: 14.538177389200289, lng: 121.00085596709869 }, // sub
              // 14.538071120961797, 121.00086572597958
              { lat: 14.538071120961797, lng: 121.00086572597958 }, // sub
              // 14.537990829445746, 121.00088524328747
              { lat: 14.537990829445746, lng: 121.00088524328747 }, // sub
              // 14.537915260989628, 121.00091451907946
              { lat: 14.537915260989628, lng: 121.00091451907946 }, // sub
              // 14.537870392275671, 121.00095355328669
              { lat: 14.537870392275671, lng: 121.00095355328669 }, // sub
              // 14.537837331204383, 121.00101942337176
              { lat: 14.537837331204383, lng: 121.00101942337176 }, // sub
              // 14.537811354703617, 121.00110481043818
              { lat: 14.537811354703617, lng: 121.00110481043818 }, // sub
              // 14.537787739829989, 121.00129998070378
              { lat: 14.537787739829989, lng: 121.00129998070378 }, // sub
              // 14.53762007223042, 121.0013634111226
              { lat: 14.53762007223042, lng: 121.0013634111226 }, // sub
              { lat: 14.53768596175474, lng: 121.00178304515234 }, // to next line
            ],
          },
        ],
      },
      {
        id: 20,
        code: 'LRT1_BACLARAN',
        name: 'Baclaran',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_BACLARAN.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/1/17/LRT1_Baclaran_station_and_1000_class.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:LRT1_Baclaran_station_and_1000_class.jpg">Angge (longcakeHigad)</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description:
          'Southern terminus of the original LRT-1 line, located in Parañaque City.',
        // 14.534216158572693, 120.99823494117172
        coordinates: { lat: 14.534216158572693, lng: 120.99823494117172 }, // Baclaran Station
        labelOffsety: 10,
        edges: [
          {
            to: 'LRT1_EDSA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Baclaran to EDSA is 2 minutes
            duration: 2,
            path: [
              { lat: 14.534216158572693, lng: 120.99823494117172 }, // from me
              // reverse path of subpoints from EDSA to Baclaran
              { lat: 14.537074252611333, lng: 121.00037849050025 }, // sub
              { lat: 14.537271859514542, lng: 121.00045504260623 }, // sub
              { lat: 14.537568269908629, lng: 121.00056987099117 }, // sub
              { lat: 14.53788938104625, lng: 121.00063366385056 }, // sub
              { lat: 14.5381857914863, lng: 121.00068469805295 }, // sub
              { lat: 14.538714843616395, lng: 121.00063929330985 }, // to prev
            ],
          },
          {
            to: 'LRT1_REDEMPTORIST',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Baclaran to Redemptorist is 3 minutes
            duration: 3,
            path: [
              { lat: 14.534216158572693, lng: 120.99823494117172 }, // from me
              // 14.532739239486938, 120.99707396391658
              { lat: 14.532739239486938, lng: 120.99707396391658 }, // sub
              // 14.532368719418699, 120.99666568347568
              { lat: 14.532368719418699, lng: 120.99666568347568 }, // sub
              // 14.532269913296876, 120.99646154302616
              { lat: 14.532269913296876, lng: 120.99646154302616 }, // sub
              // 14.532084615532654, 120.99353976510827
              { lat: 14.532084615532654, lng: 120.99353976510827 }, // sub
              // 14.531899347551047, 120.9931442415661
              { lat: 14.531899347551047, lng: 120.9931442415661 }, // sub
              // 14.53172643401245, 120.99295286088595
              { lat: 14.53172643401245, lng: 120.99295286088595 }, // sub
              // 14.531405312710923, 120.99278700134937
              { lat: 14.531405312710923, lng: 120.99278700134937 }, // sub
              // 14.531207701281478, 120.99276148765136
              { lat: 14.531207701281478, lng: 120.99276148765136 }, // sub
              { lat: 14.530231044787087, lng: 120.99278168609546 }, // to next
            ],
          },
        ],
      },
      // Newly operational stations from the Cavite Extension Phase 1
      {
        id: 21,
        code: 'LRT1_REDEMPTORIST',
        name: 'Redemptorist',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_REDEMPTORIST.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/9/90/Redemptoristplatform-A.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Redemptoristplatform-A.jpg">FLOCKTHEORY</a>, CC0, via Wikimedia Commons',
        description: 'Located in Parañaque City, near the Redemptorist Church.',
        // 14.530231044787087, 120.99278168609546
        coordinates: { lat: 14.530231044787087, lng: 120.99278168609546 }, // Redemptorist Station
        labelOffsety: 10,
        edges: [
          {
            from: 'LRT1_REDEMPTORIST',
            to: 'LRT1_BACLARAN',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Redemptorist to Baclaran is 3 minutes
            duration: 3,
            path: [
              { lat: 14.530231044787087, lng: 120.99278168609546 }, // from me
              // reverse path of subpoints from Baclaran to Redemptorist
              { lat: 14.531207701281478, lng: 120.99276148765136 }, // sub
              { lat: 14.531405312710923, lng: 120.99278700134937 }, // sub
              { lat: 14.53172643401245, lng: 120.99295286088595 }, // sub
              { lat: 14.531899347551047, lng: 120.9931442415661 }, // sub
              { lat: 14.532084615532654, lng: 120.99353976510827 }, // sub
              { lat: 14.532269913296876, lng: 120.99646154302616 }, // sub
              { lat: 14.532368719418699, lng: 120.99666568347568 }, // sub
              { lat: 14.532739239486938, lng: 120.99707396391658 }, // sub
              { lat: 14.534216158572693, lng: 120.99823494117172 }, // to prev
            ],
          },
          {
            from: 'LRT1_REDEMPTORIST',
            to: 'LRT1_MIA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Redemptorist to MIA is 2 minutes
            duration: 2,
            path: [
              { lat: 14.530231044787087, lng: 120.99278168609546 }, // from me
              // 14.526760154398835, 120.99330875628665
              { lat: 14.526760154398835, lng: 120.99330875628665 }, // sub
              // 14.522207760305943, 120.99330886487444
              { lat: 14.522207760305943, lng: 120.99330886487444 }, // sub
              { lat: 14.518510885287759, lng: 120.99286667487398 }, // to next
            ],
          },
        ],
      },
      {
        id: 22,
        code: 'LRT1_MIA',
        name: 'MIA',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_MIA.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/5/5d/MIAPlatform-A.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:MIAPlatform-A.jpg">FLOCKTHEORY</a>, CC0, via Wikimedia Commons',
        description:
          'Situated near the Ninoy Aquino International Airport (NAIA) complex.',
        // 14.518510885287759, 120.99286667487398
        coordinates: { lat: 14.518510885287759, lng: 120.99286667487398 }, // MIA
        labelOffsetx: 5,
        edges: [
          {
            from: 'LRT1_MIA',
            to: 'LRT1_REDEMPTORIST',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from MIA to Redemptorist is 2 minutes
            duration: 2,
            path: [
              { lat: 14.518510885287759, lng: 120.99286667487398 }, // from me
              // reverse path of subpoints from Redemptorist to MIA
              { lat: 14.522207760305943, lng: 120.99330886487444 }, // sub
              { lat: 14.526760154398835, lng: 120.99330875628665 }, // sub
              { lat: 14.530231044787087, lng: 120.99278168609546 }, // to prev
            ],
          },
          {
            to: 'LRT1_ASIA_WORLD',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from MIA to Asia World is 3 minutes
            duration: 3,
            path: [
              { lat: 14.518510885287759, lng: 120.99286667487398 }, // from me
              // 14.513553163448954, 120.99237012784604
              { lat: 14.513553163448954, lng: 120.99237012784604 }, // sub
              // 14.511723949829252, 120.99205668902954
              { lat: 14.511723949829252, lng: 120.99205668902954 }, // sub
              { lat: 14.50845418511056, lng: 120.99118615050102 }, // to next
            ],
          },
        ],
      },
      {
        id: 23,
        code: 'LRT1_ASIA_WORLD',
        name: 'Asia World (PITX)',
        shortName: 'Asia World (PITX)',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_ASIA_WORLD.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/2/2d/Asiaworldplatform-A.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Asiaworldplatform-A.jpg">FLOCKTHEORY</a>, CC0, via Wikimedia Commons',
        description:
          'Located in Parañaque City, near the Asia World City complex.',
        // 14.50845418511056, 120.99118615050102
        coordinates: { lat: 14.50845418511056, lng: 120.99118615050102 }, // Asia World
        edges: [
          {
            to: 'LRT1_MIA',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Asia World to MIA is 3 minutes
            duration: 3,
            path: [
              { lat: 14.50845418511056, lng: 120.99118615050102 }, // from me
              // reverse path of subpoints from MIA to Asia World
              { lat: 14.511723949829252, lng: 120.99205668902954 }, // sub
              { lat: 14.513553163448954, lng: 120.99237012784604 }, // sub
              { lat: 14.518510885287759, lng: 120.99286667487398 }, // to prev
            ],
          },
          {
            to: 'LRT1_NINOY_AQUINO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Asia World to Ninoy Aquino is 2 minutes
            duration: 2,
            path: [
              { lat: 14.50845418511056, lng: 120.99118615050102 }, // from me
              // 14.50748586718183, 120.9909479021077
              { lat: 14.50748586718183, lng: 120.9909479021077 }, // sub
              // 14.506264381540221, 120.99050824333939
              { lat: 14.506264381540221, lng: 120.99050824333939 }, // sub
              // 14.504432144619072, 120.98974361647494
              { lat: 14.504432144619072, lng: 120.98974361647494 }, // sub
              // 14.503747370890336, 120.98960981564497
              { lat: 14.503747370890336, lng: 120.98960981564497 }, // sub
              // 14.503192154852842, 120.98972452793542
              { lat: 14.503192154852842, lng: 120.98972452793542 }, // sub
              // 14.502507398119038, 120.99022157283859
              { lat: 14.502507398119038, lng: 120.99022157283859 }, // sub
              // 14.502322334857938, 120.9905847899373
              { lat: 14.502322334857938, lng: 120.9905847899373 }, // sub
              // 14.50217428907272, 120.99108182059291
              { lat: 14.50217428907272, lng: 120.99108182059291 }, // sub
              // 14.502081782141923, 120.99247731906807
              { lat: 14.502081782141923, lng: 120.99247731906807 }, // sub
              // 14.501878182167351, 120.99328018387769
              { lat: 14.501878182167351, lng: 120.99328018387769 }, // sub
              // 14.50135998135482, 120.99389191706622
              { lat: 14.50135998135482, lng: 120.99389191706622 }, // sub
              // 14.50078625299356, 120.99415955193365
              { lat: 14.50078625299356, lng: 120.99415955193365 }, // sub
              // 14.500305059283061, 120.99423602100418
              { lat: 14.500305059283061, lng: 120.99423602100418 }, // sub
              { lat: 14.498914085756669, lng: 120.99427694903393 }, // to next
            ],
          },
        ],
      },
      {
        id: 24,
        code: 'LRT1_NINOY_AQUINO',
        name: 'Ninoy Aquino',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_NINOY_AQUINO.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/1/1a/Ninoyaquinoplatform.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Ninoyaquinoplatform.jpg">FLOCKTHEORY</a>, CC0, via Wikimedia Commons',
        description: 'Situated along Ninoy Aquino Avenue in Parañaque City.',
        // 14.498914085756669, 120.99427694903393
        coordinates: { lat: 14.498914085756669, lng: 120.99427694903393 }, // Ninoy Aquino
        edges: [
          {
            to: 'LRT1_ASIA_WORLD',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Ninoy Aquino to Asia World is 2 minutes
            duration: 2,
            path: [
              { lat: 14.498914085756669, lng: 120.99427694903393 }, // from me
              // reverse path of subpoints from Asia World to Ninoy Aquino
              { lat: 14.500305059283061, lng: 120.99423602100418 }, // sub
              { lat: 14.50078625299356, lng: 120.99415955193365 }, // sub
              { lat: 14.50135998135482, lng: 120.99389191706622 }, // sub
              { lat: 14.501878182167351, lng: 120.99328018387769 }, // sub
              { lat: 14.502081782141923, lng: 120.99247731906807 }, // sub
              { lat: 14.50217428907272, lng: 120.99108182059291 }, // sub
              { lat: 14.502322334857938, lng: 120.9905847899373 }, // sub
              { lat: 14.502507398119038, lng: 120.99022157283859 }, // sub
              { lat: 14.503192154852842, lng: 120.98972452793542 }, // sub
              { lat: 14.503747370890336, lng: 120.98960981564497 }, // sub
              { lat: 14.504432144619072, lng: 120.98974361647494 }, // sub
              { lat: 14.506264381540221, lng: 120.99050824333939 }, // sub
              { lat: 14.50748586718183, lng: 120.9909479021077 }, // sub
              { lat: 14.50845418511056, lng: 120.99118615050102 }, // to prev
            ],
          },
          {
            to: 'LRT1_DR_SANTOS',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Ninoy Aquino to Dr. Santos is 3 minutes
            duration: 3,
            path: [
              { lat: 14.498914085756669, lng: 120.99427694903393 }, // from me
              // 14.498010080275803, 120.99431246154813
              { lat: 14.498010080275803, lng: 120.99431246154813 }, // sub
              // 14.497547382934364, 120.9942168814553
              { lat: 14.497547382934364, lng: 120.9942168814553 }, // sub
              // 14.497288272062857, 120.99412130029349
              { lat: 14.497288272062857, lng: 120.99412130029349 }, // sub
              // 14.497047668244974, 120.99393013645916
              { lat: 14.497047668244974, lng: 120.99393013645916 }, // sub
              // 14.496862587992856, 120.99375808901141
              { lat: 14.496862587992856, lng: 120.99375808901141 }, // sub
              // 14.495789119361273, 120.99276402063889
              { lat: 14.495789119361273, lng: 120.99276402063889 }, // sub
              // 14.495474480706774, 120.99253462473146
              { lat: 14.495474480706774, lng: 120.99253462473146 }, // sub
              // 14.494974762248363, 120.99238169746249
              { lat: 14.494974762248363, lng: 120.99238169746249 }, // sub
              // 14.489355912133924, 120.99142871597628
              { lat: 14.489355912133924, lng: 120.99142871597628 }, // sub
              // 14.488766198643585, 120.99121007766792
              { lat: 14.488766198643585, lng: 120.99121007766792 }, // sub
              // 14.487843821656739, 120.99061662485421
              { lat: 14.487843821656739, lng: 120.99061662485421 }, // sub
              // 14.487480919087465, 120.99042922029062
              { lat: 14.487480919087465, lng: 120.99042922029062 }, // sub
              { lat: 14.485487817830236, lng: 120.98938956143442 }, // to next
            ],
          },
        ],
      },
      {
        id: 25,
        code: 'LRT1_DR_SANTOS',
        name: 'Dr. Santos',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt1/LRT1_DR_SANTOS.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/2/20/LRT-1_CEP_Dr._Santos_%281%29_2024-11-24.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:LRT-1_CEP_Dr._Santos_(1)_2024-11-24.jpg">LMP 2001</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Located in Parañaque City, near Dr. Santos Avenue.',
        // 14.485487817830236, 120.98938956143442
        coordinates: { lat: 14.485487817830236, lng: 120.98938956143442 }, // Dr. Santos
        edges: [
          {
            to: 'LRT1_NINOY_AQUINO',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Dr. Santos to Ninoy Aquino is 3 minutes
            duration: 3,
            path: [
              { lat: 14.485487817830236, lng: 120.98938956143442 }, // from me
              // reverse path of subpoints from Ninoy Aquino to Dr. Santos
              { lat: 14.487480919087465, lng: 120.99042922029062 }, // sub
              { lat: 14.487843821656739, lng: 120.99061662485421 }, // sub
              { lat: 14.488766198643585, lng: 120.99121007766792 }, // sub
              { lat: 14.489355912133924, lng: 120.99142871597628 }, // sub
              { lat: 14.494974762248363, lng: 120.99238169746249 }, // sub
              { lat: 14.495474480706774, lng: 120.99253462473146 }, // sub
              { lat: 14.495789119361273, lng: 120.99276402063889 }, // sub
              { lat: 14.496862587992856, lng: 120.99375808901141 }, // sub
              { lat: 14.497047668244974, lng: 120.99393013645916 }, // sub
              { lat: 14.497288272062857, lng: 120.99412130029349 }, // sub
              { lat: 14.497547382934364, lng: 120.9942168814553 }, // sub
              { lat: 14.498010080275803, lng: 120.99431246154813 }, // sub
              { lat: 14.498914085756669, lng: 120.99427694903393 }, // to prev
            ],
          },
          {
            to: 'LRT1_LAS_PINAS',
            weight: 3,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Dr. Santos to Las Piñas is 3 minutes
            duration: 3,
            path: [
              { lat: 14.485487817830236, lng: 120.98938956143442 }, // from me
              // 14.480954381268424, 120.98726346953964
              { lat: 14.480954381268424, lng: 120.98726346953964 }, // sub
              // 14.480684723769256, 120.9870622957218
              { lat: 14.480684723769256, lng: 120.9870622957218 }, // sub
              // 14.480403326473992, 120.98683046598171
              { lat: 14.480403326473992, lng: 120.98683046598171 }, // sub
              // 14.476017526443663, 120.9823635988423
              { lat: 14.476017526443663, lng: 120.9823635988423 }, // sub
              // 14.475391735549438, 120.98166079967893
              { lat: 14.475391735549438, lng: 120.98166079967893 }, // sub
              // 14.47484832123015, 120.98104289510748
              { lat: 14.47484832123015, lng: 120.98104289510748 }, // sub
              // 14.474600335593625, 120.98071212695733
              { lat: 14.474600335593625, lng: 120.98071212695733 }, // sub
              // 14.474259838351028, 120.980161971894
              { lat: 14.474259838351028, lng: 120.980161971894 }, // sub
              // 14.474024027517085, 120.97943108326142
              { lat: 14.474024027517085, lng: 120.97943108326142 }, // sub
              // 14.473854654767624, 120.97820237231697
              { lat: 14.473854654767624, lng: 120.97820237231697 }, // sub
              // 14.474121010374615, 120.97745807585295
              { lat: 14.474121010374615, lng: 120.97745807585295 }, // sub
              { lat: 14.474573544628553, lng: 120.97574500672548 }, // to next
            ],
          },
        ],
      },
      {
        id: 26,
        code: 'LRT1_LAS_PINAS',
        name: 'Las Piñas',
        isOperational: false,
        image: '',
        description: 'Planned station in Las Piñas City.',
        // 14.474573544628553, 120.97574500672548
        coordinates: { lat: 14.474573544628553, lng: 120.97574500672548 }, // Las Piñas
        edges: [
          {
            to: 'LRT1_DR_SANTOS',
            weight: 3,
            isOperational: false,
            hide: true,
            transferType: 'inter-station',
            // travel duration from Las Piñas to Dr. Santos is 3 minutes
            duration: 3,
            path: [
              { lat: 14.474573544628553, lng: 120.97574500672548 }, // from me
              // reverse path of subpoints from Dr. Santos to Las Piñas
              { lat: 14.474121010374615, lng: 120.97745807585295 }, // sub
              { lat: 14.473854654767624, lng: 120.97820237231697 }, // sub
              { lat: 14.474024027517085, lng: 120.97943108326142 }, // sub
              { lat: 14.474259838351028, lng: 120.980161971894 }, // sub
              { lat: 14.474600335593625, lng: 120.98071212695733 }, // sub
              { lat: 14.47484832123015, lng: 120.98104289510748 }, // sub
              { lat: 14.475391735549438, lng: 120.98166079967893 }, // sub
              { lat: 14.476017526443663, lng: 120.9823635988423 }, // sub
              { lat: 14.480403326473992, lng: 120.98683046598171 }, // sub
              { lat: 14.480684723769256, lng: 120.9870622957218 }, // sub
              { lat: 14.480954381268424, lng: 120.98726346953964 }, // to prev
              { lat: 14.485487817830236, lng: 120.98938956143442 }, // to prev
            ],
          },
          {
            to: 'LRT1_ZAPOTE',
            weight: 3,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Las Piñas to Zapote is 3 minutes
            duration: 3,
            path: [
              { lat: 14.474573544628553, lng: 120.97574500672548 }, // from me
              // 14.474510834474899, 120.97375128449015
              { lat: 14.474510834474899, lng: 120.97375128449015 }, // sub
              // 14.474453951757333, 120.97262881648057
              { lat: 14.474453951757333, lng: 120.97262881648057 }, // sub
              // 14.473742498599, 120.97129635476955
              { lat: 14.473742498599, lng: 120.97129635476955 }, // sub
              { lat: 14.471764874184087, lng: 120.96763115622156 }, // to next
            ],
          },
        ],
      },
      {
        id: 27,
        code: 'LRT1_ZAPOTE',
        name: 'Zapote',
        isOperational: false,
        imageLocal: 'assets/images/lines/lrt1/LRT1_ZAPOTE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/8/89/LRT-1_Zapote_Satellite_Depot_2024-07-07.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:LRT-1_Zapote_Satellite_Depot_2024-07-07.jpg">LMP 2001</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description:
          'Planned station near the Zapote area, serving both Las Piñas and Bacoor.',
        // 14.471764874184087, 120.96763115622156
        coordinates: { lat: 14.471764874184087, lng: 120.96763115622156 }, // Zapote
        edges: [
          {
            to: 'LRT1_LAS_PINAS',
            weight: 3,
            isOperational: false,
            hide: true,
            transferType: 'inter-station',
            // travel duration from Zapote to Las Piñas is 3 minutes
            duration: 3,
            path: [
              { lat: 14.471764874184087, lng: 120.96763115622156 }, // from me
              // reverse path of subpoints from Las Piñas to Zapote
              { lat: 14.473742498599, lng: 120.97129635476955 }, // sub
              { lat: 14.474453951757333, lng: 120.97262881648057 }, // sub
              { lat: 14.474510834474899, lng: 120.97375128449015 }, // sub
              { lat: 14.474573544628553, lng: 120.97574500672548 }, // to prev
            ],
          },
          {
            to: 'LRT1_NIOG',
            weight: 4,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Zapote to Niog is 4 minutes
            duration: 4,
            path: [
              { lat: 14.471764874184087, lng: 120.96763115622156 }, // from me
              // 14.470902476644333, 120.96427263231548
              { lat: 14.470902476644333, lng: 120.96427263231548 }, // sub
              // 14.469675718069062, 120.96171992949854
              { lat: 14.469675718069062, lng: 120.96171992949854 }, // sub
              // 14.467907952599354, 120.96019956682841
              { lat: 14.467907952599354, lng: 120.96019956682841 }, // sub
              // 14.465971540398217, 120.95956444087355
              { lat: 14.465971540398217, lng: 120.95956444087355 }, // sub
              // 14.463917165663707, 120.95951549417993
              { lat: 14.463917165663707, lng: 120.95951549417993 }, // sub
              // 14.462627958913986, 120.95954955180979
              { lat: 14.462627958913986, lng: 120.95954955180979 }, // sub
              // 14.459663287135054, 120.95974120974194
              { lat: 14.459663287135054, lng: 120.95974120974194 }, // sub
              { lat: 14.457625808747034, lng: 120.96005861893664 }, // to next
            ],
          },
        ],
      },
      {
        id: 28,
        code: 'LRT1_NIOG',
        name: 'Niog',
        isOperational: false,
        image: '',
        description:
          'Planned southern terminus of the LRT-1 extension, located in Bacoor, Cavite.',
        // 14.457625808747034, 120.96005861893664
        coordinates: { lat: 14.457625808747034, lng: 120.96005861893664 }, // Niog
        edges: [
          {
            to: 'LRT1_ZAPOTE',
            weight: 4,
            isOperational: false,
            hide: true,
            transferType: 'inter-station',
            // travel duration from Niog to Zapote is 4 minutes
            duration: 4,
            path: [
              { lat: 14.457625808747034, lng: 120.96005861893664 }, // from me
              // reverse path of subpoints from Zapote to Niog
              { lat: 14.459663287135054, lng: 120.95974120974194 }, // sub
              { lat: 14.462627958913986, lng: 120.95954955180979 }, // sub
              { lat: 14.463917165663707, lng: 120.95951549417993 }, // sub
              { lat: 14.465971540398217, lng: 120.95956444087355 }, // sub
              { lat: 14.467907952599354, lng: 120.96019956682841 }, // sub
              { lat: 14.469675718069062, lng: 120.96171992949854 }, // sub
              { lat: 14.470902476644333, lng: 120.96427263231548 }, // sub
              { lat: 14.471764874184087, lng: 120.96763115622156 }, // to prev
            ],
          },
        ],
      },
    ],
  },
  // LRT2
  {
    name: 'LRT 2',
    code: 'LRT2',
    color: 'blue',
    bgColor: 'blue',
    textColor: 'white',
    stationActiveIcon: 'assets/icons/station-active-lrt2.png',
    stationInactiveIcon: 'assets/icons/station-inactive-lrt2.png',
    stationActiveIcon_Min: 'assets/icons/station-active-min-lrt2.png',
    stationInactiveIcon_Min: 'assets/icons/station-inactive-min-lrt2.png',
    minFare: 10,
    maxFare: 30,
    stations: [
      {
        id: 1,
        code: 'LRT2_ANTIPOLO',
        name: 'Antipolo',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_ANTIPOLO.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/4/48/LRT_Antipolo%2C_Rizal%2C_Jul_2024.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:LRT_Antipolo,_Rizal,_Jul_2024.jpg">Ralff Nestor Nacor</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Eastern terminus of LRT-2, located in Antipolo, Rizal.',
        // 14.624824811486416, 121.121248307
        coordinates: { lat: 14.624824811486416, lng: 121.121248307 }, // Antipolo Station
        edges: [
          {
            from: 'LRT2_ANTIPOLO',
            to: 'LRT2_MARIKINA',
            weight: 4,
            transferType: 'inter-station',
            // travel duration from Antipolo to Marikina is 4 minutes
            duration: 4,
            isOperational: true,
            transferDescription: 'Direct train service to Marikina station.',
            transferDistance: 'Approximately 4 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.624824811486416, lng: 121.121248307 }, // from me
              { lat: 14.62052076177822, lng: 121.10074150354535 }, // to next
            ],
          },
        ],
      },
      {
        id: 2,
        code: 'LRT2_MARIKINA',
        name: 'Marikina-Pasig',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_MARIKINA.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/7/7b/Line_2_Marikina%E2%80%93Pasig_Station_Platform.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_2_Marikina%E2%80%93Pasig_Station_Platform.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description: 'Located in Marikina City, near major commercial areas.',
        // 14.62052076177822, 121.10074150354535
        coordinates: { lat: 14.62052076177822, lng: 121.10074150354535 }, // Marikina Station
        edges: [
          {
            from: 'LRT2_MARIKINA',
            to: 'LRT2_ANTIPOLO',
            weight: 4,
            transferType: 'inter-station',
            // travel duration from Marikina to Antipolo is 4 minutes
            duration: 4,
            isOperational: true,
            transferDescription: 'Direct train service to Antipolo station.',
            transferDistance: 'Approximately 4 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.62052076177822, lng: 121.10074150354535 }, // from me
              { lat: 14.624824811486416, lng: 121.121248307 }, // to prev
            ],
          },
          {
            from: 'LRT2_MARIKINA',
            to: 'LRT2_SANTOLAN',
            weight: 3,
            transferType: 'inter-station',
            // travel duration from Marikina to Santolan is 3 minutes
            duration: 3,
            isOperational: true,
            transferDescription: 'Direct train service to Santolan station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.62052076177822, lng: 121.10074150354535 }, // from me
              // 14.618778514942044, 121.09224980465667
              { lat: 14.618778514942044, lng: 121.09224980465667 }, // sub
              // 14.618680069958765, 121.09100306848418
              { lat: 14.618680069958765, lng: 121.09100306848418 }, // sub
              // 14.61887704096466, 121.09011255802545
              { lat: 14.61887704096466, lng: 121.09011255802545 }, // sub
              // 14.619369442523343, 121.089171163434
              { lat: 14.619369442523343, lng: 121.089171163434 }, // sub
              // 14.620853806177243, 121.0872322601569
              { lat: 14.620853806177243, lng: 121.0872322601569 }, // sub
              { lat: 14.622135967911797, lng: 121.08597686462393 }, // to next
            ],
          },
        ],
      },
      {
        id: 3,
        code: 'LRT2_SANTOLAN',
        name: 'Santolan',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_SANTOLAN.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/9/92/Line_2_Santolan_Station_Platform_6.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_2_Santolan_Station_Platform_6.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description:
          'Located along Marcos Highway, near the boundary of Marikina and Pasig.',
        // 14.622135967911797, 121.08597686462393
        coordinates: { lat: 14.622135967911797, lng: 121.08597686462393 }, // Santolan Station
        labelOffsety: -10,
        labelOffsetx: -3,
        edges: [
          {
            from: 'LRT2_SANTOLAN',
            to: 'LRT2_MARIKINA',
            weight: 3,
            transferType: 'inter-station',
            // travel duration from Santolan to Marikina is 3 minutes
            duration: 3,
            isOperational: true,
            transferDescription: 'Direct train service to Marikina station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.622135967911797, lng: 121.08597686462393 }, // from me
              // reverse path of subpoints from Marikina to Santolan
              { lat: 14.620853806177243, lng: 121.0872322601569 }, // sub
              { lat: 14.619369442523343, lng: 121.089171163434 }, // sub
              { lat: 14.61887704096466, lng: 121.09011255802545 }, // sub
              { lat: 14.618680069958765, lng: 121.09100306848418 }, // sub
              { lat: 14.618778514942044, lng: 121.09224980465667 }, // sub
              { lat: 14.62052076177822, lng: 121.10074150354535 }, // to prev
            ],
          },
          {
            from: 'LRT2_SANTOLAN',
            to: 'LRT2_KATIPUNAN',
            weight: 4,
            transferType: 'inter-station',
            // travel duration from Santolan to Katipunan is 4 minutes
            duration: 4,
            isOperational: true,
            transferDescription: 'Direct train service to Katipunan station.',
            transferDistance: 'Approximately 4 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.622135967911797, lng: 121.08597686462393 }, // from me
              // 14.624451986956808, 121.08339376144312
              { lat: 14.624451986956808, lng: 121.08339376144312 }, // sub
              // 14.625495497090059, 121.08241616272676
              { lat: 14.625495497090059, lng: 121.08241616272676 }, // sub
              // 14.6268902260199, 121.0812656258673
              { lat: 14.6268902260199, lng: 121.0812656258673 }, // sub
              // 14.62768367657417, 121.08074923729801
              { lat: 14.62768367657417, lng: 121.08074923729801 }, // sub
              // 14.63089199653947, 121.07856194764422
              { lat: 14.63089199653947, lng: 121.07856194764422 }, // sub
              // 14.631493497749391, 121.07809500259778
              { lat: 14.631493497749391, lng: 121.07809500259778 }, // sub
              // 14.631917242809738, 121.07768966600163
              { lat: 14.631917242809738, lng: 121.07768966600163 }, // sub
              // 14.632189044881278, 121.07732085425597
              { lat: 14.632189044881278, lng: 121.07732085425597 }, // sub
              // 14.63239891165704, 121.07698234354542
              { lat: 14.63239891165704, lng: 121.07698234354542 }, // sub
              // 14.63250167892734, 121.07663783063006
              { lat: 14.63250167892734, lng: 121.07663783063006 }, // sub
              // 14.632507058210669, 121.07631284825653
              { lat: 14.632507058210669, lng: 121.07631284825653 }, // sub
              // 14.632484585598009, 121.07600908728844
              { lat: 14.632484585598009, lng: 121.07600908728844 }, // sub
              // 14.632437292277135, 121.07574133305353
              { lat: 14.632437292277135, lng: 121.07574133305353 }, // sub
              // 14.632236319450111, 121.0752947637096
              { lat: 14.632236319450111, lng: 121.0752947637096 }, // sub
              // 14.632094005385978, 121.0749515469495
              { lat: 14.632094005385978, lng: 121.0749515469495 }, // sub

              { lat: 14.630800864143024, lng: 121.07271230628201 }, // to next
            ],
          },
        ],
      },
      {
        id: 4,
        code: 'LRT2_KATIPUNAN',
        name: 'Katipunan',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_KATIPUNAN.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/e/ed/Line_2_Katipunan_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_2_Katipunan_Station_Platform_1.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description:
          'Underground station located along Katipunan Avenue, Quezon City.',
        // 14.630800864143024, 121.07271230628201
        coordinates: { lat: 14.630800864143024, lng: 121.07271230628201 }, // Katipunan Station
        edges: [
          {
            from: 'LRT2_KATIPUNAN',
            to: 'LRT2_SANTOLAN',
            weight: 4,
            transferType: 'inter-station',
            // travel duration from Katipunan to Santolan is 4 minutes
            duration: 4,
            isOperational: true,
            transferDescription: 'Direct train service to Santolan station.',
            transferDistance: 'Approximately 4 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.630800864143024, lng: 121.07271230628201 }, // from me
              // reverse path of subpoints from Santolan to Katipunan
              { lat: 14.632094005385978, lng: 121.0749515469495 }, // sub
              { lat: 14.632236319450111, lng: 121.0752947637096 }, // sub
              { lat: 14.632437292277135, lng: 121.07574133305353 }, // sub
              { lat: 14.632484585598009, lng: 121.07600908728844 }, // sub
              { lat: 14.632507058210669, lng: 121.07631284825653 }, // sub
              { lat: 14.63250167892734, lng: 121.07663783063006 }, // sub
              { lat: 14.63239891165704, lng: 121.07698234354542 }, // sub
              { lat: 14.632189044881278, lng: 121.07732085425597 }, // sub
              { lat: 14.631917242809738, lng: 121.07768966600163 }, // sub
              { lat: 14.631493497749391, lng: 121.07809500259778 }, // sub
              { lat: 14.63089199653947, lng: 121.07856194764422 }, // sub
              { lat: 14.62768367657417, lng: 121.08074923729801 }, // sub
              { lat: 14.6268902260199, lng: 121.0812656258673 }, // sub
              { lat: 14.625495497090059, lng: 121.08241616272676 }, // sub
              { lat: 14.624451986956808, lng: 121.08339376144312 }, // sub
              { lat: 14.622135967911797, lng: 121.08597686462393 }, // to prev
            ],
          },
          {
            from: 'LRT2_KATIPUNAN',
            to: 'LRT2_ANONAS',
            weight: 2,
            transferType: 'inter-station',
            // travel duration from Katipunan to Anonas is 2 minutes
            duration: 2,
            isOperational: true,
            transferDescription: 'Direct train service to Anonas station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.630800864143024, lng: 121.07271230628201 }, // from me
              // 14.628552133194912, 121.06761073896573
              { lat: 14.628552133194912, lng: 121.06761073896573 }, // sub
              // 14.628408137384573, 121.06722826061545
              { lat: 14.628408137384573, lng: 121.06722826061545 }, // sub
              // 14.628332466132196, 121.06678100673591
              { lat: 14.628332466132196, lng: 121.06678100673591 }, // sub
              { lat: 14.628043289011293, lng: 121.06482289673204 }, // to next
            ],
          },
        ],
      },
      {
        id: 5,
        code: 'LRT2_ANONAS',
        name: 'Anonas',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_ANONAS.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/1/17/Line_2_Anonas_Station_Platform_14.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_2_Anonas_Station_Platform_14.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description: 'Located in Project 3, Quezon City, near Anonas Street.',
        // 14.628043289011293, 121.06482289673204
        coordinates: { lat: 14.628043289011293, lng: 121.06482289673204 }, // Anonas Station
        labelOffsety: 3,
        edges: [
          {
            from: 'LRT2_ANONAS',
            to: 'LRT2_KATIPUNAN',
            weight: 2,
            transferType: 'inter-station',
            // travel duration from Anonas to Katipunan is 2 minutes
            duration: 2,
            isOperational: true,
            transferDescription: 'Direct train service to Katipunan station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.628043289011293, lng: 121.06482289673204 }, // from me
              // reverse path of subpoints from Katipunan to Anonas
              { lat: 14.628332466132196, lng: 121.06678100673591 }, // sub
              { lat: 14.628408137384573, lng: 121.06722826061545 }, // sub
              { lat: 14.628552133194912, lng: 121.06761073896573 }, // sub
              { lat: 14.630800864143024, lng: 121.07271230628201 }, // to prev
            ],
          },
          {
            from: 'LRT2_ANONAS',
            to: 'LRT2_CUBAO',
            weight: 3,
            transferType: 'inter-station',
            // travel duration from Anonas to Cubao is 3 minutes
            duration: 3,
            isOperational: true,
            transferDescription: 'Direct train service to Cubao station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.628043289011293, lng: 121.06482289673204 }, // from me
              // 14.627738288387024, 121.06326533297523
              { lat: 14.627738288387024, lng: 121.06326533297523 }, // sub
              // 14.627579460521778, 121.06273903809328
              { lat: 14.627579460521778, lng: 121.06273903809328 }, // sub
              // 14.627463575358627, 121.06244336234738
              { lat: 14.627463575358627, lng: 121.06244336234738 }, // sub
              // 14.627325988671764, 121.0621589939577
              { lat: 14.627325988671764, lng: 121.0621589939577 }, // sub
              { lat: 14.622724831527815, lng: 121.05266770816854 }, // to next
            ],
          },
        ],
      },
      {
        id: 6,
        code: 'LRT2_CUBAO',
        name: 'Cubao',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_CUBAO.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/1/1e/Line_2_Araneta_Center-Cubao_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_2_Araneta_Center-Cubao_Station_Platform_1.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description:
          'Located in Quezon City, a major commercial hub with connections to MRT-3.',
        // 14.622724831527815, 121.05266770816854
        coordinates: { lat: 14.622724831527815, lng: 121.05266770816854 }, // Cubao Station
        edges: [
          {
            from: 'LRT2_CUBAO',
            to: 'LRT2_ANONAS',
            weight: 3, // Approximate travel time in minutes
            transferType: 'inter-station',
            // travel duration from Cubao to Anonas is 3 minutes
            duration: 3,
            isOperational: true,
            transferDescription:
              'Direct train service from Cubao to Anonas station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.622724831527815, lng: 121.05266770816854 }, // from me
              // reverse path of subpoints from Anonas to Cubao
              { lat: 14.627325988671764, lng: 121.0621589939577 }, // sub
              { lat: 14.627463575358627, lng: 121.06244336234738 }, // sub
              { lat: 14.627579460521778, lng: 121.06273903809328 }, // sub
              { lat: 14.627738288387024, lng: 121.06326533297523 }, // sub
              { lat: 14.628043289011293, lng: 121.06482289673204 }, // to prev
            ],
          },
          {
            from: 'LRT2_CUBAO',
            to: 'LRT2_BETTY_GO_BELMONTE',
            weight: 2,
            transferType: 'inter-station',
            // travel duration from Cubao to Betty Go-Belmonte is 2 minutes
            duration: 2,
            isOperational: true,
            transferDescription:
              'Direct train service to Betty Go-Belmonte station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.622724831527815, lng: 121.05266770816854 }, // from me
              // 14.621128305073354, 121.04919227092223
              { lat: 14.621128305073354, lng: 121.04919227092223 }, // sub
              // 14.620837827239509, 121.0484211366729
              { lat: 14.620837827239509, lng: 121.0484211366729 }, // sub
              // 14.61953579482616, 121.04456398330416
              { lat: 14.61953579482616, lng: 121.04456398330416 }, // sub
              // 14.619314423140057, 121.04403713242665
              { lat: 14.619314423140057, lng: 121.04403713242665 }, // sub
              { lat: 14.618744832179202, lng: 121.04278254495594 }, // to next
            ],
          },
          {
            from: 'LRT2_CUBAO',
            to: 'MRT3_CUBAO',
            weight: 5,
            transferType: 'inter-line',
            // travel duration from LRT-2 Cubao to MRT-3 Cubao by walk is 7 minutes
            duration: 7,
            transitMode: 'walk',
            isOperational: true,
            transferDescription:
              'Connected via walkway to MRT-3 Cubao station.',
            transferDistance: 'Approximately 5-minute walk',
            accessibility: 'Elevators and ramps available',
            additionalCost: 'Separate fare required',
            direction: 'northbound',
            path: [
              { lat: 14.622724831527815, lng: 121.05266770816854 }, // from me
              { lat: 14.619436167701586, lng: 121.05109226468761 }, // to next line
            ],
          },
        ],
      },
      {
        id: 7,
        code: 'LRT2_BETTY_GO_BELMONTE',
        name: 'Betty Go-Belmonte',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_BETTY_GO_BELMONTE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/b/b9/Line_2_Betty_Go-Belmonte_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_2_Betty_Go-Belmonte_Station_Platform_1.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description: 'Situated in Quezon City, near New Manila.',
        // 14.618744832179202, 121.04278254495594
        coordinates: { lat: 14.618744832179202, lng: 121.04278254495594 }, // Betty Go-Belmonte Station
        labelOffsetx: -105,
        labelOffsety: -10,
        edges: [
          {
            from: 'LRT2_BETTY_GO_BELMONTE',
            to: 'LRT2_CUBAO',
            weight: 2,
            transferType: 'inter-station',
            // travel duration from Betty Go-Belmonte to Cubao is 2 minutes
            duration: 2,
            isOperational: true,
            transferDescription: 'Direct train service to Cubao station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.618744832179202, lng: 121.04278254495594 }, // from me
              // reverse path of subpoints from Cubao to Betty Go-Belmonte
              { lat: 14.619314423140057, lng: 121.04403713242665 }, // sub
              { lat: 14.61953579482616, lng: 121.04456398330416 }, // sub
              { lat: 14.620837827239509, lng: 121.0484211366729 }, // sub
              { lat: 14.621128305073354, lng: 121.04919227092223 }, // sub
              { lat: 14.622724831527815, lng: 121.05266770816854 }, // to prev
            ],
          },
          {
            from: 'LRT2_BETTY_GO_BELMONTE',
            to: 'LRT2_GILMORE',
            weight: 2,
            transferType: 'inter-station',
            // travel duration from Betty Go-Belmonte to Gilmore is 2 minutes
            duration: 2,
            isOperational: true,
            transferDescription: 'Direct train service to Gilmore station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.618744832179202, lng: 121.04278254495594 }, // from me
              { lat: 14.613660961641079, lng: 121.0345201516396 }, // to next
            ],
          },
        ],
      },
      {
        id: 8,
        code: 'LRT2_GILMORE',
        name: 'Gilmore',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_GILMORE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/6/63/MRT2_megatren_TS9_leaving_Gilmore_station_%281%29.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:MRT2_megatren_TS9_leaving_Gilmore_station_(1).jpg">Higad Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description:
          'Located in Quezon City, known for electronics shops along Gilmore Avenue.',
        // 14.613660961641079, 121.0345201516396
        coordinates: { lat: 14.613660961641079, lng: 121.0345201516396 }, // Gilmore Station
        edges: [
          {
            from: 'LRT2_GILMORE',
            to: 'LRT2_BETTY_GO_BELMONTE',
            weight: 2,
            transferType: 'inter-station',
            // travel duration from Gilmore to Betty Go-Belmonte is 2 minutes
            duration: 2,
            isOperational: true,
            transferDescription:
              'Direct train service to Betty Go-Belmonte station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.613660961641079, lng: 121.0345201516396 }, // from me
              { lat: 14.618744832179202, lng: 121.04278254495594 }, // to prev
            ],
          },
          {
            from: 'LRT2_GILMORE',
            to: 'LRT2_J_RUIZ',
            weight: 2,
            transferType: 'inter-station',
            // travel duration from Gilmore to J. Ruiz is 2 minutes
            duration: 2,
            isOperational: true,
            transferDescription: 'Direct train service to J. Ruiz station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.613660961641079, lng: 121.0345201516396 }, // from me
              // 14.612926488991164, 121.03313836930339
              { lat: 14.612926488991164, lng: 121.03313836930339 }, // sub
              // 14.612653499226333, 121.03232473392238
              { lat: 14.612653499226333, lng: 121.03232473392238 }, // sub
              { lat: 14.610667645518005, lng: 121.02633594643939 }, // to next
            ],
          },
        ],
      },
      {
        id: 9,
        code: 'LRT2_J_RUIZ',
        name: 'J. Ruiz',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_J_RUIZ.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/a/aa/Line_2_J._Ruiz_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_2_J._Ruiz_Station_Platform_1.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description:
          'Located in San Juan City, near J. Ruiz Street and residential areas.',
        // 14.610667645518005, 121.02633594643939
        coordinates: { lat: 14.610667645518005, lng: 121.02633594643939 }, // J. Ruiz Station
        labelOffsety: 3,
        edges: [
          {
            from: 'LRT2_J_RUIZ',
            to: 'LRT2_GILMORE',
            weight: 2,
            transferType: 'inter-station',
            // travel duration from J. Ruiz to Gilmore is 2 minutes
            duration: 2,
            isOperational: true,
            transferDescription: 'Direct train service to Gilmore station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.610667645518005, lng: 121.02633594643939 }, // from me
              // reverse path of subpoints from Gilmore to J. Ruiz
              { lat: 14.612653499226333, lng: 121.03232473392238 }, // sub
              { lat: 14.612926488991164, lng: 121.03313836930339 }, // sub
              { lat: 14.613660961641079, lng: 121.0345201516396 }, // to prev
            ],
          },
          {
            from: 'LRT2_J_RUIZ',
            to: 'LRT2_V_MAPA',
            weight: 2,
            transferType: 'inter-station',
            // travel duration from J. Ruiz to V. Mapa is 2 minutes
            duration: 2,
            isOperational: true,
            transferDescription: 'Direct train service to V. Mapa station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.610667645518005, lng: 121.02633594643939 }, // from me
              // 14.60950724142202, 121.02287446436551
              { lat: 14.60950724142202, lng: 121.02287446436551 }, // sub
              // 14.609277894427667, 121.02244783619179
              { lat: 14.609277894427667, lng: 121.02244783619179 }, // sub
              // 14.60888018697632, 121.02203726606078
              { lat: 14.60888018697632, lng: 121.02203726606078 }, // sub
              // 14.607244822280265, 121.02032087678336
              { lat: 14.607244822280265, lng: 121.02032087678336 }, // sub
              { lat: 14.604210926251874, lng: 121.01734453043514 }, // to next
            ],
          },
        ],
      },
      {
        id: 10,
        code: 'LRT2_V_MAPA',
        name: 'V. Mapa',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_V_MAPA.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/3/32/V._Mapa_Station_fvf_02.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:V._Mapa_Station_fvf_02.jpg">Judgefloro</a>, Public domain, via Wikimedia Commons',
        description: 'Located in Santa Mesa, Manila, near V. Mapa High School.',
        // 14.604210926251874, 121.01734453043514
        coordinates: { lat: 14.604210926251874, lng: 121.01734453043514 }, // V. Mapa Station
        edges: [
          {
            from: 'LRT2_V_MAPA',
            to: 'LRT2_J_RUIZ',
            weight: 2,
            transferType: 'inter-station',
            // travel duration from V. Mapa to J. Ruiz is 2 minutes
            duration: 2,
            isOperational: true,
            transferDescription: 'Direct train service to J. Ruiz station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.604210926251874, lng: 121.01734453043514 }, // from me
              // reverse path of subpoints from J. Ruiz to V. Mapa
              { lat: 14.607244822280265, lng: 121.02032087678336 }, // sub
              { lat: 14.60888018697632, lng: 121.02203726606078 }, // sub
              { lat: 14.609277894427667, lng: 121.02244783619179 }, // sub
              { lat: 14.60950724142202, lng: 121.02287446436551 }, // sub
              { lat: 14.610667645518005, lng: 121.02633594643939 }, // to prev
            ],
          },
          {
            from: 'LRT2_V_MAPA',
            to: 'LRT2_PUREZA',
            weight: 2,
            transferType: 'inter-station',
            // travel duration from V. Mapa to Pureza is 2 minutes
            duration: 2,
            isOperational: true,
            transferDescription: 'Direct train service to Pureza station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.604210926251874, lng: 121.01734453043514 }, // from me
              // 14.603084634313145, 121.01606297544005
              { lat: 14.603084634313145, lng: 121.01606297544005 }, // sub
              // 14.602942400172978, 121.01589417423318
              { lat: 14.602942400172978, lng: 121.01589417423318 }, // sub
              // 14.602728355320695, 121.01545445797345
              { lat: 14.602728355320695, lng: 121.01545445797345 }, // sub
              // 14.60260590077857, 121.01506617878995
              { lat: 14.60260590077857, lng: 121.01506617878995 }, // sub
              // 14.602532667565958, 121.01463118650933
              { lat: 14.602532667565958, lng: 121.01463118650933 }, // sub
              // 14.602122558456815, 121.00950085851167
              { lat: 14.602122558456815, lng: 121.00950085851167 }, // sub
              { lat: 14.601759353452428, lng: 121.0052661412116 }, // to next
            ],
          },
        ],
      },
      {
        id: 11,
        code: 'LRT2_PUREZA',
        name: 'Pureza',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_PUREZA.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/9/9d/Line_2_Pureza_Station_Platform_4.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_2_Pureza_Station_Platform_4.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description:
          'Situated in Santa Mesa, Manila, near educational institutions.',
        // 14.601759353452428, 121.0052661412116
        coordinates: { lat: 14.601759353452428, lng: 121.0052661412116 }, // Pureza Station
        edges: [
          {
            from: 'LRT2_PUREZA',
            to: 'LRT2_V_MAPA',
            weight: 2,
            transferType: 'inter-station',
            // travel duration from Pureza to V. Mapa is 2 minutes
            duration: 2,
            isOperational: true,
            transferDescription: 'Direct train service to V. Mapa station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.601759353452428, lng: 121.0052661412116 }, // from me
              // reverse path of subpoints from V. Mapa to Pureza
              { lat: 14.602122558456815, lng: 121.00950085851167 }, // sub
              { lat: 14.602532667565958, lng: 121.01463118650933 }, // sub
              { lat: 14.60260590077857, lng: 121.01506617878995 }, // sub
              { lat: 14.602728355320695, lng: 121.01545445797345 }, // sub
              { lat: 14.602942400172978, lng: 121.01589417423318 }, // sub
              { lat: 14.603084634313145, lng: 121.01606297544005 }, // sub
              { lat: 14.604210926251874, lng: 121.01734453043514 }, // to prev
            ],
          },
          {
            from: 'LRT2_PUREZA',
            to: 'LRT2_LEGARDA',
            weight: 3,
            transferType: 'inter-station',
            // travel duration from Pureza to Legarda is 3 minutes
            duration: 3,
            isOperational: true,
            transferDescription: 'Direct train service to Legarda station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.601759353452428, lng: 121.0052661412116 }, // from me
              // 14.601518085563788, 121.00314802543924
              { lat: 14.601518085563788, lng: 121.00314802543924 }, // sub
              // 14.60140920908956, 121.00259308272076
              { lat: 14.60140920908956, lng: 121.00259308272076 }, // sub
              // 14.601097773118575, 121.00045924429429
              { lat: 14.601097773118575, lng: 121.00045924429429 }, // sub
              // 14.601018436056398, 121.00014680912514
              { lat: 14.601018436056398, lng: 121.00014680912514 }, // sub
              // 14.600931712084568, 120.99989378503511
              { lat: 14.600931712084568, lng: 120.99989378503511 }, // sub
              // 14.600750570717993, 120.9994767248352
              { lat: 14.600750570717993, lng: 120.9994767248352 }, // sub
              // 14.600670658391516, 120.99919986873404
              { lat: 14.600670658391516, lng: 120.99919986873404 }, // sub
              // 14.600634305834346, 120.99880925671071
              { lat: 14.600634305834346, lng: 120.99880925671071 }, // sub
              // 14.600706980622583, 120.99839566202706
              { lat: 14.600706980622583, lng: 120.99839566202706 }, // sub
              // 14.600852061617026, 120.99788552549076
              { lat: 14.600852061617026, lng: 120.99788552549076 }, // sub
              // 14.600873811928848, 120.99751813008182
              { lat: 14.600873811928848, lng: 120.99751813008182 }, // sub
              // 14.600831366528205, 120.99722909220145
              { lat: 14.600831366528205, lng: 120.99722909220145 }, // sub
              // 14.600635203216171, 120.99660477466503
              { lat: 14.600635203216171, lng: 120.99660477466503 }, // sub
              // 14.600570253262646, 120.99631284338804
              { lat: 14.600570253262646, lng: 120.99631284338804 }, // sub
              // 14.60058329904461, 120.99597662810613
              { lat: 14.60058329904461, lng: 120.99597662810613 }, // sub
              // 14.60064491559829, 120.9956418234593
              { lat: 14.60064491559829, lng: 120.9956418234593 }, // sub
              // 14.60108611005311, 120.9944848070255
              { lat: 14.60108611005311, lng: 120.9944848070255 }, // sub
              // 14.601163598198557, 120.99415194683047
              { lat: 14.601163598198557, lng: 120.99415194683047 }, // sub
              // 14.601196163363083, 120.99384212607895
              { lat: 14.601196163363083, lng: 120.99384212607895 }, // sub
              // 14.601199601569594, 120.99355930731925
              { lat: 14.601199601569594, lng: 120.99355930731925 }, // sub
              // 14.601106279986316, 120.99334639038388
              { lat: 14.601106279986316, lng: 120.99334639038388 }, // sub
              { lat: 14.600864578161373, lng: 120.99250867046764 }, // to next
            ],
          },
        ],
      },
      {
        id: 12,
        code: 'LRT2_LEGARDA',
        name: 'Legarda',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_LEGARDA.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/c/cc/Line_2_Legarda_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_2_Legarda_Station_Platform_1.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description: 'Located in Sampaloc, Manila, near Legarda Street.',
        // 14.600864578161373, 120.99250867046764
        coordinates: { lat: 14.600864578161373, lng: 120.99250867046764 }, // Legarda Station
        labelOffsety: 3,
        edges: [
          {
            from: 'LRT2_LEGARDA',
            to: 'LRT2_PUREZA',
            weight: 3,
            transferType: 'inter-station',
            // travel duration from Legarda to Pureza is 3 minutes
            duration: 3,
            isOperational: true,
            transferDescription: 'Direct train service to Pureza station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.600864578161373, lng: 120.99250867046764 }, // from me
              // reverse path of subpoints from Pureza to Legarda
              { lat: 14.601106279986316, lng: 120.99334639038388 }, // sub
              { lat: 14.601199601569594, lng: 120.99355930731925 }, // sub
              { lat: 14.601196163363083, lng: 120.99384212607895 }, // sub
              { lat: 14.601163598198557, lng: 120.99415194683047 }, // sub
              { lat: 14.60108611005311, lng: 120.9944848070255 }, // sub
              { lat: 14.60064491559829, lng: 120.9956418234593 }, // sub
              { lat: 14.60058329904461, lng: 120.99597662810613 }, // sub
              { lat: 14.600570253262646, lng: 120.99631284338804 }, // sub
              { lat: 14.600635203216171, lng: 120.99660477466503 }, // sub
              { lat: 14.600831366528205, lng: 120.99722909220145 }, // sub
              { lat: 14.600873811928848, lng: 120.99751813008182 }, // sub
              { lat: 14.600852061617026, lng: 120.99788552549076 }, // sub
              { lat: 14.600706980622583, lng: 120.99839566202706 }, // sub
              { lat: 14.600634305834346, lng: 120.99880925671071 }, // sub
              { lat: 14.600670658391516, lng: 120.99919986873404 }, // sub
              { lat: 14.600750570717993, lng: 120.9994767248352 }, // sub
              { lat: 14.600931712084568, lng: 120.99989378503511 }, // sub
              { lat: 14.601018436056398, lng: 121.00014680912514 }, // sub
              { lat: 14.601097773118575, lng: 121.00045924429429 }, // sub
              { lat: 14.60140920908956, lng: 121.00259308272076 }, // sub
              { lat: 14.601518085563788, lng: 121.00314802543924 }, // sub
              { lat: 14.601759353452428, lng: 121.0052661412116 }, // to prev
            ],
          },
          {
            from: 'LRT2_LEGARDA',
            to: 'LRT2_RECTO',
            weight: 3,
            transferType: 'inter-station',
            // travel duration from Legarda to Recto is 3 minutes
            duration: 3,
            isOperational: true,
            transferDescription: 'Direct train service to Recto station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.600864578161373, lng: 120.99250867046764 }, // from me
              // 14.600543074897402, 120.99144774682793
              { lat: 14.600543074897402, lng: 120.99144774682793 }, // sub
              // 14.600469465318183, 120.9910847923569
              { lat: 14.600469465318183, lng: 120.9910847923569 }, // sub
              // 14.600479117099876, 120.99082057641041
              { lat: 14.600479117099876, lng: 120.99082057641041 }, // sub
              // 14.600539889923011, 120.99059897895405
              { lat: 14.600539889923011, lng: 120.99059897895405 }, // sub
              // 14.600578259462962, 120.99047670865292
              { lat: 14.600578259462962, lng: 120.99047670865292 }, // sub
              // 14.600667554903639, 120.99028164324838
              { lat: 14.600667554903639, lng: 120.99028164324838 }, // sub
              // 14.603190280606059, 120.9849042708011
              { lat: 14.603190280606059, lng: 120.9849042708011 }, // sub
              // 14.603277349282624, 120.98466248276966
              { lat: 14.603277349282624, lng: 120.98466248276966 }, // sub
              // 14.603348704620895, 120.98440381136801
              { lat: 14.603348704620895, lng: 120.98440381136801 }, // sub
              { lat: 14.60348141245216, lng: 120.9834813414183 }, // to next
            ],
          },
        ],
      },
      {
        id: 13,
        code: 'LRT2_RECTO',
        name: 'Recto',
        isOperational: true,
        imageLocal: 'assets/images/lines/lrt2/LRT2_RECTO.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/1/1e/Line_2_Recto_Station_Platform_3.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_2_Recto_Station_Platform_3.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description:
          'Western terminus of LRT-2, located in Manila, near University Belt.',
        // 14.60348141245216, 120.9834813414183
        coordinates: { lat: 14.60348141245216, lng: 120.9834813414183 }, // Recto Station
        labelOffsety: -5,
        edges: [
          {
            from: 'LRT2_RECTO',
            to: 'LRT2_LEGARDA',
            weight: 3,
            transferType: 'inter-station',
            // travel duration from Recto to Legarda is 3 minutes
            duration: 3,
            isOperational: true,
            transferDescription: 'Direct train service to Legarda station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.60348141245216, lng: 120.9834813414183 }, // from me
              // reverse path of subpoints from Legarda to Recto
              { lat: 14.603348704620895, lng: 120.98440381136801 }, // sub
              { lat: 14.603277349282624, lng: 120.98466248276966 }, // sub
              { lat: 14.603190280606059, lng: 120.9849042708011 }, // sub
              { lat: 14.600667554903639, lng: 120.99028164324838 }, // sub
              { lat: 14.600578259462962, lng: 120.99047670865292 }, // sub
              { lat: 14.600539889923011, lng: 120.99059897895405 }, // sub
              { lat: 14.600479117099876, lng: 120.99082057641041 }, // sub
              { lat: 14.600469465318183, lng: 120.9910847923569 }, // sub
              { lat: 14.600543074897402, lng: 120.99144774682793 }, // sub
              { lat: 14.600864578161373, lng: 120.99250867046764 }, // to prev
            ],
          },
          {
            from: 'LRT2_RECTO',
            to: 'LRT2_TUTUBAN',
            weight: 5,
            transferType: 'inter-station',
            // travel duration from Recto to Tutuban is 5 minutes
            duration: 5,
            isOperational: false,
            transferDescription: 'Direct train service to Tutuban station.',
            transferDistance: 'Approximately 5 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.60348141245216, lng: 120.9834813414183 }, // from me
              // 14.603890570431997, 120.98107139383661
              { lat: 14.603890570431997, lng: 120.98107139383661 }, // sub
              // 14.603933150402312, 120.98053186000529
              { lat: 14.603933150402312, lng: 120.98053186000529 }, // sub
              // 14.60402683153913, 120.98013148621983
              { lat: 14.60402683153913, lng: 120.98013148621983 }, // sub
              // 14.604107605558296, 120.97988787238859
              { lat: 14.604107605558296, lng: 120.97988787238859 }, // sub
              // 14.606391139959321, 120.97399759396457
              { lat: 14.606391139959321, lng: 120.97399759396457 }, // sub
              // 14.606505446428478, 120.97364578206542
              { lat: 14.606505446428478, lng: 120.97364578206542 }, // sub
              // 14.606548659759664, 120.97350994867713
              { lat: 14.606548659759664, lng: 120.97350994867713 }, // sub
              // 14.606550738590935, 120.97338957547893
              { lat: 14.606550738590935, lng: 120.97338957547893 }, // sub
              // 14.606524934310332, 120.97321799887273
              { lat: 14.606524934310332, lng: 120.97321799887273 }, // sub
              // 14.606455133456212, 120.97266533517417
              { lat: 14.606455133456212, lng: 120.97266533517417 }, // sub
              { lat: 14.606363198972117, lng: 120.97193630977111 }, // to next
            ],
          },
          {
            from: 'LRT2_RECTO',
            to: 'LRT1_DOROTEO_JOSE',
            weight: 5,
            transferType: 'inter-line',
            // travel duration from Recto to Doroteo Jose by foot is 5 minutes
            duration: 5,
            transitMode: 'walk',
            isOperational: true,
            transferDescription:
              'Connected via elevated walkway to LRT-1 Doroteo Jose station.',
            transferDistance: 'Approximately 5-minute walk',
            accessibility: 'Elevators and ramps available',
            additionalCost: 'Separate fare required',
            direction: 'northbound',
            path: [
              { lat: 14.60348141245216, lng: 120.9834813414183 }, // from me
              // reverse path of subpoints from Doroteo Jose to Recto
              { lat: 14.603764263986196, lng: 120.98337020088941 }, // sub
              { lat: 14.603899607486674, lng: 120.98251841770447 }, // sub
              { lat: 14.60506192232233, lng: 120.98277693634905 }, // sub
              { lat: 14.605202192121055, lng: 120.98260949708005 }, // sub
              { lat: 14.605224784266968, lng: 120.98226550443184 }, // sub
              { lat: 14.605461953754634, lng: 120.98194541980351 }, // to next line
            ],
          },
        ],
      },

      // Proposed stations
      // tutuban
      {
        id: 14,
        code: 'LRT2_TUTUBAN',
        name: 'Tutuban',
        isOperational: false,
        image: '',
        description: 'Planned station in Tutuban, Manila.',
        // 14.606363198972117, 120.97193630977111
        coordinates: { lat: 14.606363198972117, lng: 120.97193630977111 }, // Tutuban Station
        labelOffsetx: -60,
        labelOffsety: -15,
        edges: [
          {
            from: 'LRT2_TUTUBAN',
            to: 'LRT2_RECTO',
            weight: 3,
            transferType: 'inter-station',
            // travel duration from Tutuban to Recto is 3 minutes
            duration: 3,
            isOperational: false,
            hide: true,
            transferDescription: 'Direct train service to Recto station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.606363198972117, lng: 120.97193630977111 }, // from me
              // reverse path of subpoints from Recto to Tutuban
              { lat: 14.606524934310332, lng: 120.97321799887273 }, // sub
              { lat: 14.606550738590935, lng: 120.97338957547893 }, // sub
              { lat: 14.606548659759664, lng: 120.97350994867713 }, // sub
              { lat: 14.606505446428478, lng: 120.97364578206542 }, // sub
              { lat: 14.606391139959321, lng: 120.97399759396457 }, // sub
              { lat: 14.604107605558296, lng: 120.97988787238859 }, // sub
              { lat: 14.60402683153913, lng: 120.98013148621983 }, // sub
              { lat: 14.603933150402312, lng: 120.98053186000529 }, // sub
              { lat: 14.603890570431997, lng: 120.98107139383661 }, // sub
              { lat: 14.60348141245216, lng: 120.9834813414183 }, // to prev
            ],
          },
          {
            from: 'LRT2_TUTUBAN',
            to: 'LRT2_DIVISORIA',
            weight: 3,
            transferType: 'inter-station',
            // travel duration from Tutuban to Divisoria is 3 minutes
            duration: 3,
            isOperational: false,
            transferDescription: 'Direct train service to Divisoria station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.606363198972117, lng: 120.97193630977111 }, // from me
              // 14.606044837299484, 120.97102630420436
              { lat: 14.606044837299484, lng: 120.97102630420436 }, // sub
              // 14.605885125189356, 120.97063479284101
              { lat: 14.605885125189356, lng: 120.97063479284101 }, // sub
              // 14.60574340982949, 120.9702989589526
              { lat: 14.60574340982949, lng: 120.9702989589526 }, // sub
              // 14.605472462627132, 120.9699217980134
              { lat: 14.605472462627132, lng: 120.9699217980134 }, // sub
              // 14.605105146624622, 120.96951885612073
              { lat: 14.605105146624622, lng: 120.96951885612073 }, // sub
              { lat: 14.602790069620127, lng: 120.96755569678145 }, // to next
            ],
          },
        ],
      },
      // divisoria
      {
        id: 15,
        code: 'LRT2_DIVISORIA',
        name: 'Divisoria',
        isOperational: false,
        image: '',
        description: 'Planned station in Divisoria, Manila.',
        // 14.602790069620127, 120.96755569678145
        coordinates: { lat: 14.602790069620127, lng: 120.96755569678145 }, // Divisoria Station
        labelOffsetx: -70,
        labelOffsety: -15,
        edges: [
          {
            from: 'LRT2_DIVISORIA',
            to: 'LRT2_TUTUBAN',
            weight: 3,
            transferType: 'inter-station',
            // travel duration from Divisoria to Tutuban is 3 minutes
            duration: 3,
            isOperational: false,
            hide: true,
            transferDescription: 'Direct train service to Tutuban station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.602790069620127, lng: 120.96755569678145 }, // from me
              // reverse path of subpoints from Tutuban to Divisoria
              { lat: 14.605105146624622, lng: 120.96951885612073 }, // sub
              { lat: 14.605472462627132, lng: 120.9699217980134 }, // sub
              { lat: 14.60574340982949, lng: 120.9702989589526 }, // sub
              { lat: 14.605885125189356, lng: 120.97063479284101 }, // sub
              { lat: 14.606044837299484, lng: 120.97102630420436 }, // sub
              { lat: 14.606363198972117, lng: 120.97193630977111 }, // to prev
            ],
          },
          {
            from: 'LRT2_DIVISORIA',
            to: 'LRT2_PIER_4',
            weight: 3,
            transferType: 'inter-station',
            // travel duration from Divisoria to Pier 4 is 3 minutes
            duration: 3,
            isOperational: false,
            transferDescription: 'Direct train service to Pier 4 station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.602790069620127, lng: 120.96755569678145 }, // from me
              // 14.602213644334755, 120.96704011344595
              { lat: 14.602213644334755, lng: 120.96704011344595 }, // sub
              // 14.600758790714327, 120.96561383734218
              { lat: 14.600758790714327, lng: 120.96561383734218 }, // sub
              // 14.600469745584544, 120.96526292999643
              { lat: 14.600469745584544, lng: 120.96526292999643 }, // sub
              // 14.600291260283015, 120.96493610001643
              { lat: 14.600291260283015, lng: 120.96493610001643 }, // sub
              // 14.600240087098951, 120.96466593421407
              { lat: 14.600240087098951, lng: 120.96466593421407 }, // sub
              // 14.600259716511788, 120.96442054157089
              { lat: 14.600259716511788, lng: 120.96442054157089 }, // sub
              // 14.600286997234887, 120.96418776531527
              { lat: 14.600286997234887, lng: 120.96418776531527 }, // sub
              // 14.600331282527748, 120.96374530240773
              { lat: 14.600331282527748, lng: 120.96374530240773 }, // sub
              // 14.600387786170135, 120.9633650716729
              { lat: 14.600387786170135, lng: 120.9633650716729 }, // sub
              // 14.600454725566898, 120.96314508772545
              { lat: 14.600454725566898, lng: 120.96314508772545 }, // sub
              // 14.600660080485119, 120.9626388683119
              { lat: 14.600660080485119, lng: 120.9626388683119 }, // sub
              // 14.600952732206915, 120.96213211824727
              { lat: 14.600952732206915, lng: 120.96213211824727 }, // sub
              // 14.601178143472058, 120.96189509761426
              { lat: 14.601178143472058, lng: 120.96189509761426 }, // sub
              // 14.601549887309762, 120.96162130607819
              { lat: 14.601549887309762, lng: 120.96162130607819 }, // sub
              // 14.601830574998733, 120.96151512013496
              { lat: 14.601830574998733, lng: 120.96151512013496 }, // sub
              // 14.602044221630546, 120.96146190672391
              { lat: 14.602044221630546, lng: 120.96146190672391 }, // sub
              // 14.602241723928659, 120.96143340230063
              { lat: 14.602241723928659, lng: 120.96143340230063 }, // sub
              { lat: 14.602524631445576, lng: 120.96157707895948 }, // to next
            ],
          },
        ],
      },
      // pier 4
      {
        id: 16,
        code: 'LRT2_PIER_4',
        name: 'Pier 4',
        isOperational: false,
        image: '',
        description: 'Planned station near Pier 4, Manila.',
        // 14.602524631445576, 120.96157707895948
        coordinates: { lat: 14.602524631445576, lng: 120.96157707895948 }, // Pier 4 Station
        labelOffsetx: -55,
        labelOffsety: 0,
        edges: [
          {
            from: 'LRT2_PIER_4',
            to: 'LRT2_DIVISORIA',
            weight: 3,
            transferType: 'inter-station',
            // travel duration from Pier 4 to Divisoria is 3 minutes
            duration: 3,
            isOperational: false,
            hide: true,
            transferDescription: 'Direct train service to Divisoria station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.602524631445576, lng: 120.96157707895948 }, // from me
              // reverse path of subpoints from Divisoria to Pier 4
              { lat: 14.602241723928659, lng: 120.96143340230063 }, // sub
              { lat: 14.602044221630546, lng: 120.96146190672391 }, // sub
              { lat: 14.601830574998733, lng: 120.96151512013496 }, // sub
              { lat: 14.601549887309762, lng: 120.96162130607819 }, // sub
              { lat: 14.601178143472058, lng: 120.96189509761426 }, // sub
              { lat: 14.600952732206915, lng: 120.96213211824727 }, // sub
              { lat: 14.600660080485119, lng: 120.9626388683119 }, // sub
              { lat: 14.600454725566898, lng: 120.96314508772545 }, // sub
              { lat: 14.600387786170135, lng: 120.9633650716729 }, // sub
              { lat: 14.600331282527748, lng: 120.96374530240773 }, // sub
              { lat: 14.600286997234887, lng: 120.96418776531527 }, // sub
              { lat: 14.600259716511788, lng: 120.96442054157089 }, // sub
              { lat: 14.600240087098951, lng: 120.96466593421407 }, // sub
              { lat: 14.600291260283015, lng: 120.96493610001643 }, // sub
              { lat: 14.600469745584544, lng: 120.96526292999643 }, // sub
              { lat: 14.600758790714327, lng: 120.96561383734218 }, // sub
              { lat: 14.602213644334755, lng: 120.96704011344595 }, // sub
              { lat: 14.602790069620127, lng: 120.96755569678145 }, // to prev
            ],
          },
        ],
      },
    ],
  },
  // MRT3
  {
    name: 'MRT 3',
    code: 'MRT3',
    color: 'yellow',
    bgColor: 'yellow',
    textColor: 'black',
    stationActiveIcon: 'assets/icons/station-active-mrt3.png',
    stationInactiveIcon: 'assets/icons/station-inactive-mrt3.png',
    stationActiveIcon_Min: 'assets/icons/station-active-min-mrt3.png',
    stationInactiveIcon_Min: 'assets/icons/station-inactive-min-mrt3.png',
    stations: [
      {
        id: 0,
        code: 'MRT3_NORTH_TRIANGLE',
        name: 'North Triangle Common Station (MRT 3)',
        shortName: 'North Triangle',
        isOperational: false,
        description:
          'Common station for LRT-1, MRT-3, and MRT-7, located in Quezon City.',
        // 14.65432411565809, 121.03097284680013
        coordinates: { lat: 14.65432411565809, lng: 121.03097284680013 }, // North Triangle Station
        labelOffsetx: 60,
        labelOffsety: 15,
        edges: [
          {
            from: 'MRT3_NORTH_TRIANGLE',
            to: 'MRT3_NORTH_AVENUE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from North Triangle to Balintawak is 5 minutes
            duration: 5,
            path: [
              // from me
              { lat: 14.65432411565809, lng: 121.03097284680013 }, // from me
              // to next
              { lat: 14.652169907896354, lng: 121.03226455190827 }, // to next
            ],
          },
          // inter-line: to lrt1
          {
            from: 'MRT3_NORTH_TRIANGLE',
            to: 'LRT1_NORTH_TRIANGLE',
            weight: 3, // Approximate walking time in minutes
            transferType: 'inter-line',
            // walk from LRT-1 North Triangle to MRT-3 North Triangle
            duration: 3,
            transitMode: 'walk',
            isOperational: false,
            transferDescription: 'Interchange to LRT-1',
            transferDistance: 'Approximately a 3-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'none',
            direction: 'northbound',
            path: [
              // from me
              { lat: 14.65432411565809, lng: 121.03097284680013 }, // from me
              { lat: 14.654907212698745, lng: 121.03061845087198 }, // North Triangle (LRT1) Common Station
            ],
          },
          // inter-line: to mrt7
          {
            from: 'MRT3_NORTH_TRIANGLE',
            to: 'MRT7_NORTH_TRIANGLE',
            weight: 3, // Approximate walking time in minutes
            transferType: 'inter-line',
            // walk from LRT-1 North Triangle to MRT-7 North Triangle
            duration: 3,
            transitMode: 'walk',
            isOperational: false,
            transferDescription: 'Interchange to MRT-7',
            transferDistance: 'Approximately a 3-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'none',
            direction: 'southbound',
            path: [
              // from me
              { lat: 14.65432411565809, lng: 121.03097284680013 }, // from me
              { lat: 14.65524642912457, lng: 121.03168704337259 }, // North Triangle (MRT7) Common Station
            ],
          },
        ],
      },
      {
        id: 1,
        code: 'MRT3_NORTH_AVENUE',
        name: 'North Avenue',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_NORTH_AVENUE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/4/41/MRT-3_North_Avenue_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:MRT-3_North_Avenue_Station_Platform_1.jpg">Mithril Cloud at English Wikipedia</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description:
          'Northern terminus of MRT-3, adjacent to TriNoma Mall and near SM City North EDSA.',
        // 14.652169907896354, 121.03226455190827
        coordinates: { lat: 14.652169907896354, lng: 121.03226455190827 }, // North Avenue Station
        edges: [
          {
            from: 'MRT3_NORTH_AVENUE',
            to: 'MRT3_NORTH_TRIANGLE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from North Avenue to North Triangle is 5 minutes
            duration: 5,
            path: [
              { lat: 14.652169907896354, lng: 121.03226455190827 }, // from me
              { lat: 14.65432411565809, lng: 121.03097284680013 }, // to prev
            ],
          },
          {
            to: 'MRT3_QUEZON_AVENUE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from North Avenue to Quezon Avenue is 2 minutes
            duration: 2,
            path: [
              { lat: 14.652169907896354, lng: 121.03226455190827 }, // from me
              { lat: 14.64275621704705, lng: 121.03847691656055 }, // to next
            ],
          },
        ],
      },
      {
        id: 2,
        code: 'MRT3_QUEZON_AVENUE',
        name: 'Quezon Avenue',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_QUEZON_AVENUE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/7/72/Line_3_Quezon_Avenue_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_3_Quezon_Avenue_Station_Platform_1.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description:
          'Located near the intersection of Quezon Avenue and EDSA, close to Eton Centris and various government offices.',
        // 14.64275621704705, 121.03847691656055
        coordinates: { lat: 14.64275621704705, lng: 121.03847691656055 }, // Quezon Avenue Station
        edges: [
          {
            to: 'MRT3_NORTH_AVENUE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Quezon Avenue to North Avenue is 2 minutes
            duration: 2,
            path: [
              { lat: 14.64275621704705, lng: 121.03847691656055 }, // from me
              { lat: 14.652169907896354, lng: 121.03226455190827 }, // to prev
            ],
          },
          {
            to: 'MRT3_GMA_KAMUNING',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            // travel duration from Quezon Avenue to GMA-Kamuning is 2 minutes
            duration: 2,
            path: [
              { lat: 14.64275621704705, lng: 121.03847691656055 }, // from me
              { lat: 14.635217035522803, lng: 121.0434184846183 }, // to next
            ],
          },
        ],
      },
      {
        id: 3,
        code: 'MRT3_GMA_KAMUNING',
        name: 'GMA-Kamuning',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_GMA_KAMUNING.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/d/db/MRT-3_Kamuning_Station_Platform_5.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:MRT-3_Kamuning_Station_Platform_5.jpg">PhilippineRevolution</a>, Public domain, via Wikimedia Commons',
        description:
          'Situated near GMA Network Center and accessible to Kamuning Road.',
        // 14.635217035522803, 121.0434184846183
        coordinates: { lat: 14.635217035522803, lng: 121.0434184846183 }, // GMA-Kamuning Station
        labelOffsetx: 5,
        edges: [
          {
            to: 'MRT3_QUEZON_AVENUE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.635217035522803, lng: 121.0434184846183 }, // from me
              { lat: 14.64275621704705, lng: 121.03847691656055 }, // to prev
            ],
          },
          {
            to: 'MRT3_CUBAO',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.635217035522803, lng: 121.0434184846183 }, // from me
              // 14.632736048062538, 121.0449473654122
              { lat: 14.632736048062538, lng: 121.0449473654122 }, // sub
              // 14.628925870846262, 121.04680382772032
              { lat: 14.628925870846262, lng: 121.04680382772032 }, // sub
              // 14.625594083519971, 121.04829312421958
              { lat: 14.625594083519971, lng: 121.04829312421958 }, // sub
              // 14.623439395990236, 121.04928124449827
              { lat: 14.623439395990236, lng: 121.04928124449827 }, // sub
              { lat: 14.619436167701586, lng: 121.05109226468761 }, // to next
            ],
          },
        ],
      },
      {
        id: 4,
        code: 'MRT3_CUBAO',
        name: 'Araneta Center-Cubao',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_CUBAO.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/0/01/Line_3_Araneta_Center-Cubao_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_3_Araneta_Center-Cubao_Station_Platform_1.jpg">Patrickroque01 at English Wikipedia</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description:
          'Integrated with Araneta City, providing connections to LRT Line 2 and access to shopping centers like Gateway Mall.',
        // 14.619436167701586, 121.05109226468761
        coordinates: { lat: 14.619436167701586, lng: 121.05109226468761 }, // Cubao Station
        edges: [
          {
            to: 'MRT3_GMA_KAMUNING',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.619436167701586, lng: 121.05109226468761 }, // from me
              // reverse path of subpoints from GMA-Kamuning to Cubao
              { lat: 14.623439395990236, lng: 121.04928124449827 }, // sub
              { lat: 14.625594083519971, lng: 121.04829312421958 }, // sub
              { lat: 14.628925870846262, lng: 121.04680382772032 }, // sub
              { lat: 14.632736048062538, lng: 121.0449473654122 }, // sub
              { lat: 14.635217035522803, lng: 121.0434184846183 }, // to prev
            ],
          },
          {
            to: 'MRT3_SANTOLAN_ANNAPOLIS',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.619436167701586, lng: 121.05109226468761 }, // from me
              { lat: 14.607368674492228, lng: 121.05666307569197 }, // to next
            ],
          },
          {
            from: 'MRT3_CUBAO',
            to: 'LRT2_CUBAO',
            weight: 5,
            transferType: 'inter-line',
            // transfer duration from MRT-3 Cubao to LRT-2 Cubao by foot is 7 minutes
            duration: 7,
            transitMode: 'walk',
            isOperational: true,
            transferDescription:
              'Connected via a covered walkway inside the Araneta City complex.',
            transferDistance: 'Approximately 5-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'Separate fare required',
            direction: 'southbound', // Assuming LRT-2 Cubao is southbound relative to MRT-3 Cubao
            path: [
              { lat: 14.619436167701586, lng: 121.05109226468761 }, // from me
              { lat: 14.622724831527815, lng: 121.05266770816854 }, // to next line
            ],
          },
        ],
      },
      {
        id: 5,
        code: 'MRT3_SANTOLAN_ANNAPOLIS',
        name: 'Santolan-Annapolis',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_SANTOLAN_ANNAPOLIS.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/8/87/MRT-3_Santolan_Station_Platform_7.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:MRT-3_Santolan_Station_Platform_7.jpg">PhilippineRevolution</a>, Public domain, via Wikimedia Commons',
        description:
          'Positioned near Greenhills Shopping Center and various commercial establishments.',
        // 14.607368674492228, 121.05666307569197
        coordinates: { lat: 14.607368674492228, lng: 121.05666307569197 }, // Santolan-Annapolis Station
        labelOffsetx: -5,
        edges: [
          {
            to: 'MRT3_CUBAO',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.607368674492228, lng: 121.05666307569197 }, // from me
              { lat: 14.619436167701586, lng: 121.05109226468761 }, // to prev
            ],
          },
          {
            to: 'MRT3_ORTIGAS',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.607368674492228, lng: 121.05666307569197 }, // from me
              // 14.602285978507956, 121.05900588373571
              { lat: 14.602285978507956, lng: 121.05900588373571 }, // sub
              // 14.600713839944556, 121.05952624175931
              { lat: 14.600713839944556, lng: 121.05952624175931 }, // sub
              // 14.599952335350478, 121.05967853663755
              { lat: 14.599952335350478, lng: 121.05967853663755 }, // sub
              // 14.599252243092236, 121.05971660300399
              { lat: 14.599252243092236, lng: 121.05971660300399 }, // sub
              // 14.598724092855448, 121.05975472242727
              { lat: 14.598724092855448, lng: 121.05975472242727 }, // sub
              // 14.598195946673624, 121.05979278922062
              { lat: 14.598195946673624, lng: 121.05979278922062 }, // sub
              // 14.597680084235307, 121.05975470302718
              { lat: 14.597680084235307, lng: 121.05975470302718 }, // sub
              // 14.597029115717618, 121.05965315415644
              { lat: 14.597029115717618, lng: 121.05965315415644 }, // sub
              // 14.596353582627001, 121.05950083750528
              { lat: 14.596353582627001, lng: 121.05950083750528 }, // sub
              // 14.595690325365783, 121.0592089206326
              { lat: 14.595690325365783, lng: 121.0592089206326 }, // sub
              // 14.595100041219183, 121.05891604333469
              { lat: 14.595100041219183, lng: 121.05891604333469 }, // sub
              // 14.59125942304132, 121.05765859785012
              { lat: 14.59125942304132, lng: 121.05765859785012 }, // sub
              // 14.590759356393924, 121.05753152992965
              { lat: 14.590759356393924, lng: 121.05753152992965 }, // sub
              // 14.589496892589956, 121.05725198269256
              { lat: 14.589496892589956, lng: 121.05725198269256 }, // sub
              { lat: 14.587891443450124, lng: 121.05671105208569 }, // to next
            ],
          },
        ],
      },
      {
        id: 6,
        code: 'MRT3_ORTIGAS',
        name: 'Ortigas',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_ORTIGAS.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/7/73/MRT-3_Ortigas_Station_Platform_2.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:MRT-3_Ortigas_Station_Platform_2.jpg">TLP</a>, Public domain, via Wikimedia Commons',
        description:
          'Serves the Ortigas Central Business District, with proximity to SM Megamall and Robinsons Galleria.',
        // 14.587891443450124, 121.05671105208569
        coordinates: { lat: 14.587891443450124, lng: 121.05671105208569 }, // Ortigas Station
        edges: [
          {
            to: 'MRT3_SANTOLAN_ANNAPOLIS',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.587891443450124, lng: 121.05671105208569 }, // from me
              // reverse path of subpoints from Santolan-Annapolis to Ortigas
              { lat: 14.589496892589956, lng: 121.05725198269256 }, // sub
              { lat: 14.590759356393924, lng: 121.05753152992965 }, // sub
              { lat: 14.59125942304132, lng: 121.05765859785012 }, // sub
              { lat: 14.595100041219183, lng: 121.05891604333469 }, // sub
              { lat: 14.595690325365783, lng: 121.0592089206326 }, // sub
              { lat: 14.596353582627001, lng: 121.05950083750528 }, // sub
              { lat: 14.597029115717618, lng: 121.05965315415644 }, // sub
              { lat: 14.597680084235307, lng: 121.05975470302718 }, // sub
              { lat: 14.598195946673624, lng: 121.05979278922062 }, // sub
              { lat: 14.598724092855448, lng: 121.05975472242727 }, // sub
              { lat: 14.599252243092236, lng: 121.05971660300399 }, // sub
              { lat: 14.599952335350478, lng: 121.05967853663755 }, // sub
              { lat: 14.600713839944556, lng: 121.05952624175931 }, // sub
              { lat: 14.602285978507956, lng: 121.05900588373571 }, // sub
              { lat: 14.607368674492228, lng: 121.05666307569197 }, // to prev
            ],
          },
          {
            to: 'MRT3_SHAW_BOULEVARD',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.587891443450124, lng: 121.05671105208569 }, // from me
              // 14.584604148339332, 121.0556117466593
              { lat: 14.584604148339332, lng: 121.0556117466593 }, // sub
              // 14.584030282539404, 121.05541690935605
              { lat: 14.584030282539404, lng: 121.05541690935605 }, // sub
              // 14.583653208528549, 121.05521358377581
              { lat: 14.583653208528549, lng: 121.05521358377581 }, // sub
              // 14.583292085573108, 121.05501004921709
              { lat: 14.583292085573108, lng: 121.05501004921709 }, // sub
              { lat: 14.581241157304031, lng: 121.05360426276788 }, // to next
            ],
          },
        ],
      },
      {
        id: 7,
        code: 'MRT3_SHAW_BOULEVARD',
        name: 'Shaw Boulevard',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_SHAW_BOULEVARD.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/b/ba/MRT-3_Shaw_Boulevard_Station_Platform_2.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:MRT-3_Shaw_Boulevard_Station_Platform_2.jpg">Exec8</a>, Public domain, via Wikimedia Commons',
        description:
          'Located near Shangri-La Plaza and Starmall EDSA-Shaw, serving as a major transfer point for commuters.',
        // 14.581241157304031, 121.05360426276788
        coordinates: { lat: 14.581241157304031, lng: 121.05360426276788 }, // Shaw Boulevard Station
        edges: [
          {
            to: 'MRT3_ORTIGAS',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.581241157304031, lng: 121.05360426276788 }, // from me
              // reverse path of subpoints from Ortigas to Shaw Boulevard
              { lat: 14.583292085573108, lng: 121.05501004921709 }, // sub
              { lat: 14.583653208528549, lng: 121.05521358377581 }, // sub
              { lat: 14.584030282539404, lng: 121.05541690935605 }, // sub
              { lat: 14.584604148339332, lng: 121.0556117466593 }, // sub
              { lat: 14.587891443450124, lng: 121.05671105208569 }, // to prev
            ],
          },
          {
            to: 'MRT3_BONI',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.581241157304031, lng: 121.05360426276788 }, // from me
              { lat: 14.573765068135797, lng: 121.04814319459827 }, // to next
            ],
          },
        ],
      },
      {
        id: 8,
        code: 'MRT3_BONI',
        name: 'Boni',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_BONI.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/3/39/MRT-3_Boni_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:MRT-3_Boni_Station_Platform_1.jpg">Exec8 at English Wikipedia</a>, Public domain, via Wikimedia Commons',
        description:
          'Provides access to the Pioneer area and nearby commercial establishments.',
        // 14.573765068135797, 121.04814319459827
        coordinates: { lat: 14.573765068135797, lng: 121.04814319459827 }, // Boni Station
        edges: [
          {
            to: 'MRT3_SHAW_BOULEVARD',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.573765068135797, lng: 121.04814319459827 }, // from me
              { lat: 14.581241157304031, lng: 121.05360426276788 }, // to prev
            ],
          },
          {
            to: 'MRT3_GUADALUPE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.573765068135797, lng: 121.04814319459827 }, // from me
              // 14.572237958626003, 121.04722424489026
              { lat: 14.572237958626003, lng: 121.04722424489026 }, // sub
              // 14.571244444751542, 121.04684059215427
              { lat: 14.571244444751542, lng: 121.04684059215427 }, // sub
              // 14.570682457225342, 121.04660210690496
              { lat: 14.570682457225342, lng: 121.04660210690496 }, // sub
              { lat: 14.566672857041965, lng: 121.04542599246548 }, // to next
            ],
          },
        ],
      },
      {
        id: 9,
        code: 'MRT3_GUADALUPE',
        name: 'Guadalupe',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_GUADALUPE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/5/50/92050jfGuadalupe_Makati_Mandaluyong_Bridge_MRT-25_segments_Bridge_EDSAfvf.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:92050jfGuadalupe_Makati_Mandaluyong_Bridge_MRT-25_segments_Bridge_EDSAfvf.jpg">Judgefloro</a>, Public domain, via Wikimedia Commons',
        description:
          'Situated near Guadalupe Nuevo and Guadalupe Viejo, with access to the Pasig River ferry service.',
        // 14.566672857041965, 121.04542599246548
        coordinates: { lat: 14.566672857041965, lng: 121.04542599246548 }, // Guadalupe Station
        edges: [
          {
            to: 'MRT3_BONI',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.566672857041965, lng: 121.04542599246548 }, // from me
              // reverse path of subpoints from Boni to Guadalupe
              { lat: 14.570682457225342, lng: 121.04660210690496 }, // sub
              { lat: 14.571244444751542, lng: 121.04684059215427 }, // sub
              { lat: 14.572237958626003, lng: 121.04722424489026 }, // sub
              { lat: 14.573765068135797, lng: 121.04814319459827 }, // to prev
            ],
          },
          {
            to: 'MRT3_BUENDIA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.566672857041965, lng: 121.04542599246548 }, // from me
              // 14.565273267001144, 121.04512971392451
              { lat: 14.565273267001144, lng: 121.04512971392451 }, // sub
              // 14.564671122493886, 121.04490159921129
              { lat: 14.564671122493886, lng: 121.04490159921129 }, // sub
              // 14.564109120157976, 121.04466311628835
              { lat: 14.564109120157976, lng: 121.04466311628835 }, // sub
              // 14.563537080664954, 121.04437278962979
              { lat: 14.563537080664954, lng: 121.04437278962979 }, // sub
              // 14.562844608478013, 121.043906193281
              { lat: 14.562844608478013, lng: 121.043906193281 }, // sub
              // 14.562162168515815, 121.04343959789327
              { lat: 14.562162168515815, lng: 121.04343959789327 }, // sub
              // 14.561640299382175, 121.0429107645533
              { lat: 14.561640299382175, lng: 121.0429107645533 }, // sub
              { lat: 14.554615536966176, lng: 121.0344275884317 }, // to next
            ],
          },
        ],
      },
      {
        id: 10,
        code: 'MRT3_BUENDIA',
        name: 'Buendia',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_BUENDIA.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/f/f7/MRT-3_Buendia_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:MRT-3_Buendia_Station_Platform_1.jpg">Jeromesandilanico</a>, CC0, via Wikimedia Commons',
        description:
          'Located near the Makati Central Business District, providing access to various offices and commercial centers.',
        // 14.554615536966176, 121.0344275884317
        coordinates: { lat: 14.554615536966176, lng: 121.0344275884317 }, // Buendia Station
        edges: [
          {
            to: 'MRT3_GUADALUPE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.554615536966176, lng: 121.0344275884317 }, // from me
              // reverse path of subpoints from Guadalupe to Buendia
              { lat: 14.561640299382175, lng: 121.0429107645533 }, // sub
              { lat: 14.562162168515815, lng: 121.04343959789327 }, // sub
              { lat: 14.562844608478013, lng: 121.043906193281 }, // sub
              { lat: 14.563537080664954, lng: 121.04437278962979 }, // sub
              { lat: 14.564109120157976, lng: 121.04466311628835 }, // sub
              { lat: 14.564671122493886, lng: 121.04490159921129 }, // sub
              { lat: 14.565273267001144, lng: 121.04512971392451 }, // sub
              { lat: 14.566672857041965, lng: 121.04542599246548 }, // to prev
            ],
          },
          {
            to: 'MRT3_AYALA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.554615536966176, lng: 121.0344275884317 }, // from me
              { lat: 14.549182387052426, lng: 121.02797462354556 }, // to next
            ],
          },
        ],
      },
      {
        id: 11,
        code: 'MRT3_AYALA',
        name: 'Ayala',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_AYALA.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/9/9b/Line_3_Ayala_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_3_Ayala_Station_Platform_1.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description:
          'Directly connected to Ayala Center, including Glorietta and Greenbelt malls, serving as a major hub for shoppers and professionals.',
        // 14.549182387052426, 121.02797462354556
        coordinates: { lat: 14.549182387052426, lng: 121.02797462354556 }, // Ayala Station
        edges: [
          {
            to: 'MRT3_BUENDIA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.549182387052426, lng: 121.02797462354556 }, // from me
              { lat: 14.554615536966176, lng: 121.0344275884317 }, // to prev
            ],
          },
          {
            to: 'MRT3_MAGALLANES',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.549182387052426, lng: 121.02797462354556 }, // from me
              { lat: 14.542176999516412, lng: 121.01968479687375 }, // to next
            ],
          },
        ],
      },
      {
        id: 12,
        code: 'MRT3_MAGALLANES',
        name: 'Magallanes',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_MAGALLANES.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/f/f9/Line_3_Magallanes_Station_Platform_1.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Line_3_Magallanes_Station_Platform_1.jpg">Korean Rail Fan</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons',
        description:
          'Positioned near the Magallanes Village and provides access to the South Luzon Expressway (SLEX).',
        // 14.542176999516412, 121.01968479687375
        coordinates: { lat: 14.542176999516412, lng: 121.01968479687375 }, // Magallanes Station
        edges: [
          {
            to: 'MRT3_AYALA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.542176999516412, lng: 121.01968479687375 }, // from me
              { lat: 14.549182387052426, lng: 121.02797462354556 }, // to prev
            ],
          },
          {
            to: 'MRT3_TAFT_AVENUE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.542176999516412, lng: 121.01968479687375 }, // from me
              // 14.541128322656357, 121.01819588737736
              { lat: 14.541128322656357, lng: 121.01819588737736 }, // sub
              // 14.5406035396574, 121.01732337709673
              { lat: 14.5406035396574, lng: 121.01732337709673 }, // sub
              // 14.540406743966907, 121.01690829947914
              { lat: 14.540406743966907, lng: 121.01690829947914 }, // sub
              // 14.540219193688474, 121.01646033616468
              { lat: 14.540219193688474, lng: 121.01646033616468 }, // sub
              // 14.539967163184846, 121.01581885766345
              { lat: 14.539967163184846, lng: 121.01581885766345 }, // sub
              // 14.539388952499424, 121.01429571690672
              { lat: 14.539388952499424, lng: 121.01429571690672 }, // sub
              // 14.539104361174417, 121.01309712660945
              { lat: 14.539104361174417, lng: 121.01309712660945 }, // sub
              // 14.538732233193565, 121.01081867995495
              { lat: 14.538732233193565, lng: 121.01081867995495 }, // sub
              // 14.538357867021675, 121.00790614406776
              { lat: 14.538357867021675, lng: 121.00790614406776 }, // sub
              { lat: 14.53768596175474, lng: 121.00178304515234 }, // to next
            ],
          },
        ],
      },
      {
        id: 13,
        code: 'MRT3_TAFT_AVENUE',
        name: 'Taft Avenue',
        isOperational: true,
        imageLocal: 'assets/images/lines/mrt3/MRT3_TAFT_AVENUE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/d/de/MRT-3_Taft_Avenue_Station_Platform_3.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:MRT-3_Taft_Avenue_Station_Platform_3.jpg">PhilippineRevolution</a>, Public domain, via Wikimedia Commons',
        description:
          'Southern terminus of MRT-3, located at the intersection of EDSA and Taft Avenue in Pasay City. Provides a vital transfer point to LRT Line 1 via a connecting footbridge to EDSA Station, facilitating seamless north-south travel across Metro Manila.',
        // 14.53768596175474, 121.00178304515234
        coordinates: { lat: 14.53768596175474, lng: 121.00178304515234 }, // Taft Avenue Station
        labelOffsety: 5,
        edges: [
          {
            to: 'MRT3_MAGALLANES',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 2,
            path: [
              { lat: 14.53768596175474, lng: 121.00178304515234 }, // from me
              // reverse path of subpoints from Magallanes to Taft Avenue
              { lat: 14.538357867021675, lng: 121.00790614406776 }, // sub
              { lat: 14.538732233193565, lng: 121.01081867995495 }, // sub
              { lat: 14.539104361174417, lng: 121.01309712660945 }, // sub
              { lat: 14.539388952499424, lng: 121.01429571690672 }, // sub
              { lat: 14.539967163184846, lng: 121.01581885766345 }, // sub
              { lat: 14.540219193688474, lng: 121.01646033616468 }, // sub
              { lat: 14.540406743966907, lng: 121.01690829947914 }, // sub
              { lat: 14.5406035396574, lng: 121.01732337709673 }, // sub
              { lat: 14.541128322656357, lng: 121.01819588737736 }, // sub
              { lat: 14.542176999516412, lng: 121.01968479687375 }, // to prev
            ],
          },
          {
            from: 'MRT3_TAFT_AVENUE',
            to: 'LRT1_EDSA',
            weight: 5, // Approximate walking time in minutes
            transferType: 'inter-line',
            // transfer duration from MRT-3 Taft Avenue to LRT-1 EDSA by foot is 5 minutes
            duration: 5,
            transitMode: 'walk',
            isOperational: true,
            transferDescription: 'Connected via a covered footbridge.',
            transferDistance: 'Approximately a 5-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'Separate fare required',
            direction: 'southbound', // Assuming LRT-1 EDSA is southbound relative to MRT-3 Taft Avenue
            path: [
              { lat: 14.53768596175474, lng: 121.00178304515234 }, // from me
              // 14.53762007223042, 121.0013634111226
              { lat: 14.53762007223042, lng: 121.0013634111226 }, // sub
              // 14.537787739829989, 121.00129998070378
              { lat: 14.537787739829989, lng: 121.00129998070378 }, // sub
              // 14.537811354703617, 121.00110481043818
              { lat: 14.537811354703617, lng: 121.00110481043818 }, // sub
              // 14.537837331204383, 121.00101942337176
              { lat: 14.537837331204383, lng: 121.00101942337176 }, // sub
              // 14.537870392275671, 121.00095355328669
              { lat: 14.537870392275671, lng: 121.00095355328669 }, // sub
              // 14.537915260989628, 121.00091451907946
              { lat: 14.537915260989628, lng: 121.00091451907946 }, // sub
              // 14.537990829445746, 121.00088524328747
              { lat: 14.537990829445746, lng: 121.00088524328747 }, // sub
              // 14.538071120961797, 121.00086572597958
              { lat: 14.538071120961797, lng: 121.00086572597958 }, // sub
              // 14.538177389200289, 121.00085596709869
              { lat: 14.538177389200289, lng: 121.00085596709869 }, // sub
              // 14.538406455821, 121.00083645055177
              { lat: 14.538406455821, lng: 121.00083645055177 }, // sub
              { lat: 14.538714843616395, lng: 121.00063929330985 }, // to next line
            ],
          },
        ],
      },
    ],
  },
  // MRT7
  {
    name: 'MRT 7',
    code: 'MRT7',
    color: 'maroon',
    bgColor: 'maroon',
    textColor: 'white',
    stationActiveIcon: 'assets/icons/mrt7/station-active-mrt7.png',
    stationInactiveIcon: 'assets/icons/mrt7/station-inactive-mrt7.png',
    stationActiveIcon_Min: 'assets/icons/mrt7/station-active-min-mrt7.png',
    stationInactiveIcon_Min: 'assets/icons/mrt7/station-inactive-min-mrt7.png',
    stations: [
      {
        id: 1,
        code: 'MRT7_NORTH_TRIANGLE',
        name: 'North Triangle Common Station (MRT 7)',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_NORTH_TRIANGLE.jpg',
        image: '',
        imageAttributionHtml: '',
        description:
          'Serves as a common station for MRT-3, MRT-7, and LRT-1, providing seamless transfers between the three lines.',
        // 14.65524642912457, 121.03168704337259
        coordinates: { lat: 14.65524642912457, lng: 121.03168704337259 }, // North Triangle Common Station
        edges: [
          {
            to: 'MRT7_QUEZON_MEMORIAL_CIRCLE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from North Avenue to Quezon Avenue is 2 minutes
            duration: 2,
            path: [
              { lat: 14.65524642912457, lng: 121.03168704337259 }, // from me
              // 14.65412749495689, 121.03677892398586
              { lat: 14.65412749495689, lng: 121.03677892398586 }, // sub
              // 14.652971604325916, 121.04225736342646
              { lat: 14.652971604325916, lng: 121.04225736342646 }, // sub
              // 14.65225400110105, 121.04562416381948
              { lat: 14.65225400110105, lng: 121.04562416381948 }, // sub
              // 14.652138755475272, 121.04622477296515
              { lat: 14.652138755475272, lng: 121.04622477296515 }, // sub
              // 14.652138669056606, 121.0464814783428
              { lat: 14.652138669056606, lng: 121.0464814783428 }, // sub
              // prev
              { lat: 14.652302647668204, lng: 121.04758167911145 }, // to next
            ],
          },
        ],
      },
      {
        id: 2,
        code: 'MRT7_QUEZON_MEMORIAL_CIRCLE',
        name: 'Quezon Memorial Circle',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_QUEZON_MEMORIAL_CIRCLE.jpg',
        image: '',
        imageAttributionHtml: '',
        description:
          'Located near the Quezon Memorial Circle and the University of the Philippines Diliman campus.',
        // 14.652302647668204, 121.04758167911145
        coordinates: { lat: 14.652302647668204, lng: 121.04758167911145 }, // Quezon Memorial Circle Station
        edges: [
          {
            to: 'MRT7_NORTH_TRIANGLE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Quezon Avenue to North Avenue is 2 minutes
            duration: 2,
            path: [
              // prev
              { lat: 14.652302647668204, lng: 121.04758167911145 }, // to next
              // 14.652138669056606, 121.0464814783428
              { lat: 14.652138669056606, lng: 121.0464814783428 }, // sub
              // 14.652138755475272, 121.04622477296515
              { lat: 14.652138755475272, lng: 121.04622477296515 }, // sub
              // 14.65225400110105, 121.04562416381948
              { lat: 14.65225400110105, lng: 121.04562416381948 }, // sub
              // 14.652971604325916, 121.04225736342646
              { lat: 14.652971604325916, lng: 121.04225736342646 }, // sub
              // 14.65412749495689, 121.03677892398586
              { lat: 14.65412749495689, lng: 121.03677892398586 }, // sub
              { lat: 14.65524642912457, lng: 121.03168704337259 }, // to prev
            ],
          },
          {
            to: 'MRT7_UNIVERSITY_AVENUE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Quezon Avenue to University Avenue is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.652302647668204, lng: 121.04758167911145 }, // to next
              // 14.652548300568533, 121.04954882447632
              { lat: 14.652548300568533, lng: 121.04954882447632 }, // sub
              // 14.65274064418109, 121.0508665753705
              { lat: 14.65274064418109, lng: 121.0508665753705 }, // sub
              // 14.653197322983338, 121.05183515891883
              { lat: 14.653197322983338, lng: 121.05183515891883 }, // sub
              // to next
              { lat: 14.654985458150504, lng: 121.05466565187392 }, // to prev
            ],
          },
        ],
      },
      {
        id: 3,
        code: 'MRT7_UNIVERSITY_AVENUE',
        name: 'University Avenue',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_UNIVERSITY_AVENUE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/d/d7/MRT-7_Construction_101417.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:MRT-7_Construction_101417.jpg">Judah fourteen</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description:
          'Located near the University of the Philippines Diliman campus.',
        // 14.654985458150504, 121.05466565187392
        coordinates: { lat: 14.654985458150504, lng: 121.05466565187392 }, // University Avenue Station
        edges: [
          {
            to: 'MRT7_QUEZON_MEMORIAL_CIRCLE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from University Avenue to Quezon Avenue is 2 minutes
            duration: 2,
            path: [
              { lat: 14.654985458150504, lng: 121.05466565187392 }, // from me
              // 14.653197322983338, 121.05183515891883
              { lat: 14.653197322983338, lng: 121.05183515891883 }, // sub
              // 14.65274064418109, 121.0508665753705
              { lat: 14.65274064418109, lng: 121.0508665753705 }, // sub
              // 14.652548300568533, 121.04954882447632
              { lat: 14.652548300568533, lng: 121.04954882447632 }, // sub
              { lat: 14.652302647668204, lng: 121.04758167911145 }, // to prev
            ],
          },
          {
            to: 'MRT7_TANDANG_SORA',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from University Avenue to Tandang Sora is 2 minutes
            duration: 2,
            path: [
              { lat: 14.654985458150504, lng: 121.05466565187392 }, // from me
              // 14.659789608805308, 121.06199073603081
              { lat: 14.659789608805308, lng: 121.06199073603081 }, // sub
              // 14.661792535631712, 121.06499442132113
              { lat: 14.661792535631712, lng: 121.06499442132113 }, // sub
              // to next
              { lat: 14.663368948411401, lng: 121.06742497270234 }, // to next
            ],
          },
        ],
      },
      {
        id: 4,
        code: 'MRT7_TANDANG_SORA',
        name: 'Tandang Sora',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_TANDANG_SORA.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/c/c5/Commonwealth_Avenue_Quezon_City_Highway_13.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Commonwealth_Avenue_Quezon_City_Highway_13.jpg">Video13</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Located near Tandang Sora Avenue.',
        // 14.663368948411401, 121.06742497270234
        coordinates: { lat: 14.663368948411401, lng: 121.06742497270234 }, // Tandang Sora Station
        edges: [
          {
            to: 'MRT7_UNIVERSITY_AVENUE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Tandang Sora to University Avenue is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.663368948411401, lng: 121.06742497270234 }, // to next
              // 14.661792535631712, 121.06499442132113
              { lat: 14.661792535631712, lng: 121.06499442132113 }, // sub
              // 14.659789608805308, 121.06199073603081
              { lat: 14.659789608805308, lng: 121.06199073603081 }, // sub
              { lat: 14.654985458150504, lng: 121.05466565187392 }, // to prev
            ],
          },
          {
            to: 'MRT7_DON_ANTONIO',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Tandang Sora to Don Antonio is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.663368948411401, lng: 121.06742497270234 }, // to next
              // 14.665396907823501, 121.0705117990797
              { lat: 14.665396907823501, lng: 121.0705117990797 }, // sub
              // 14.667562464319381, 121.07377349543911
              { lat: 14.667562464319381, lng: 121.07377349543911 }, // sub
              // 14.668856962383458, 121.07558190378037
              { lat: 14.668856962383458, lng: 121.07558190378037 }, // sub
              // 14.670476136468352, 121.07751384375862
              { lat: 14.670476136468352, lng: 121.07751384375862 }, // sub
              // 14.671968337271586, 121.07903407031459
              { lat: 14.671968337271586, lng: 121.07903407031459 }, // sub
              // 14.672888971095619, 121.07981076081744
              { lat: 14.672888971095619, lng: 121.07981076081744 }, // sub
              // 14.674475315946056, 121.08100179738823
              { lat: 14.674475315946056, lng: 121.08100179738823 }, // sub
              // 14.675495678551489, 121.08176153577321
              { lat: 14.675495678551489, lng: 121.08176153577321 }, // sub
              // to next
              { lat: 14.676977318755544, lng: 121.08266724669903 }, // to next
            ],
          },
        ],
      },
      {
        id: 5,
        code: 'MRT7_DON_ANTONIO',
        name: 'Don Antonio',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_DON_ANTONIO.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/1/1c/Don_Antonio_Station_UC_%282-6-23%29.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Don_Antonio_Station_UC_(2-6-23).jpg">LMgamer36</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Located near Don Antonio Heights.',
        // 14.676977318755544, 121.08266724669903
        coordinates: { lat: 14.676977318755544, lng: 121.08266724669903 }, // Don Antonio Station
        edges: [
          {
            to: 'MRT7_TANDANG_SORA',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Don Antonio to Tandang Sora is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.676977318755544, lng: 121.08266724669903 }, // to next
              // 14.675495678551489, 121.08176153577321
              { lat: 14.675495678551489, lng: 121.08176153577321 }, // sub
              // 14.674475315946056, 121.08100179738823
              { lat: 14.674475315946056, lng: 121.08100179738823 }, // sub
              // 14.672888971095619, 121.07981076081744
              { lat: 14.672888971095619, lng: 121.07981076081744 }, // sub
              // 14.671968337271586, 121.07903407031459
              { lat: 14.671968337271586, lng: 121.07903407031459 }, // sub
              // 14.670476136468352, 121.07751384375862
              { lat: 14.670476136468352, lng: 121.07751384375862 }, // sub
              // 14.668856962383458, 121.07558190378037
              { lat: 14.668856962383458, lng: 121.07558190378037 }, // sub
              // 14.667562464319381, 121.07377349543911
              { lat: 14.667562464319381, lng: 121.07377349543911 }, // sub
              // 14.665396907823501, 121.0705117990797
              { lat: 14.665396907823501, lng: 121.0705117990797 }, // sub
              // to prev
              { lat: 14.663368948411401, lng: 121.06742497270234 }, // to prev
            ],
          },
          {
            to: 'MRT7_BATASAN',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Don Antonio to Batasan is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.676977318755544, lng: 121.08266724669903 }, // to next
              // 14.678234759955181, 121.08329397248819
              { lat: 14.678234759955181, lng: 121.08329397248819 }, // sub
              // 14.68135558677288, 121.08464754596504
              { lat: 14.68135558677288, lng: 121.08464754596504 }, // sub
              // 14.683269680509985, 121.08549042190123
              { lat: 14.683269680509985, lng: 121.08549042190123 }, // sub
              // to next
              { lat: 14.68506854129369, lng: 121.08630911732064 }, // to next
            ],
          },
        ],
      },
      {
        id: 6,
        code: 'MRT7_BATASAN',
        name: 'Batasan',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_BATASAN.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/7/75/Batasan_station_Road_Commonwealth_01.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Batasan_station_Road_Commonwealth_01.jpg">Video13</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Located near the Batasan Pambansa Complex.',
        // 14.68506854129369, 121.08630911732064
        coordinates: { lat: 14.68506854129369, lng: 121.08630911732064 }, // Batasan Station
        edges: [
          {
            to: 'MRT7_DON_ANTONIO',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Batasan to Don Antonio is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.68506854129369, lng: 121.08630911732064 }, // to prev
              // 14.683269680509985, 121.08549042190123
              { lat: 14.683269680509985, lng: 121.08549042190123 }, // sub
              // 14.68135558677288, 121.08464754596504
              { lat: 14.68135558677288, lng: 121.08464754596504 }, // sub
              // 14.678234759955181, 121.08329397248819
              { lat: 14.678234759955181, lng: 121.08329397248819 }, // sub
              // to prev
              { lat: 14.676977318755544, lng: 121.08266724669903 }, // to prev
            ],
          },
          {
            to: 'MRT7_MANGGAHAN',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Batasan to Manggahan is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.68506854129369, lng: 121.08630911732064 }, // to next
              // 14.686555945252255, 121.08688054051667
              { lat: 14.686555945252255, lng: 121.08688054051667 }, // sub
              // 14.687339304338577, 121.08707329072887
              { lat: 14.687339304338577, lng: 121.08707329072887 }, // sub
              // 14.688062678180517, 121.08718810088799
              { lat: 14.688062678180517, lng: 121.08718810088799 }, // sub
              // 14.688826667871284, 121.0872551484314
              { lat: 14.688826667871284, lng: 121.0872551484314 }, // sub
              // 14.690867025726636, 121.08726831790771
              { lat: 14.690867025726636, lng: 121.08726831790771 }, // sub
              // 14.693170564833995, 121.08733680026909
              { lat: 14.693170564833995, lng: 121.08733680026909 }, // sub
              // 14.694687426925446, 121.08734356644335
              { lat: 14.694687426925446, lng: 121.08734356644335 }, // sub
              // 14.695899261001024, 121.08734685943338
              { lat: 14.695899261001024, lng: 121.08734685943338 }, // sub
              // to next
              { lat: 14.697373103254039, lng: 121.08733303190266 }, // to next
            ],
          },
        ],
      },
      {
        id: 7,
        code: 'MRT7_MANGGAHAN',
        name: 'Manggahan',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_MANGGAHAN.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/9/9f/Barangay_Commonwealth%2C_Quezon_City_Highway_37.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Barangay_Commonwealth,_Quezon_City_Highway_37.jpg">Video13</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Located near Manggahan Floodway.',
        // 14.697373103254039, 121.08733303190266
        coordinates: { lat: 14.697373103254039, lng: 121.08733303190266 }, // Manggahan Station
        edges: [
          {
            to: 'MRT7_BATASAN',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Manggahan to Batasan is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.697373103254039, lng: 121.08733303190266 }, // to prev
              // 14.695899261001024, 121.08734685943338
              { lat: 14.695899261001024, lng: 121.08734685943338 }, // sub
              // 14.694687426925446, 121.08734356644335
              { lat: 14.694687426925446, lng: 121.08734356644335 }, // sub
              // 14.693170564833995, 121.08733680026909
              { lat: 14.693170564833995, lng: 121.08733680026909 }, // sub
              // 14.690867025726636, 121.08726831790771
              { lat: 14.690867025726636, lng: 121.08726831790771 }, // sub
              // 14.688826667871284, 121.0872551484314
              { lat: 14.688826667871284, lng: 121.0872551484314 }, // sub
              // 14.688062678180517, 121.08718810088799
              { lat: 14.688062678180517, lng: 121.08718810088799 }, // sub
              // 14.687339304338577, 121.08707329072887
              { lat: 14.687339304338577, lng: 121.08707329072887 }, // sub
              // 14.686555945252255, 121.08688054051667
              { lat: 14.686555945252255, lng: 121.08688054051667 }, // sub
              // to prev
              { lat: 14.68506854129369, lng: 121.08630911732064 }, // to prev
            ],
          },
          {
            to: 'MRT7_DONA_CARMEN',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Manggahan to Dona Carmen is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.697373103254039, lng: 121.08733303190266 }, // from me
              // 14.69888858311386, 121.08725587012695
              { lat: 14.69888858311386, lng: 121.08725587012695 }, // sub
              // 14.69966100934541, 121.08712430348568
              { lat: 14.69966100934541, lng: 121.08712430348568 }, // sub
              // 14.700362244006865, 121.08692599900542
              { lat: 14.700362244006865, lng: 121.08692599900542 }, // sub
              // 14.700405363676369, 121.08691868240773
              { lat: 14.700405363676369, lng: 121.08691868240773 }, // sub
              // 14.701239519172502, 121.0865567149545
              { lat: 14.701239519172502, lng: 121.0865567149545 }, // sub
              // 14.701984277516342, 121.08617414404526
              { lat: 14.701984277516342, lng: 121.08617414404526 }, // sub
              // 14.70264904909243, 121.0857019417419
              { lat: 14.70264904909243, lng: 121.0857019417419 }, // sub
              // 14.703267109990044, 121.08515668673486
              { lat: 14.703267109990044, lng: 121.08515668673486 }, // sub
              // 14.703856609276476, 121.084393566844
              { lat: 14.703856609276476, lng: 121.084393566844 }, // sub
              // 14.704300677960802, 121.08370042098943
              { lat: 14.704300677960802, lng: 121.08370042098943 }, // sub
              // 14.704588505020563, 121.08302081404413
              { lat: 14.704588505020563, lng: 121.08302081404413 }, // sub
              // 14.704839954098748, 121.08218124895845
              { lat: 14.704839954098748, lng: 121.08218124895845 }, // sub
              // 14.704943531193043, 121.08126449003429
              { lat: 14.704943531193043, lng: 121.08126449003429 }, // sub
              // 14.705017527604245, 121.08039382539546
              { lat: 14.705017527604245, lng: 121.08039382539546 }, // sub
              // 14.705100039847423, 121.07943478171535
              { lat: 14.705100039847423, lng: 121.07943478171535 }, // sub
              // to me
              { lat: 14.705071490546633, lng: 121.07803713708809 }, // to me
            ],
          },
        ],
      },
      {
        id: 8,
        code: 'MRT7_DONA_CARMEN',
        name: 'Dona Carmen',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_DONA_CARMEN.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/1/1c/Commonwealth_Avenue%2C_Greater_Fairview_17.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Commonwealth_Avenue,_Greater_Fairview_17.jpg">Gdfrdymldo1999</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Located near Dona Carmen Subdivision.',
        // 14.705071490546633, 121.07803713708809
        coordinates: { lat: 14.705071490546633, lng: 121.07803713708809 }, // Dona Carmen Station
        edges: [
          {
            to: 'MRT7_MANGGAHAN',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Dona Carmen to Manggahan is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.705071490546633, lng: 121.07803713708809 }, // from me
              // 14.705100039847423, 121.07943478171535
              { lat: 14.705100039847423, lng: 121.07943478171535 }, // sub
              // 14.705017527604245, 121.08039382539546
              { lat: 14.705017527604245, lng: 121.08039382539546 }, // sub
              // 14.704943531193043, 121.08126449003429
              { lat: 14.704943531193043, lng: 121.08126449003429 }, // sub
              // 14.704839954098748, 121.08218124895845
              { lat: 14.704839954098748, lng: 121.08218124895845 }, // sub
              // 14.704588505020563, 121.08302081404413
              { lat: 14.704588505020563, lng: 121.08302081404413 }, // sub
              // 14.704300677960802, 121.08370042098943
              { lat: 14.704300677960802, lng: 121.08370042098943 }, // sub
              // 14.703856609276476, 121.084393566844
              { lat: 14.703856609276476, lng: 121.084393566844 }, // sub
              // 14.703267109990044, 121.08515668673486
              { lat: 14.703267109990044, lng: 121.08515668673486 }, // sub
              // 14.70264904909243, 121.0857019417419
              { lat: 14.70264904909243, lng: 121.0857019417419 }, // sub
              // 14.701984277516342, 121.08617414404526
              { lat: 14.701984277516342, lng: 121.08617414404526 }, // sub
              // 14.701239519172502, 121.0865567149545
              { lat: 14.701239519172502, lng: 121.0865567149545 }, // sub
              // 14.700405363676369, 121.08691868240773
              { lat: 14.700405363676369, lng: 121.08691868240773 }, // sub
              // 14.700362244006865, 121.08692599900542
              { lat: 14.700362244006865, lng: 121.08692599900542 }, // sub
              // 14.69966100934541, 121.08712430348568
              { lat: 14.69966100934541, lng: 121.08712430348568 }, // sub
              // 14.69888858311386, 121.08725587012695
              { lat: 14.69888858311386, lng: 121.08725587012695 }, // sub
              // to prev
              { lat: 14.697373103254039, lng: 121.08733303190266 }, // to prev
            ],
          },
          {
            to: 'MRT7_REGALADO_AVENUE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 2,
            path: [
              // from me
              { lat: 14.705071490546633, lng: 121.07803713708809 }, // from me
              // 14.705075440553195, 121.07640628890015
              { lat: 14.705075440553195, lng: 121.07640628890015 }, // sub
              // 14.705095707917147, 121.07535849425379
              { lat: 14.705095707917147, lng: 121.07535849425379 }, // sub
              // 14.705190584306429, 121.07455912884335
              { lat: 14.705190584306429, lng: 121.07455912884335 }, // sub
              // 14.705341141226457, 121.07387557338484
              { lat: 14.705341141226457, lng: 121.07387557338484 }, // sub
              // 14.705668710238768, 121.07283183650718
              { lat: 14.705668710238768, lng: 121.07283183650718 }, // sub
              // 14.706323099246795, 121.07093064354667
              { lat: 14.706323099246795, lng: 121.07093064354667 }, // sub
              // 14.70640239556252, 121.0706579601627
              { lat: 14.70640239556252, lng: 121.0706579601627 }, // sub
              // 14.706452323945564, 121.07038582973716
              { lat: 14.706452323945564, lng: 121.07038582973716 }, // sub
              // 14.706467978187522, 121.07012891793897
              { lat: 14.706467978187522, lng: 121.07012891793897 }, // sub
              // to next
              { lat: 14.706433112334865, lng: 121.06785326260419 }, // to next
            ],
          },
        ],
      },
      {
        id: 9,
        code: 'MRT7_REGALADO_AVENUE',
        name: 'Regalado Avenue',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_REGALADO_AVENUE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/8/81/Fairview%2C_Novaliches%2C_Quezon_City_29.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Fairview,_Novaliches,_Quezon_City_29.jpg">Gdfrdymldo1999</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Located near Regalado Avenue.',
        // 14.706433112334865, 121.06785326260419
        coordinates: { lat: 14.706433112334865, lng: 121.06785326260419 }, // Regalado Avenue Station
        edges: [
          {
            to: 'MRT7_DONA_CARMEN',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Regalado Avenue to Dona Carmen is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.706433112334865, lng: 121.06785326260419 }, // to next
              // 14.706467978187522, 121.07012891793897
              { lat: 14.706467978187522, lng: 121.07012891793897 }, // sub
              // 14.706452323945564, 121.07038582973716
              { lat: 14.706452323945564, lng: 121.07038582973716 }, // sub
              // 14.70640239556252, 121.0706579601627
              { lat: 14.70640239556252, lng: 121.0706579601627 }, // sub
              // 14.706323099246795, 121.07093064354667
              { lat: 14.706323099246795, lng: 121.07093064354667 }, // sub
              // 14.705668710238768, 121.07283183650718
              { lat: 14.705668710238768, lng: 121.07283183650718 }, // sub
              // 14.705341141226457, 121.07387557338484
              { lat: 14.705341141226457, lng: 121.07387557338484 }, // sub
              // 14.705190584306429, 121.07455912884335
              { lat: 14.705190584306429, lng: 121.07455912884335 }, // sub
              // 14.705095707917147, 121.07535849425379
              { lat: 14.705095707917147, lng: 121.07535849425379 }, // sub
              // 14.705075440553195, 121.07640628890015
              { lat: 14.705075440553195, lng: 121.07640628890015 }, // sub
              // to prev
              { lat: 14.705071490546633, lng: 121.07803713708809 }, // to prev
            ],
          },
          {
            to: 'MRT7_MINDANAO_AVENUE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 2,
            path: [
              // from me
              { lat: 14.706433112334865, lng: 121.06785326260419 }, // from me
              // 14.706443834284114, 121.06571454224178
              { lat: 14.706443834284114, lng: 121.06571454224178 }, // sub
              // 14.706480961418302, 121.06514109513317
              { lat: 14.706480961418302, lng: 121.06514109513317 }, // sub
              // 14.706561916614096, 121.06476798403742
              { lat: 14.706561916614096, lng: 121.06476798403742 }, // sub
              // 14.70673513948169, 121.06434974810331
              { lat: 14.70673513948169, lng: 121.06434974810331 }, // sub
              // 14.70697534280755, 121.06404856316334
              { lat: 14.70697534280755, lng: 121.06404856316334 }, // sub
              // 14.707498827411413, 121.06355363681926
              { lat: 14.707498827411413, lng: 121.06355363681926 }, // sub
              // 14.70950236291203, 121.06185192966727
              { lat: 14.70950236291203, lng: 121.06185192966727 }, // sub
              // 14.709930919572303, 121.06149417242577
              { lat: 14.709930919572303, lng: 121.06149417242577 }, // sub
              // 14.710362525549376, 121.06127999471963
              { lat: 14.710362525549376, lng: 121.06127999471963 }, // sub
              // 14.7106752981119, 121.0612149529457
              { lat: 14.7106752981119, lng: 121.0612149529457 }, // sub
              // 14.711012164295873, 121.06119934004322
              { lat: 14.711012164295873, lng: 121.06119934004322 }, // sub
              // 14.713623148469793, 121.06119538740916
              { lat: 14.713623148469793, lng: 121.06119538740916 }, // sub
              // 14.720180183702396, 121.0612049229768
              { lat: 14.720180183702396, lng: 121.0612049229768 }, // sub
              // 14.729766352683678, 121.06120909459035
              { lat: 14.729766352683678, lng: 121.06120909459035 }, // sub
              // to next
              { lat: 14.733146592361667, lng: 121.06121583510031 }, // to next
            ],
          },
        ],
      },
      {
        id: 10,
        code: 'MRT7_MINDANAO_AVENUE',
        name: 'Mindanao Avenue',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_MINDANAO_AVENUE.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/a/af/Barangay_North_Fairview%2C_Novaliches%2C_Quezon_City_07.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Barangay_North_Fairview,_Novaliches,_Quezon_City_07.jpg">Gdfrdymldo1999</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Located near Mindanao Avenue.',
        // 14.733146592361667, 121.06121583510031
        coordinates: { lat: 14.733146592361667, lng: 121.06121583510031 }, // Mindanao Avenue Station
        edges: [
          {
            to: 'MRT7_REGALADO_AVENUE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Mindanao Avenue to Regalado Avenue is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.733146592361667, lng: 121.06121583510031 }, // to prev
              // 14.729766352683678, 121.06120909459035
              { lat: 14.729766352683678, lng: 121.06120909459035 }, // sub
              // 14.720180183702396, 121.0612049229768
              { lat: 14.720180183702396, lng: 121.0612049229768 }, // sub
              // 14.713623148469793, 121.06119538740916
              { lat: 14.713623148469793, lng: 121.06119538740916 }, // sub
              // 14.711012164295873, 121.06119934004322
              { lat: 14.711012164295873, lng: 121.06119934004322 }, // sub
              // 14.7106752981119, 121.0612149529457
              { lat: 14.7106752981119, lng: 121.0612149529457 }, // sub
              // 14.710362525549376, 121.06127999471963
              { lat: 14.710362525549376, lng: 121.06127999471963 }, // sub
              // 14.709930919572303, 121.06149417242577
              { lat: 14.709930919572303, lng: 121.06149417242577 }, // sub
              // 14.70950236291203, 121.06185192966727
              { lat: 14.70950236291203, lng: 121.06185192966727 }, // sub
              // 14.707498827411413, 121.06355363681926
              { lat: 14.707498827411413, lng: 121.06355363681926 }, // sub
              // 14.70697534280755, 121.06404856316334
              { lat: 14.70697534280755, lng: 121.06404856316334 }, // sub
              // 14.70673513948169, 121.06434974810331
              { lat: 14.70673513948169, lng: 121.06434974810331 }, // sub
              // 14.706561916614096, 121.06476798403742
              { lat: 14.706561916614096, lng: 121.06476798403742 }, // sub
              // 14.706480961418302, 121.06514109513317
              { lat: 14.706480961418302, lng: 121.06514109513317 }, // sub
              // 14.706443834284114, 121.06571454224178
              { lat: 14.706443834284114, lng: 121.06571454224178 }, // sub
              // to prev
              { lat: 14.706433112334865, lng: 121.06785326260419 }, // to prev
            ],
          },
          {
            to: 'MRT7_QUIRINO_AVENUE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 2,
            path: [
              // from me
              { lat: 14.733146592361667, lng: 121.06121583510031 }, // from me
              // 14.733959030300708, 121.06121520131572
              { lat: 14.733959030300708, lng: 121.06121520131572 }, // sub
              // 14.734312424990298, 121.06129749996963
              { lat: 14.734312424990298, lng: 121.06129749996963 }, // sub
              // 14.734600807724801, 121.0614485698704
              { lat: 14.734600807724801, lng: 121.0614485698704 }, // sub
              // 14.734872358761717, 121.06162896415205
              { lat: 14.734872358761717, lng: 121.06162896415205 }, // sub
              // 14.735082911083014, 121.06186072354247
              { lat: 14.735082911083014, lng: 121.06186072354247 }, // sub
              // 14.735263011436574, 121.06217667689396
              { lat: 14.735263011436574, lng: 121.06217667689396 }, // sub
              // 14.73539093987335, 121.06255540627393
              { lat: 14.73539093987335, lng: 121.06255540627393 }, // sub
              // 14.735413401566118, 121.06296310712865
              { lat: 14.735413401566118, lng: 121.06296310712865 }, // sub
              // 14.735422327858565, 121.06461547005769
              { lat: 14.735422327858565, lng: 121.06461547005769 }, // sub
              // to next
              { lat: 14.73548215570522, lng: 121.0669198046008 }, // to next
            ],
          },
        ],
      },
      {
        id: 11,
        code: 'MRT7_QUIRINO_AVENUE',
        name: 'Quirino Avenue',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_QUIRINO_AVENUE.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Quirino Avenue.',
        // 14.73548215570522, 121.0669198046008
        coordinates: { lat: 14.73548215570522, lng: 121.0669198046008 }, // Quirino Avenue Station
        edges: [
          {
            to: 'MRT7_MINDANAO_AVENUE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Quirino Avenue to Mindanao Avenue is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.73548215570522, lng: 121.0669198046008 }, // from me
              // 14.735422327858565, 121.06461547005769
              { lat: 14.735422327858565, lng: 121.06461547005769 }, // sub
              // 14.735413401566118, 121.06296310712865
              { lat: 14.735413401566118, lng: 121.06296310712865 }, // sub
              // 14.73539093987335, 121.06255540627393
              { lat: 14.73539093987335, lng: 121.06255540627393 }, // sub
              // 14.735263011436574, 121.06217667689396
              { lat: 14.735263011436574, lng: 121.06217667689396 }, // sub
              // 14.735082911083014, 121.06186072354247
              { lat: 14.735082911083014, lng: 121.06186072354247 }, // sub
              // 14.734872358761717, 121.06162896415205
              { lat: 14.734872358761717, lng: 121.06162896415205 }, // sub
              // 14.734600807724801, 121.0614485698704
              { lat: 14.734600807724801, lng: 121.0614485698704 }, // sub
              // 14.734312424990298, 121.06129749996963
              { lat: 14.734312424990298, lng: 121.06129749996963 }, // sub
              // 14.733959030300708, 121.06121520131572
              { lat: 14.733959030300708, lng: 121.06121520131572 }, // sub
              // to prev
              { lat: 14.733146592361667, lng: 121.06121583510031 }, // to prev
            ],
          },
          {
            to: 'MRT7_SACRED_HEARD',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 2,
            path: [
              // from me
              { lat: 14.73548215570522, lng: 121.0669198046008 }, // from me
              // 14.735493696952762, 121.06859184653175
              { lat: 14.735493696952762, lng: 121.06859184653175 }, // sub
              // 14.735527769031332, 121.0691935788417
              { lat: 14.735527769031332, lng: 121.0691935788417 }, // sub
              // 14.735589496725634, 121.06945017279467
              { lat: 14.735589496725634, lng: 121.06945017279467 }, // sub
              // 14.735688018841131, 121.06968582261887
              { lat: 14.735688018841131, lng: 121.06968582261887 }, // sub
              // 14.735830458700399, 121.06991767687546
              { lat: 14.735830458700399, lng: 121.06991767687546 }, // sub
              // 14.736022624328182, 121.0701308749748
              { lat: 14.736022624328182, lng: 121.0701308749748 }, // sub
              // 14.736285788883201, 121.07036918926057
              { lat: 14.736285788883201, lng: 121.07036918926057 }, // sub
              // 14.736685864224468, 121.07071706649461
              { lat: 14.736685864224468, lng: 121.07071706649461 }, // sub
              // 14.737236913877478, 121.07118772164544
              { lat: 14.737236913877478, lng: 121.07118772164544 }, // sub
              // 14.737369400612598, 121.07139073234497
              { lat: 14.737369400612598, lng: 121.07139073234497 }, // sub
              // 14.7374931668917, 121.07159645345841
              { lat: 14.7374931668917, lng: 121.07159645345841 }, // sub
              // 14.73796237995333, 121.07253151885638
              { lat: 14.73796237995333, lng: 121.07253151885638 }, // sub
              // 14.738113999941392, 121.07278731856853
              { lat: 14.738113999941392, lng: 121.07278731856853 }, // sub
              // 14.738423324946401, 121.07318073869793
              { lat: 14.738423324946401, lng: 121.07318073869793 }, // sub
              // 14.738837824593832, 121.07372128755719
              { lat: 14.738837824593832, lng: 121.07372128755719 }, // sub
              // 14.739394730785289, 121.07432624839102
              { lat: 14.739394730785289, lng: 121.07432624839102 }, // sub
              // 14.739579389392576, 121.0745449545124
              { lat: 14.739579389392576, lng: 121.0745449545124 }, // sub
              // 14.739850477213512, 121.07472798914782
              { lat: 14.739850477213512, lng: 121.07472798914782 }, // sub
              // 14.74101959458926, 121.07557003773573
              { lat: 14.74101959458926, lng: 121.07557003773573 }, // sub
              // 14.741158270380705, 121.07574579852944
              { lat: 14.741158270380705, lng: 121.07574579852944 }, // sub
              // 14.74132059792852, 121.07599582968726
              { lat: 14.74132059792852, lng: 121.07599582968726 }, // sub
              // 14.741504830846342, 121.07649957612402
              { lat: 14.741504830846342, lng: 121.07649957612402 }, // sub
              // 14.741618669282103, 121.07680500265366
              { lat: 14.741618669282103, lng: 121.07680500265366 }, // sub
              // 14.74172158915124, 121.07700137975341
              { lat: 14.74172158915124, lng: 121.07700137975341 }, // sub
              // 14.741874275595361, 121.07723488526283
              { lat: 14.741874275595361, lng: 121.07723488526283 }, // sub
              // 14.742056778770925, 121.07745247606988
              { lat: 14.742056778770925, lng: 121.07745247606988 }, // sub
              // 14.742248131572286, 121.07763938420234
              { lat: 14.742248131572286, lng: 121.07763938420234 }, // sub
              // 14.742512152260552, 121.07777625930025
              { lat: 14.742512152260552, lng: 121.07777625930025 }, // sub
              // 14.742918261422886, 121.07786591244815
              { lat: 14.742918261422886, lng: 121.07786591244815 }, // sub
              // 14.743247211268228, 121.07788591452908
              { lat: 14.743247211268228, lng: 121.07788591452908 }, // sub
              // 14.74386954776307, 121.07787636125386
              { lat: 14.74386954776307, lng: 121.07787636125386 }, // sub
              // 14.74435774040344, 121.07785634664175
              { lat: 14.74435774040344, lng: 121.07785634664175 }, // sub
              // 14.744916927985718, 121.0779631029733
              { lat: 14.744916927985718, lng: 121.0779631029733 }, // sub
              // 14.74531871469466, 121.07818695894798
              { lat: 14.74531871469466, lng: 121.07818695894798 }, // sub
              // 14.745537644127985, 121.07844682966537
              { lat: 14.745537644127985, lng: 121.07844682966537 }, // sub
              // 14.745690894791593, 121.07878144630017
              { lat: 14.745690894791593, lng: 121.07878144630017 }, // sub
              // 14.74593671782065, 121.07941384648322
              { lat: 14.74593671782065, lng: 121.07941384648322 }, // sub
              // 14.746128059323956, 121.08013290816342
              { lat: 14.746128059323956, lng: 121.08013290816342 }, // sub
              // 14.746347385845775, 121.0805666704335
              { lat: 14.746347385845775, lng: 121.0805666704335 }, // sub
              // 14.746628540153084, 121.0809235215049
              { lat: 14.746628540153084, lng: 121.0809235215049 }, // sub
              // 14.747451768991345, 121.0817063417168
              { lat: 14.747451768991345, lng: 121.0817063417168 }, // sub
              // 14.748333934592933, 121.08250115510188
              { lat: 14.748333934592933, lng: 121.08250115510188 }, // sub
              // 14.748809891239889, 121.08284084260714
              { lat: 14.748809891239889, lng: 121.08284084260714 }, // sub
              // 14.7496182737222, 121.08335134495084
              { lat: 14.7496182737222, lng: 121.08335134495084 }, // sub
              // to next
              { lat: 14.750121113741084, lng: 121.08370681086429 }, // to next
            ],
          },
        ],
      },
      {
        id: 12,
        code: 'MRT7_SACRED_HEARD',
        name: 'Sacred Heart',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_SACRED_HEARD.jpg',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/0/08/Construction_of_Sacred_Heart_stations_04.jpg',
        imageAttributionHtml:
          '<a href="https://commons.wikimedia.org/wiki/File:Construction_of_Sacred_Heart_stations_04.jpg">Gdfrdymldo1999</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons',
        description: 'Located near Sacred Heart.',
        // 14.750121113741084, 121.08370681086429
        coordinates: { lat: 14.750121113741084, lng: 121.08370681086429 }, // Sacred Heart Station
        edges: [
          {
            to: 'MRT7_QUIRINO_AVENUE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Sacred Heart to Quirino Avenue is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.750121113741084, lng: 121.08370681086429 }, // to prev
              // 14.7496182737222, 121.08335134495084
              { lat: 14.7496182737222, lng: 121.08335134495084 }, // sub
              // 14.748809891239889, 121.08284084260714
              { lat: 14.748809891239889, lng: 121.08284084260714 }, // sub
              // 14.748333934592933, 121.08250115510188
              { lat: 14.748333934592933, lng: 121.08250115510188 }, // sub
              // 14.747451768991345, 121.0817063417168
              { lat: 14.747451768991345, lng: 121.0817063417168 }, // sub
              // 14.746628540153084, 121.0809235215049
              { lat: 14.746628540153084, lng: 121.0809235215049 }, // sub
              // 14.746347385845775, 121.0805666704335
              { lat: 14.746347385845775, lng: 121.0805666704335 }, // sub
              // 14.746128059323956, 121.08013290816342
              { lat: 14.746128059323956, lng: 121.08013290816342 }, // sub
              // 14.74593671782065, 121.07941384648322
              { lat: 14.74593671782065, lng: 121.07941384648322 }, // sub
              // 14.745690894791593, 121.07878144630017
              { lat: 14.745690894791593, lng: 121.07878144630017 }, // sub
              // 14.745537644127985, 121.07844682966537
              { lat: 14.745537644127985, lng: 121.07844682966537 }, // sub
              // 14.74531871469466, 121.07818695894798
              { lat: 14.74531871469466, lng: 121.07818695894798 }, // sub
              // 14.744916927985718, 121.0779631029733
              { lat: 14.744916927985718, lng: 121.0779631029733 }, // sub
              // 14.74435774040344, 121.07785634664175
              { lat: 14.74435774040344, lng: 121.07785634664175 }, // sub
              // 14.74386954776307, 121.07787636125386
              { lat: 14.74386954776307, lng: 121.07787636125386 }, // sub
              // 14.743247211268228, 121.07788591452908
              { lat: 14.743247211268228, lng: 121.07788591452908 }, // sub
              // 14.742918261422886, 121.07786591244815
              { lat: 14.742918261422886, lng: 121.07786591244815 }, // sub
              // 14.742512152260552, 121.07777625930025
              { lat: 14.742512152260552, lng: 121.07777625930025 }, // sub
              // 14.742248131572286, 121.07763938420234
              { lat: 14.742248131572286, lng: 121.07763938420234 }, // sub
              // 14.742056778770925, 121.07745247606988
              { lat: 14.742056778770925, lng: 121.07745247606988 }, // sub
              // 14.741874275595361, 121.07723488526283
              { lat: 14.741874275595361, lng: 121.07723488526283 }, // sub
              // 14.74172158915124, 121.07700137975341
              { lat: 14.74172158915124, lng: 121.07700137975341 }, // sub
              // 14.741618669282103, 121.07680500265366
              { lat: 14.741618669282103, lng: 121.07680500265366 }, // sub
              // 14.741504830846342, 121.07649957612402
              { lat: 14.741504830846342, lng: 121.07649957612402 }, // sub
              // 14.74132059792852, 121.07599582968726
              { lat: 14.74132059792852, lng: 121.07599582968726 }, // sub
              // 14.741158270380705, 121.07574579852944
              { lat: 14.741158270380705, lng: 121.07574579852944 }, // sub
              // 14.74101959458926, 121.07557003773573
              { lat: 14.74101959458926, lng: 121.07557003773573 }, // sub
              // 14.739850477213512, 121.07472798914782
              { lat: 14.739850477213512, lng: 121.07472798914782 }, // sub
              // 14.739579389392576, 121.0745449545124
              { lat: 14.739579389392576, lng: 121.0745449545124 }, // sub
              // 14.739394730785289, 121.07432624839102
              { lat: 14.739394730785289, lng: 121.07432624839102 }, // sub
              // 14.738837824593832, 121.07372128755719
              { lat: 14.738837824593832, lng: 121.07372128755719 }, // sub
              // 14.738423324946401, 121.07318073869793
              { lat: 14.738423324946401, lng: 121.07318073869793 }, // sub
              // 14.738113999941392, 121.07278731856853
              { lat: 14.738113999941392, lng: 121.07278731856853 }, // sub
              // 14.73796237995333, 121.07253151885638
              { lat: 14.73796237995333, lng: 121.07253151885638 }, // sub
              // 14.7374931668917, 121.07159645345841
              { lat: 14.7374931668917, lng: 121.07159645345841 }, // sub
              // 14.737369400612598, 121.07139073234497
              { lat: 14.737369400612598, lng: 121.07139073234497 }, // sub
              // 14.737236913877478, 121.07118772164544
              { lat: 14.737236913877478, lng: 121.07118772164544 }, // sub
              // 14.736685864224468, 121.07071706649461
              { lat: 14.736685864224468, lng: 121.07071706649461 }, // sub
              // 14.736285788883201, 121.07036918926057
              { lat: 14.736285788883201, lng: 121.07036918926057 }, // sub
              // 14.736022624328182, 121.0701308749748
              { lat: 14.736022624328182, lng: 121.0701308749748 }, // sub
              // 14.735830458700399, 121.06991767687546
              { lat: 14.735830458700399, lng: 121.06991767687546 }, // sub
              // 14.735688018841131, 121.06968582261887
              { lat: 14.735688018841131, lng: 121.06968582261887 }, // sub
              // 14.735589496725634, 121.06945017279467
              { lat: 14.735589496725634, lng: 121.06945017279467 }, // sub
              // 14.735527769031332, 121.0691935788417
              { lat: 14.735527769031332, lng: 121.0691935788417 }, // sub
              // 14.735493696952762, 121.06859184653175
              { lat: 14.735493696952762, lng: 121.06859184653175 }, // sub
              // to prev
              { lat: 14.73548215570522, lng: 121.0669198046008 }, // to prev
            ],
          },
          {
            to: 'MRT7_TALA',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 2,
            path: [
              // from me
              { lat: 14.750121113741084, lng: 121.08370681086429 }, // from me
              // 14.750898327570354, 121.0842356722912
              { lat: 14.750898327570354, lng: 121.0842356722912 }, // sub
              // 14.751389011965268, 121.08455605203187
              { lat: 14.751389011965268, lng: 121.08455605203187 }, // sub
              // 14.751709013251338, 121.08470658609845
              { lat: 14.751709013251338, lng: 121.08470658609845 }, // sub
              // 14.751972917275872, 121.08476210266154
              { lat: 14.751972917275872, lng: 121.08476210266154 }, // sub
              // 14.752392255678211, 121.08481236918418
              { lat: 14.752392255678211, lng: 121.08481236918418 }, // sub
              // 14.755100804541861, 121.08496864940409
              { lat: 14.755100804541861, lng: 121.08496864940409 }, // sub
              // 14.755619530672702, 121.08504263097058
              { lat: 14.755619530672702, lng: 121.08504263097058 }, // sub
              // 14.756092772727719, 121.08514584981171
              { lat: 14.756092772727719, lng: 121.08514584981171 }, // sub
              // 14.758588112441783, 121.08586405686393
              { lat: 14.758588112441783, lng: 121.08586405686393 }, // sub
              // 14.75998785938684, 121.08638193158977
              { lat: 14.75998785938684, lng: 121.08638193158977 }, // sub
              // 14.760366879065215, 121.086543301999
              { lat: 14.760366879065215, lng: 121.086543301999 }, // sub
              // 14.760745184914075, 121.08661234667368
              { lat: 14.760745184914075, lng: 121.08661234667368 }, // sub
              // 14.763047404790283, 121.08657685126674
              { lat: 14.763047404790283, lng: 121.08657685126674 }, // sub
              // 14.763398102658085, 121.08652560936876
              { lat: 14.763398102658085, lng: 121.08652560936876 }, // sub
              // 14.763838955503305, 121.08631001308667
              { lat: 14.763838955503305, lng: 121.08631001308667 }, // sub
              // 14.767007780158234, 121.08433635015254
              { lat: 14.767007780158234, lng: 121.08433635015254 }, // sub
              // 14.76732947915246, 121.08409109852856
              { lat: 14.76732947915246, lng: 121.08409109852856 }, // sub
              // 14.76744491777853, 121.08387565670148
              { lat: 14.76744491777853, lng: 121.08387565670148 }, // sub
              // 14.76751709986316, 121.08366827967335
              { lat: 14.76751709986316, lng: 121.08366827967335 }, // sub
              // 14.768033557783715, 121.08172755606729
              { lat: 14.768033557783715, lng: 121.08172755606729 }, // sub
              // 14.768125127456926, 121.08145144980311
              { lat: 14.768125127456926, lng: 121.08145144980311 }, // sub
              // 14.768288597272237, 121.08122558351025
              { lat: 14.768288597272237, lng: 121.08122558351025 }, // sub
              // 14.768480481579621, 121.08099938126516
              { lat: 14.768480481579621, lng: 121.08099938126516 }, // sub
              // to next
              { lat: 14.770186688403049, lng: 121.07925371926483 }, // to next
            ],
          },
        ],
      },
      {
        id: 13,
        code: 'MRT7_TALA',
        name: 'Tala',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_TALA.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Tala.',
        // 14.770186688403049, 121.07925371926483
        coordinates: { lat: 14.770186688403049, lng: 121.07925371926483 }, // Tala Station
        edges: [
          {
            to: 'MRT7_SACRED_HEARD',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from Tala to Sacred Heart is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.770186688403049, lng: 121.07925371926483 }, // from me
              // 14.768480481579621, 121.08099938126516
              { lat: 14.768480481579621, lng: 121.08099938126516 }, // sub
              // 14.768288597272237, 121.08122558351025
              { lat: 14.768288597272237, lng: 121.08122558351025 }, // sub
              // 14.768125127456926, 121.08145144980311
              { lat: 14.768125127456926, lng: 121.08145144980311 }, // sub
              // 14.768033557783715, 121.08172755606729
              { lat: 14.768033557783715, lng: 121.08172755606729 }, // sub
              // 14.76751709986316, 121.08366827967335
              { lat: 14.76751709986316, lng: 121.08366827967335 }, // sub
              // 14.76744491777853, 121.08387565670148
              { lat: 14.76744491777853, lng: 121.08387565670148 }, // sub
              // 14.76732947915246, 121.08409109852856
              { lat: 14.76732947915246, lng: 121.08409109852856 }, // sub
              // 14.767007780158234, 121.08433635015254
              { lat: 14.767007780158234, lng: 121.08433635015254 }, // sub
              // 14.763838955503305, 121.08631001308667
              { lat: 14.763838955503305, lng: 121.08631001308667 }, // sub
              // 14.763398102658085, 121.08652560936876
              { lat: 14.763398102658085, lng: 121.08652560936876 }, // sub
              // 14.763047404790283, 121.08657685126674
              { lat: 14.763047404790283, lng: 121.08657685126674 }, // sub
              // 14.760745184914075, 121.08661234667368
              { lat: 14.760745184914075, lng: 121.08661234667368 }, // sub
              // 14.760366879065215, 121.086543301999
              { lat: 14.760366879065215, lng: 121.086543301999 }, // sub
              // 14.75998785938684, 121.08638193158977
              { lat: 14.75998785938684, lng: 121.08638193158977 }, // sub
              // 14.758588112441783, 121.08586405686393
              { lat: 14.758588112441783, lng: 121.08586405686393 }, // sub
              // 14.756092772727719, 121.08514584981171
              { lat: 14.756092772727719, lng: 121.08514584981171 }, // sub
              // 14.755619530672702, 121.08504263097058
              { lat: 14.755619530672702, lng: 121.08504263097058 }, // sub
              // 14.755100804541861, 121.08496864940409
              { lat: 14.755100804541861, lng: 121.08496864940409 }, // sub
              // 14.752392255678211, 121.08481236918418
              { lat: 14.752392255678211, lng: 121.08481236918418 }, // sub
              // 14.751972917275872, 121.08476210266154
              { lat: 14.751972917275872, lng: 121.08476210266154 }, // sub
              // 14.751709013251338, 121.08470658609845
              { lat: 14.751709013251338, lng: 121.08470658609845 }, // sub
              // 14.751389011965268, 121.08455605203187
              { lat: 14.751389011965268, lng: 121.08455605203187 }, // sub
              // 14.750898327570354, 121.0842356722912
              { lat: 14.750898327570354, lng: 121.0842356722912 }, // sub
              // to prev
              { lat: 14.750121113741084, lng: 121.08370681086429 }, // to prev
            ],
          },
          {
            to: 'MRT7_SAN_JOSE_DEL_MONTE',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 2,
            path: [
              // from me
              { lat: 14.770186688403049, lng: 121.07925371926483 }, // from me
              // 14.770824124140823, 121.07855186813826
              { lat: 14.770824124140823, lng: 121.07855186813826 }, // sub
              // 14.771021659330632, 121.07830431829288
              { lat: 14.771021659330632, lng: 121.07830431829288 }, // sub
              // 14.771186245964808, 121.07801136032687
              { lat: 14.771186245964808, lng: 121.07801136032687 }, // sub
              // 14.771301342399287, 121.0779073041499
              { lat: 14.771301342399287, lng: 121.0779073041499 }, // sub
              // 14.771605070665062, 121.07782046272958
              { lat: 14.771605070665062, lng: 121.07782046272958 }, // sub
              // 14.772082927628475, 121.07787669275005
              { lat: 14.772082927628475, lng: 121.07787669275005 }, // sub
              // 14.77242698847336, 121.0779267876126
              { lat: 14.77242698847336, lng: 121.0779267876126 }, // sub
              // 14.772654378848557, 121.07788263131677
              { lat: 14.772654378848557, lng: 121.07788263131677 }, // sub
              // 14.773352207919011, 121.07751340961923
              { lat: 14.773352207919011, lng: 121.07751340961923 }, // sub
              // 14.773761472837016, 121.07735956593051
              { lat: 14.773761472837016, lng: 121.07735956593051 }, // sub
              // 14.774013251846824, 121.07734142914327
              { lat: 14.774013251846824, lng: 121.07734142914327 }, // sub
              // 14.774216672057799, 121.07737675428298
              { lat: 14.774216672057799, lng: 121.07737675428298 }, // sub
              // 14.774666258686, 121.07746631353456
              { lat: 14.774666258686, lng: 121.07746631353456 }, // sub
              // 14.774898034926009, 121.07746469615029
              { lat: 14.774898034926009, lng: 121.07746469615029 }, // sub
              // 14.775114326776682, 121.07731577358106
              { lat: 14.775114326776682, lng: 121.07731577358106 }, // sub
              // 14.775281851510021, 121.07705984846756
              { lat: 14.775281851510021, lng: 121.07705984846756 }, // sub
              // 14.775589421391775, 121.07634666177601
              { lat: 14.775589421391775, lng: 121.07634666177601 }, // sub
              // 14.775875720764999, 121.07601659152488
              { lat: 14.775875720764999, lng: 121.07601659152488 }, // sub
              // 14.777363730818404, 121.07505594205702
              { lat: 14.777363730818404, lng: 121.07505594205702 }, // sub
              // 14.777891975982179, 121.07462398776369
              { lat: 14.777891975982179, lng: 121.07462398776369 }, // sub
              // 14.778127669287437, 121.07450638912002
              { lat: 14.778127669287437, lng: 121.07450638912002 }, // sub
              // 14.77940695292953, 121.0740778833544
              { lat: 14.77940695292953, lng: 121.0740778833544 }, // sub
              // 14.779805081390784, 121.07401744431377
              { lat: 14.779805081390784, lng: 121.07401744431377 }, // sub
              // 14.780136365021711, 121.07400780717371
              { lat: 14.780136365021711, lng: 121.07400780717371 }, // sub
              // 14.781495413397206, 121.07421106523485
              { lat: 14.781495413397206, lng: 121.07421106523485 }, // sub
              // 14.782514166880652, 121.07450392456586
              { lat: 14.782514166880652, lng: 121.07450392456586 }, // sub
              // 14.782968765424137, 121.07469506986916
              { lat: 14.782968765424137, lng: 121.07469506986916 }, // sub
              // 14.783207771801163, 121.07466252719186
              { lat: 14.783207771801163, lng: 121.07466252719186 }, // sub
              // 14.78401351974105, 121.07479088109784
              { lat: 14.78401351974105, lng: 121.07479088109784 }, // sub
              // to next
              { lat: 14.784252906943964, lng: 121.07481468578848 }, // to next
            ],
          },
        ],
      },
      {
        id: 14,
        code: 'MRT7_SAN_JOSE_DEL_MONTE',
        name: 'San Jose Del Monte',
        isOperational: false,
        imageLocal: 'assets/images/lines/mrt7/MRT7_SAN_JOSE_DEL_MONTE.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near San Jose Del Monte.',
        // 14.784252906943964, 121.07481468578848
        coordinates: { lat: 14.784252906943964, lng: 121.07481468578848 }, // San Jose Del Monte Station
        edges: [
          {
            to: 'MRT7_TALA',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            // travel duration from San Jose Del Monte to Tala is 2 minutes
            duration: 2,
            path: [
              // from me
              { lat: 14.784252906943964, lng: 121.07481468578848 }, // from me
              // 14.78401351974105, 121.07479088109784
              { lat: 14.78401351974105, lng: 121.07479088109784 }, // sub
              // 14.783207771801163, 121.07466252719186
              { lat: 14.783207771801163, lng: 121.07466252719186 }, // sub
              // 14.782968765424137, 121.07469506986916
              { lat: 14.782968765424137, lng: 121.07469506986916 }, // sub
              // 14.782514166880652, 121.07450392456586
              { lat: 14.782514166880652, lng: 121.07450392456586 }, // sub
              // 14.781495413397206, 121.07421106523485
              { lat: 14.781495413397206, lng: 121.07421106523485 }, // sub
              // 14.780136365021711, 121.07400780717371
              { lat: 14.780136365021711, lng: 121.07400780717371 }, // sub
              // 14.779805081390784, 121.07401744431377
              { lat: 14.779805081390784, lng: 121.07401744431377 }, // sub
              // 14.77940695292953, 121.0740778833544
              { lat: 14.77940695292953, lng: 121.0740778833544 }, // sub
              // 14.778127669287437, 121.07450638912002
              { lat: 14.778127669287437, lng: 121.07450638912002 }, // sub
              // 14.777891975982179, 121.07462398776369
              { lat: 14.777891975982179, lng: 121.07462398776369 }, // sub
              // 14.777363730818404, 121.07505594205702
              { lat: 14.777363730818404, lng: 121.07505594205702 }, // sub
              // 14.775875720764999, 121.07601659152488
              { lat: 14.775875720764999, lng: 121.07601659152488 }, // sub
              // 14.775589421391775, 121.07634666177601
              { lat: 14.775589421391775, lng: 121.07634666177601 }, // sub
              // 14.775281851510021, 121.07705984846756
              { lat: 14.775281851510021, lng: 121.07705984846756 }, // sub
              // 14.775114326776682, 121.07731577358106
              { lat: 14.775114326776682, lng: 121.07731577358106 }, // sub
              // 14.774898034926009, 121.07746469615029
              { lat: 14.774898034926009, lng: 121.07746469615029 }, // sub
              // 14.774666258686, 121.07746631353456
              { lat: 14.774666258686, lng: 121.07746631353456 }, // sub
              // 14.774216672057799, 121.07737675428298
              { lat: 14.774216672057799, lng: 121.07737675428298 }, // sub
              // 14.774013251846824, 121.07734142914327
              { lat: 14.774013251846824, lng: 121.07734142914327 }, // sub
              // 14.773761472837016, 121.07735956593051
              { lat: 14.773761472837016, lng: 121.07735956593051 }, // sub
              // 14.773352207919011, 121.07751340961923
              { lat: 14.773352207919011, lng: 121.07751340961923 }, // sub
              // 14.772654378848557, 121.07788263131677
              { lat: 14.772654378848557, lng: 121.07788263131677 }, // sub
              // 14.77242698847336, 121.0779267876126
              { lat: 14.77242698847336, lng: 121.0779267876126 }, // sub
              // 14.772082927628475, 121.07787669275005
              { lat: 14.772082927628475, lng: 121.07787669275005 }, // sub
              // 14.771605070665062, 121.07782046272958
              { lat: 14.771605070665062, lng: 121.07782046272958 }, // sub
              // 14.771301342399287, 121.0779073041499
              { lat: 14.771301342399287, lng: 121.0779073041499 }, // sub
              // 14.771186245964808, 121.07801136032687
              { lat: 14.771186245964808, lng: 121.07801136032687 }, // sub
              // 14.771021659330632, 121.07830431829288
              { lat: 14.771021659330632, lng: 121.07830431829288 }, // sub
              // 14.770824124140823, 121.07855186813826
              { lat: 14.770824124140823, lng: 121.07855186813826 }, // sub
              // to prev
              { lat: 14.770186688403049, lng: 121.07925371926483 }, // to prev
            ],
          },
        ],
      },
    ],
  },
  // PASIG RIVER FERRY SERVICE
  {
    name: 'Pasig River Ferry Service',
    code: 'PASIGFERRY',
    color: 'teal',
    bgColor: 'teal',
    textColor: 'white',
    stationActiveIcon: 'assets/icons/pasigferry/station-active-pasigferry.png',
    stationInactiveIcon:
      'assets/icons/pasigferry/station-inactive-pasigferry.png',
    stationActiveIcon_Min:
      'assets/icons/pasigferry/station-active-min-pasigferry.png',
    stationInactiveIcon_Min:
      'assets/icons/pasigferry/station-inactive-min-pasigferry.png',
    stations: [
      {
        id: 1,
        code: 'PASIGFERRY_PLAZA_MEXICO',
        name: 'Plaza Mexico',
        isOperational: false,
        imageLocal:
          'assets/images/lines/pasigferry/PASIGFERRY_PLAZA_MEXICO.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Plaza Mexico.',
        // 14.594781189618825, 120.97517159755581
        coordinates: { lat: 14.594781189618825, lng: 120.97517159755581 }, // Plaza Mexico Station
        edges: [
          {
            to: 'PASIGFERRY_ESCOLTA',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.594781189618825, lng: 120.97517159755581 }, // from me
              // 14.595069338169784, 120.97541375035388
              { lat: 14.595069338169784, lng: 120.97541375035388 }, // sub
              // 14.595351104098537, 120.97579934592726
              { lat: 14.595351104098537, lng: 120.97579934592726 }, // sub
              // 14.595971587447908, 120.97730487119681
              { lat: 14.595971587447908, lng: 120.97730487119681 }, // sub
              // 14.596195558180556, 120.97751905731623
              { lat: 14.596195558180556, lng: 120.97751905731623 }, // sub
              // to escolta
              { lat: 14.596466929921698, lng: 120.97753604459676 }, // to escolta
            ],
          },
        ],
      },
      {
        id: 2,
        code: 'PASIGFERRY_ESCOLTA',
        name: 'Escolta',
        isOperational: true,
        imageLocal: 'assets/images/lines/pasigferry/PASIGFERRY_ESCOLTA.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Escolta.',
        // 14.596466929921698, 120.97753604459676
        coordinates: { lat: 14.596466929921698, lng: 120.97753604459676 }, // Escolta Station
        edges: [
          {
            // reverse direction
            from: 'PASIGFERRY_ESCOLTA',
            to: 'PASIGFERRY_PLAZA_MEXICO',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.596466929921698, lng: 120.97753604459676 }, // from me
              // 14.596195558180556, 120.97751905731623
              { lat: 14.596195558180556, lng: 120.97751905731623 }, // sub
              // 14.595971587447908, 120.97730487119681
              { lat: 14.595971587447908, lng: 120.97730487119681 }, // sub
              // 14.595351104098537, 120.97579934592726
              { lat: 14.595351104098537, lng: 120.97579934592726 }, // sub
              // 14.595069338169784, 120.97541375035388
              { lat: 14.595069338169784, lng: 120.97541375035388 }, // sub
              // to plaza mexico
              { lat: 14.594781189618825, lng: 120.97517159755581 }, // to plaza mexico
            ],
          },
          {
            to: 'PASIGFERRY_LAWTON',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.596466929921698, lng: 120.97753604459676 }, // from me
              // 14.596263562716265, 120.97773880011486
              { lat: 14.596263562716265, lng: 120.97773880011486 }, // sub
              // 14.596240550425716, 120.97804397242679
              { lat: 14.596240550425716, lng: 120.97804397242679 }, // sub
              // 14.596832291367269, 120.9797653038039
              { lat: 14.596832291367269, lng: 120.9797653038039 }, // sub
              // 14.596241595697405, 120.98139289953838
              { lat: 14.596241595697405, lng: 120.98139289953838 }, // sub
              // 14.595916272103356, 120.98145317838325
              { lat: 14.595916272103356, lng: 120.98145317838325 }, // sub
              // to lawton
              { lat: 14.59571308002594, lng: 120.98137420497147 }, // to lawton
            ],
          },
        ],
      },
      {
        id: 3,
        code: 'PASIGFERRY_LAWTON',
        name: 'Lawton',
        isOperational: true,
        imageLocal: 'assets/images/lines/pasigferry/PASIGFERRY_LAWTON.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Lawton.',
        // 14.59571308002594, 120.98137420497147
        coordinates: { lat: 14.59571308002594, lng: 120.98137420497147 }, // Lawton Station
        edges: [
          {
            from: 'PASIGFERRY_LAWTON',
            to: 'ESCOLTA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.59571308002594, lng: 120.98137420497147 }, // from me
              // 14.595916272103356, 120.98145317838325
              { lat: 14.595916272103356, lng: 120.98145317838325 }, // sub
              // 14.596241595697405, 120.98139289953838
              { lat: 14.596241595697405, lng: 120.98139289953838 }, // sub
              // 14.596832291367269, 120.9797653038039
              { lat: 14.596832291367269, lng: 120.9797653038039 }, // sub
              // 14.596240550425716, 120.97804397242679
              { lat: 14.596240550425716, lng: 120.97804397242679 }, // sub
              // 14.596263562716265, 120.97773880011486
              { lat: 14.596263562716265, lng: 120.97773880011486 }, // sub
              // to escolta
              { lat: 14.596466929921698, lng: 120.97753604459676 }, // to escolta
            ],
          },
          {
            to: 'PASIGFERRY_QUINTA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.59571308002594, lng: 120.98137420497147 }, // from me
              // to quinta
              { lat: 14.595913181678819, lng: 120.98217563117429 }, // to
            ],
          },
        ],
      },
      {
        id: 4,
        code: 'PASIGFERRY_QUINTA',
        name: 'Quinta',
        isOperational: true,
        imageLocal: 'assets/images/lines/pasigferry/PASIGFERRY_QUINTA.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Quinta.',
        // 14.595913181678819, 120.98217563117429
        coordinates: { lat: 14.595913181678819, lng: 120.98217563117429 }, // Quinta Station
        edges: [
          {
            from: 'PASIGFERRY_QUINTA',
            to: 'PASIGFERRY_LAWTON',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.595913181678819, lng: 120.98217563117429 }, // from me
              // 14.59571308002594, 120.98137420497147
              { lat: 14.59571308002594, lng: 120.98137420497147 }, // to lawton
            ],
          },
          {
            to: 'PASIGFERRY_PUP',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.595913181678819, lng: 120.98217563117429 }, // from me
              // 14.595713955773533, 120.98204304419833
              { lat: 14.595713955773533, lng: 120.98204304419833 }, // sub
              // 14.593040928818585, 120.98399342800205
              { lat: 14.593040928818585, lng: 120.98399342800205 }, // sub
              // 14.591792998179777, 120.98559302862398
              { lat: 14.591792998179777, lng: 120.98559302862398 }, // sub
              // 14.591402940662805, 120.9879348893887
              { lat: 14.591402940662805, lng: 120.9879348893887 }, // sub
              // 14.591252234340969, 120.9915321132713
              { lat: 14.591252234340969, lng: 120.9915321132713 }, // sub
              // 14.591554738030922, 120.9932459680993
              { lat: 14.591554738030922, lng: 120.9932459680993 }, // sub
              // 14.592626582465774, 120.99444273646183
              { lat: 14.592626582465774, lng: 120.99444273646183 }, // sub
              // 14.596415420783554, 120.99754152307085
              { lat: 14.596415420783554, lng: 120.99754152307085 }, // sub
              // 14.596723816990613, 120.99886532392588
              { lat: 14.596723816990613, lng: 120.99886532392588 }, // sub
              // 14.595868997052971, 121.00127335705193
              { lat: 14.595868997052971, lng: 121.00127335705193 }, // sub
              // 14.596557408835372, 121.00296060117614
              { lat: 14.596557408835372, lng: 121.00296060117614 }, // sub
              // 14.5971980848545, 121.00552715568965
              { lat: 14.5971980848545, lng: 121.00552715568965 }, // sub
              // 14.596063327425624, 121.00959793474337
              { lat: 14.596063327425624, lng: 121.00959793474337 }, // sub
              // 14.59597236055152, 121.01038913497968
              { lat: 14.59597236055152, lng: 121.01038913497968 }, // sub
              // to pup
              { lat: 14.596074726447794, lng: 121.01074815437192 }, // to pup
            ],
          },
        ],
      },
      // PUP
      {
        id: 5,
        code: 'PASIGFERRY_PUP',
        name: 'PUP',
        isOperational: true,
        imageLocal: 'assets/images/lines/pasigferry/PASIGFERRY_PUP.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near PUP.',
        // 14.596074726447794, 121.01074815437192
        coordinates: { lat: 14.596074726447794, lng: 121.01074815437192 }, // PUP Station
        edges: [
          {
            // reverse direction
            from: 'PASIGFERRY_PUP',
            to: 'PASIGFERRY_QUINTA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.596074726447794, lng: 121.01074815437192 }, // from me
              // 14.59597236055152, 121.01038913497968
              { lat: 14.59597236055152, lng: 121.01038913497968 }, // sub
              // 14.596063327425624, 121.00959793474337
              { lat: 14.596063327425624, lng: 121.00959793474337 }, // sub
              // 14.5971980848545, 121.00552715568965
              { lat: 14.5971980848545, lng: 121.00552715568965 }, // sub
              // 14.596557408835372, 121.00296060117614
              { lat: 14.596557408835372, lng: 121.00296060117614 }, // sub
              // 14.595868997052971, 121.00127335705193
              { lat: 14.595868997052971, lng: 121.00127335705193 }, // sub
              // 14.596723816990613, 120.99886532392588
              { lat: 14.596723816990613, lng: 120.99886532392588 }, // sub
              // 14.596415420783554, 120.99754152307085
              { lat: 14.596415420783554, lng: 120.99754152307085 }, // sub
              // 14.592626582465774, 120.99444273646183
              { lat: 14.592626582465774, lng: 120.99444273646183 }, // sub
              // 14.591554738030922, 120.9932459680993
              { lat: 14.591554738030922, lng: 120.9932459680993 }, // sub
              // 14.591252234340969, 120.9915321132713
              { lat: 14.591252234340969, lng: 120.9915321132713 }, // sub
              // 14.591402940662805, 120.9879348893887
              { lat: 14.591402940662805, lng: 120.9879348893887 }, // sub
              // 14.591792998179777, 120.98559302862398
              { lat: 14.591792998179777, lng: 120.98559302862398 }, // sub
              // 14.593040928818585, 120.98399342800205
              { lat: 14.593040928818585, lng: 120.98399342800205 }, // sub
              // 14.595713955773533, 120.98204304419833
              { lat: 14.595713955773533, lng: 120.98204304419833 }, // sub
              // to quinta
              { lat: 14.595913181678819, lng: 120.98217563117429 }, // to quinta
            ],
          },
          {
            to: 'PASIGFERRY_STA_ANA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.596074726447794, lng: 121.01074815437192 }, // from me
              // 14.595522012866592, 121.01078452481147
              { lat: 14.595522012866592, lng: 121.01078452481147 }, // sub
              // 14.593112201495456, 121.01530413431585
              { lat: 14.593112201495456, lng: 121.01530413431585 }, // sub
              // 14.591895457048361, 121.01613147914685
              { lat: 14.591895457048361, lng: 121.01613147914685 }, // sub
              // 14.588240633149725, 121.01109862319068
              { lat: 14.588240633149725, lng: 121.01109862319068 }, // sub
              // 14.587677638187127, 121.00827555556033
              { lat: 14.587677638187127, lng: 121.00827555556033 }, // sub
              // 14.585651380777568, 121.00694816028975
              { lat: 14.585651380777568, lng: 121.00694816028975 }, // sub
              // 14.582972574771944, 121.00773954951393
              { lat: 14.582972574771944, lng: 121.00773954951393 }, // sub
              // 14.581988665218155, 121.00987514043045
              { lat: 14.581988665218155, lng: 121.00987514043045 }, // sub
              // 14.58234153672801, 121.01119025777645
              { lat: 14.58234153672801, lng: 121.01119025777645 }, // sub
              // to sta ana
              { lat: 14.582344345142713, lng: 121.01161333475272 }, // to sta ana
            ],
          },
        ],
      },
      // STA_ANA
      {
        id: 6,
        code: 'PASIGFERRY_STA_ANA',
        name: 'Sta. Ana',
        isOperational: true,
        imageLocal: 'assets/images/lines/pasigferry/PASIGFERRY_STA_ANA.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Sta. Ana.',
        // 14.582344345142713, 121.01161333475272
        coordinates: { lat: 14.582344345142713, lng: 121.01161333475272 }, // Sta. Ana Station
        edges: [
          {
            // reverse direction
            from: 'PASIGFERRY_STA_ANA',
            to: 'PASIGFERRY_PUP',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.582344345142713, lng: 121.01161333475272 }, // from me
              // 14.58234153672801, 121.01119025777645
              { lat: 14.58234153672801, lng: 121.01119025777645 }, // sub
              // 14.581988665218155, 121.00987514043045
              { lat: 14.581988665218155, lng: 121.00987514043045 }, // sub
              // 14.582972574771944, 121.00773954951393
              { lat: 14.582972574771944, lng: 121.00773954951393 }, // sub
              // 14.585651380777568, 121.00694816028975
              { lat: 14.585651380777568, lng: 121.00694816028975 }, // sub
              // 14.587677638187127, 121.00827555556033
              { lat: 14.587677638187127, lng: 121.00827555556033 }, // sub
              // 14.588240633149725, 121.01109862319068
              { lat: 14.588240633149725, lng: 121.01109862319068 }, // sub
              // 14.591895457048361, 121.01613147914685
              { lat: 14.591895457048361, lng: 121.01613147914685 }, // sub
              // 14.593112201495456, 121.01530413431585
              { lat: 14.593112201495456, lng: 121.01530413431585 }, // sub
              // 14.595522012866592, 121.01078452481147
              { lat: 14.595522012866592, lng: 121.01078452481147 }, // sub
              // to pup
              { lat: 14.596074726447794, lng: 121.01074815437192 }, // to pup
            ],
          },
          {
            to: 'PASIGFERRY_LAMBINGAN',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.582344345142713, lng: 121.01161333475272 }, // from me
              // 14.582878449626634, 121.01177904318969
              { lat: 14.582878449626634, lng: 121.01177904318969 }, // sub
              // 14.585365092314882, 121.01376096534608
              { lat: 14.585365092314882, lng: 121.01376096534608 }, // sub
              // 14.586340774001272, 121.01576304397248
              { lat: 14.586340774001272, lng: 121.01576304397248 }, // sub
              // 14.58693376549335, 121.01833628980633
              { lat: 14.58693376549335, lng: 121.01833628980633 },
              // to lambingan
              { lat: 14.58735325759085, lng: 121.01842249922893 }, // to lambingan
            ],
          },
        ],
      },
      // LAMBINGAN
      {
        id: 7,
        code: 'PASIGFERRY_LAMBINGAN',
        name: 'Lambingan',
        isOperational: true,
        imageLocal: 'assets/images/lines/pasigferry/PASIGFERRY_LAMBINGAN.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Lambingan.',
        // 14.58735325759085, 121.01842249922893
        coordinates: { lat: 14.58735325759085, lng: 121.01842249922893 }, // Lambingan Station
        edges: [
          {
            // reverse direction
            from: 'PASIGFERRY_LAMBINGAN',
            to: 'PASIGFERRY_STA_ANA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.58735325759085, lng: 121.01842249922893 }, // from me
              // 14.58693376549335, 121.01833628980633
              { lat: 14.58693376549335, lng: 121.01833628980633 }, // sub
              // 14.586340774001272, 121.01576304397248
              { lat: 14.586340774001272, lng: 121.01576304397248 }, // sub
              // 14.585365092314882, 121.01376096534608
              { lat: 14.585365092314882, lng: 121.01376096534608 }, // sub
              // 14.582878449626634, 121.01177904318969
              { lat: 14.582878449626634, lng: 121.01177904318969 }, // sub
              // to sta ana
              { lat: 14.582344345142713, lng: 121.01161333475272 }, // to sta ana
            ],
          },
          {
            to: 'PASIGFERRY_CIRCUIT_MAKATI',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.58735325759085, lng: 121.01842249922893 }, // from me
              // 14.58706872735945, 121.0188397279728
              { lat: 14.58706872735945, lng: 121.0188397279728 }, // sub
              // 14.586141127183478, 121.02020254427804
              { lat: 14.586141127183478, lng: 121.02020254427804 }, // sub
              // 14.585270063191638, 121.0203143123932
              { lat: 14.585270063191638, lng: 121.0203143123932 }, // sub
              // 14.582555185690614, 121.01843439879369
              { lat: 14.582555185690614, lng: 121.01843439879369 }, // sub
              // 14.581218375838553, 121.0170894554782
              { lat: 14.581218375838553, lng: 121.0170894554782 }, // sub
              // 14.579544094284618, 121.0176176903595
              { lat: 14.579544094284618, lng: 121.0176176903595 }, // sub
              // 14.577747250884853, 121.02034155385833
              { lat: 14.577747250884853, lng: 121.02034155385833 }, // sub
              // to circuit makati
              { lat: 14.577153540765293, lng: 121.02045861809407 }, // to circuit makati
            ],
          },
          {
            // bypass to valenzuela
            from: 'PASIGFERRY_LAMBINGAN',
            to: 'PASIGFERRY_VALENZUELA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.58735325759085, lng: 121.01842249922893 }, // from me
              // 14.58706872735945, 121.0188397279728
              { lat: 14.58706872735945, lng: 121.0188397279728 }, // sub
              // 14.586141127183478, 121.02020254427804
              { lat: 14.586141127183478, lng: 121.02020254427804 }, // sub
              // 14.585270063191638, 121.0203143123932
              { lat: 14.585270063191638, lng: 121.0203143123932 }, // sub
              // 14.582555185690614, 121.01843439879369
              { lat: 14.582555185690614, lng: 121.01843439879369 }, // sub
              // 14.581218375838553, 121.0170894554782
              { lat: 14.581218375838553, lng: 121.0170894554782 }, // sub
              // 14.579544094284618, 121.0176176903595
              { lat: 14.579544094284618, lng: 121.0176176903595 }, // sub
              // 14.577747250884853, 121.02034155385833
              { lat: 14.577747250884853, lng: 121.02034155385833 }, // sub
              // 14.577300389502843, 121.02100047052974
              { lat: 14.577300389502843, lng: 121.02100047052974 }, // sub
              // 14.574307668584163, 121.02572034292575
              { lat: 14.574307668584163, lng: 121.02572034292575 }, // sub
              // to valenzuela
              { lat: 14.573911251533163, lng: 121.02570147828344 }, // to valenzuela
            ],
          },
        ],
      },
      // CIRCUIT MAKATI
      {
        id: 8,
        code: 'PASIGFERRY_CIRCUIT_MAKATI',
        name: 'Circuit Makati',
        isOperational: false,
        imageLocal:
          'assets/images/lines/pasigferry/PASIGFERRY_CIRCUIT_MAKATI.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Circuit Makati.',
        // 14.577153540765293, 121.02045861809407
        coordinates: { lat: 14.577153540765293, lng: 121.02045861809407 }, // Circuit Makati Station
        edges: [
          {
            // reverse direction
            from: 'PASIGFERRY_CIRCUIT_MAKATI',
            to: 'PASIGFERRY_LAMBINGAN',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.577153540765293, lng: 121.02045861809407 }, // from me
              // 14.577747250884853, 121.02034155385833
              { lat: 14.577747250884853, lng: 121.02034155385833 }, // sub
              // 14.579544094284618, 121.0176176903595
              { lat: 14.579544094284618, lng: 121.0176176903595 }, // sub
              // 14.581218375838553, 121.0170894554782
              { lat: 14.581218375838553, lng: 121.0170894554782 }, // sub
              // 14.582555185690614, 121.01843439879369
              { lat: 14.582555185690614, lng: 121.01843439879369 }, // sub
              // 14.585270063191638, 121.0203143123932
              { lat: 14.585270063191638, lng: 121.0203143123932 }, // sub
              // 14.586141127183478, 121.02020254427804
              { lat: 14.586141127183478, lng: 121.02020254427804 }, // sub
              // 14.58706872735945, 121.0188397279728
              { lat: 14.58706872735945, lng: 121.0188397279728 }, // sub
              // to lambingan
              { lat: 14.58735325759085, lng: 121.01842249922893 }, // to lambingan
            ],
          },
          {
            to: 'PASIGFERRY_VALENZUELA',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.577153540765293, lng: 121.02045861809407 }, // from me
              // 14.577300389502843, 121.02100047052974
              { lat: 14.577300389502843, lng: 121.02100047052974 }, // sub
              // 14.574307668584163, 121.02572034292575
              { lat: 14.574307668584163, lng: 121.02572034292575 }, // sub
              // to valenzuela
              { lat: 14.573911251533163, lng: 121.02570147828344 }, // to valenzuela
            ],
          },
        ],
      },
      // VALENZUELA
      {
        id: 9,
        code: 'PASIGFERRY_VALENZUELA',
        name: 'Valenzuela',
        isOperational: true,
        imageLocal: 'assets/images/lines/pasigferry/PASIGFERRY_VALENZUELA.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Valenzuela.',
        // 14.573911251533163, 121.02570147828344
        coordinates: { lat: 14.573911251533163, lng: 121.02570147828344 }, // Valenzuela Station
        edges: [
          {
            // reverse direction
            from: 'PASIGFERRY_VALENZUELA',
            to: 'PASIGFERRY_CIRCUIT_MAKATI',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.573911251533163, lng: 121.02570147828344 }, // from me
              // 14.574307668584163, 121.02572034292575
              { lat: 14.574307668584163, lng: 121.02572034292575 }, // sub
              // 14.577300389502843, 121.02100047052974
              { lat: 14.577300389502843, lng: 121.02100047052974 }, // sub
              // to circuit makati
              { lat: 14.577153540765293, lng: 121.02045861809407 }, // to circuit makati
            ],
          },
          {
            // reverse bypass to lambingan
            from: 'PASIGFERRY_VALENZUELA',
            to: 'PASIGFERRY_LAMBINGAN',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.573911251533163, lng: 121.02570147828344 }, // from me
              // 14.574307668584163, 121.02572034292575
              { lat: 14.574307668584163, lng: 121.02572034292575 }, // sub
              // 14.577747250884853, 121.02034155385833
              { lat: 14.577747250884853, lng: 121.02034155385833 }, // sub
              // 14.579544094284618, 121.0176176903595
              { lat: 14.579544094284618, lng: 121.0176176903595 }, // sub
              // 14.581218375838553, 121.0170894554782
              { lat: 14.581218375838553, lng: 121.0170894554782 }, // sub
              // 14.582555185690614, 121.01843439879369
              { lat: 14.582555185690614, lng: 121.01843439879369 }, // sub
              // 14.585270063191638, 121.0203143123932
              { lat: 14.585270063191638, lng: 121.0203143123932 }, // sub
              // 14.586141127183478, 121.02020254427804
              { lat: 14.586141127183478, lng: 121.02020254427804 }, // sub
              // 14.58706872735945, 121.0188397279728
              { lat: 14.58706872735945, lng: 121.0188397279728 }, // sub
              // to lambingan
              { lat: 14.58735325759085, lng: 121.01842249922893 }, // to lambingan
            ],
          },
          {
            to: 'PASIGFERRY_HULO',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.573911251533163, lng: 121.02570147828344 }, // from me
              // 14.57406669907511, 121.02615218526257
              { lat: 14.57406669907511, lng: 121.02615218526257 }, // sub
              // 14.568032449368006, 121.03319286361942
              { lat: 14.568032449368006, lng: 121.03319286361942 }, // sub
              // to hulo
              { lat: 14.568007927219082, lng: 121.03366577685652 }, // to hulo
            ],
          },
        ],
      },
      // HULO
      {
        id: 10,
        code: 'PASIGFERRY_HULO',
        name: 'Hulo',
        isOperational: true,
        imageLocal: 'assets/images/lines/pasigferry/PASIGFERRY_HULO.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Hulo.',
        // 14.568007927219082, 121.03366577685652
        coordinates: { lat: 14.568007927219082, lng: 121.03366577685652 }, // Hulo Station
        edges: [
          {
            // reverse direction
            from: 'PASIGFERRY_HULO',
            to: 'PASIGFERRY_VALENZUELA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.568007927219082, lng: 121.03366577685652 }, // from me
              // 14.568032449368006, 121.03319286361942
              { lat: 14.568032449368006, lng: 121.03319286361942 }, // sub
              // 14.57406669907511, 121.02615218526257
              { lat: 14.57406669907511, lng: 121.02615218526257 }, // sub
              // to valenzuela
              { lat: 14.573911251533163, lng: 121.02570147828344 }, // to valenzuela
            ],
          },
          {
            to: 'PASIGFERRY_GUADALUPE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.568007927219082, lng: 121.03366577685652 }, // from me
              // 14.56771865177024, 121.03368266375759
              { lat: 14.56771865177024, lng: 121.03368266375759 }, // sub
              // 14.567222204667315, 121.0357300405103
              { lat: 14.567222204667315, lng: 121.0357300405103 }, // sub
              // 14.567351463625068, 121.03728233683319
              { lat: 14.567351463625068, lng: 121.03728233683319 }, // sub
              // 14.568719796461487, 121.04321013953893
              { lat: 14.568719796461487, lng: 121.04321013953893 }, // sub
              // 14.568379232297826, 121.04759181298212
              { lat: 14.568379232297826, lng: 121.04759181298212 }, // sub
              // to guadalupe
              { lat: 14.568080870140964, lng: 121.04792888791931 }, // to guadalupe
            ],
          },
        ],
      },
      // GUADALUPE
      {
        id: 11,
        code: 'PASIGFERRY_GUADALUPE',
        name: 'Guadalupe',
        isOperational: true,
        imageLocal: 'assets/images/lines/pasigferry/PASIGFERRY_GUADALUPE.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Guadalupe.',
        // 14.568080870140964, 121.04792888791931
        coordinates: { lat: 14.568080870140964, lng: 121.04792888791931 }, // Guadalupe Station
        edges: [
          {
            // reverse direction
            from: 'PASIGFERRY_GUADALUPE',
            to: 'PASIGFERRY_HULO',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.568080870140964, lng: 121.04792888791931 }, // from me
              // 14.568379232297826, 121.04759181298212
              { lat: 14.568379232297826, lng: 121.04759181298212 }, // sub
              // 14.568719796461487, 121.04321013953893
              { lat: 14.568719796461487, lng: 121.04321013953893 }, // sub
              // 14.567351463625068, 121.03728233683319
              { lat: 14.567351463625068, lng: 121.03728233683319 }, // sub
              // 14.567222204667315, 121.0357300405103
              { lat: 14.567222204667315, lng: 121.0357300405103 }, // sub
              // 14.56771865177024, 121.03368266375759
              { lat: 14.56771865177024, lng: 121.03368266375759 }, // sub
              // to hulo
              { lat: 14.568007927219082, lng: 121.03366577685652 }, // to hulo
            ],
          },
          {
            to: 'PASIGFERRY_SAN_JOAQUIN',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.568080870140964, lng: 121.04792888791931 }, // from me
              // 14.568339113264244, 121.04812747780205
              { lat: 14.568339113264244, lng: 121.04812747780205 }, // sub
              // 14.568458626231077, 121.05030826779074
              { lat: 14.568458626231077, lng: 121.05030826779074 }, // sub
              // 14.566044962155157, 121.05447889176997
              { lat: 14.566044962155157, lng: 121.05447889176997 }, // sub
              // 14.56473263547994, 121.05894583785633
              { lat: 14.56473263547994, lng: 121.05894583785633 }, // sub
              // 14.561686213447729, 121.06258848742523
              { lat: 14.561686213447729, lng: 121.06258848742523 }, // sub
              // 14.560583223797527, 121.06610235275558
              { lat: 14.560583223797527, lng: 121.06610235275558 }, // sub
              // 14.557224352353117, 121.06710546331439
              { lat: 14.557224352353117, lng: 121.06710546331439 }, // sub
              // 14.554948583313758, 121.07383486166952
              { lat: 14.554948583313758, lng: 121.07383486166952 }, // sub
              // to san joaquin
              { lat: 14.554601624603587, lng: 121.07386459488538 }, // to san joaquin
            ],
          },
        ],
      },
      // SAN JOAQUIN
      {
        id: 12,
        code: 'PASIGFERRY_SAN_JOAQUIN',
        name: 'San Joaquin',
        isOperational: true,
        imageLocal: 'assets/images/lines/pasigferry/PASIGFERRY_SAN_JOAQUIN.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near San Joaquin.',
        // 14.554601624603587, 121.07386459488538
        coordinates: { lat: 14.554601624603587, lng: 121.07386459488538 }, // San Joaquin Station
        edges: [
          {
            // reverse direction
            from: 'PASIGFERRY_SAN_JOAQUIN',
            to: 'PASIGFERRY_GUADALUPE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.554601624603587, lng: 121.07386459488538 }, // from me
              // 14.554948583313758, 121.07383486166952
              { lat: 14.554948583313758, lng: 121.07383486166952 }, // sub
              // 14.557224352353117, 121.06710546331439
              { lat: 14.557224352353117, lng: 121.06710546331439 }, // sub
              // 14.560583223797527, 121.06610235275558
              { lat: 14.560583223797527, lng: 121.06610235275558 }, // sub
              // 14.561686213447729, 121.06258848742523
              { lat: 14.561686213447729, lng: 121.06258848742523 }, // sub
              // 14.56473263547994, 121.05894583785633
              { lat: 14.56473263547994, lng: 121.05894583785633 }, // sub
              // 14.566044962155157, 121.05447889176997
              { lat: 14.566044962155157, lng: 121.05447889176997 }, // sub
              // 14.568458626231077, 121.05030826779074
              { lat: 14.568458626231077, lng: 121.05030826779074 }, // sub
              // 14.568339113264244, 121.04812747780205
              { lat: 14.568339113264244, lng: 121.04812747780205 }, // sub
              // to guadalupe
              { lat: 14.568080870140964, lng: 121.04792888791931 }, // to guadalupe
            ],
          },
          {
            to: 'PASIGFERRY_BAMBANG',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.554601624603587, lng: 121.07386459488538 }, // from me
              // 14.554679067643224, 121.0742172085543
              { lat: 14.554679067643224, lng: 121.0742172085543 }, // sub
              // 14.55361283715114, 121.07664978100348
              { lat: 14.55361283715114, lng: 121.07664978100348 }, // sub
              // 14.5538345648946, 121.07969258015552
              { lat: 14.5538345648946, lng: 121.07969258015552 }, // sub
              // 14.553705838114976, 121.08146018023629
              { lat: 14.553705838114976, lng: 121.08146018023629 }, // sub
              // to bambang
              { lat: 14.554074361749496, lng: 121.08153228996012 }, // to bambang
            ],
          },
          {
            // bypass to kalawaan
            from: 'PASIGFERRY_SAN_JOAQUIN',
            to: 'PASIGFERRY_KALAWAAN',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.554601624603587, lng: 121.07386459488538 }, // from me
              // 14.554679067643224, 121.0742172085543
              { lat: 14.554679067643224, lng: 121.0742172085543 }, // sub
              // 14.55361283715114, 121.07664978100348
              { lat: 14.55361283715114, lng: 121.07664978100348 }, // sub
              // 14.5538345648946, 121.07969258015552
              { lat: 14.5538345648946, lng: 121.07969258015552 }, // sub
              // 14.553705838114976, 121.08146018023629
              { lat: 14.553705838114976, lng: 121.08146018023629 }, // sub
              // to kalawaan
              { lat: 14.553195481621618, lng: 121.08212417421424 }, // to kalawaan
            ],
          },
        ],
      },
      // BAMBANG
      {
        id: 13,
        code: 'PASIGFERRY_BAMBANG',
        name: 'Bambang',
        isOperational: false,
        imageLocal: 'assets/images/lines/pasigferry/PASIGFERRY_BAMBANG.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Bambang.',
        // 14.554074361749496, 121.08153228996012
        coordinates: { lat: 14.554074361749496, lng: 121.08153228996012 }, // Bambang Station
        edges: [
          {
            // reverse direction
            from: 'PASIGFERRY_BAMBANG',
            to: 'PASIGFERRY_SAN_JOAQUIN',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.554074361749496, lng: 121.08153228996012 }, // from me
              // 14.553705838114976, 121.08146018023629
              { lat: 14.553705838114976, lng: 121.08146018023629 }, // sub
              // 14.5538345648946, 121.07969258015552
              { lat: 14.5538345648946, lng: 121.07969258015552 }, // sub
              // 14.55361283715114, 121.07664978100348
              { lat: 14.55361283715114, lng: 121.07664978100348 }, // sub
              // 14.554679067643224, 121.0742172085543
              { lat: 14.554679067643224, lng: 121.0742172085543 }, // sub
              // to san joaquin
              { lat: 14.554601624603587, lng: 121.07386459488538 }, // to san joaquin
            ],
          },
          {
            from: 'PASIGFERRY_BAMBANG',
            to: 'PASIGFERRY_KALAWAAN',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.554074361749496, lng: 121.08153228996012 }, // from me
              // to kalawaan
              { lat: 14.553195481621618, lng: 121.08212417421424 }, // to kalawaan
            ],
          },
        ],
      },
      // KALAWAAN
      {
        id: 14,
        code: 'PASIGFERRY_KALAWAAN',
        name: 'Kalawaan',
        isOperational: true,
        imageLocal: 'assets/images/lines/pasigferry/PASIGFERRY_KALAWAAN.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Kalawaan.',
        // 14.553195481621618, 121.08212417421424
        coordinates: { lat: 14.553195481621618, lng: 121.08212417421424 }, // Kalawaan Station
        edges: [
          {
            // reverse direction
            from: 'PASIGFERRY_KALAWAAN',
            to: 'PASIGFERRY_BAMBANG',
            weight: 5,
            isOperational: false,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.553195481621618, lng: 121.08212417421424 }, // from me
              // to bambang
              { lat: 14.554074361749496, lng: 121.08153228996012 }, // to bambang
            ],
          },
          {
            // reverse direction bypass to san joaquin
            from: 'PASIGFERRY_KALAWAAN',
            to: 'PASIGFERRY_SAN_JOAQUIN',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.553195481621618, lng: 121.08212417421424 }, // from me
              // 14.553705838114976, 121.08146018023629
              { lat: 14.553705838114976, lng: 121.08146018023629 }, // sub
              // 14.5538345648946, 121.07969258015552
              { lat: 14.5538345648946, lng: 121.07969258015552 }, // sub
              // 14.55361283715114, 121.07664978100348
              { lat: 14.55361283715114, lng: 121.07664978100348 }, // sub
              // 14.554679067643224, 121.0742172085543
              { lat: 14.554679067643224, lng: 121.0742172085543 }, // sub
              // to san joaquin
              { lat: 14.554601624603587, lng: 121.07386459488538 }, // to san joaquin
            ],
          },
          {
            from: 'PASIGFERRY_KALAWAAN',
            to: 'PASIGFERRY_PINAGBUHATAN',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.553195481621618, lng: 121.08212417421424 }, // from me
              // 14.553443082901245, 121.0824961147571
              { lat: 14.553443082901245, lng: 121.0824961147571 }, // sub
              // 14.553239698342722, 121.0847881995815
              { lat: 14.553239698342722, lng: 121.0847881995815 }, // sub
              // 14.553129516111682, 121.08760999151079
              { lat: 14.553129516111682, lng: 121.08760999151079 }, // sub
              // 14.552176079885212, 121.0893601288118
              { lat: 14.552176079885212, lng: 121.0893601288118 }, // sub
              // 14.552867855742576, 121.0919498493145
              { lat: 14.552867855742576, lng: 121.0919498493145 }, // sub
              // 14.552366350709532, 121.09289318783895
              { lat: 14.552366350709532, lng: 121.09289318783895 }, // sub
              // 14.548545244123195, 121.09400843141697
              { lat: 14.548545244123195, lng: 121.09400843141697 }, // sub
              // 14.54498854209715, 121.09476669503607
              { lat: 14.54498854209715, lng: 121.09476669503607 }, // sub
              // 14.54363829004517, 121.09616635148086
              { lat: 14.54363829004517, lng: 121.09616635148086 }, // sub
              // 14.54091473232845, 121.09616215517926
              { lat: 14.54091473232845, lng: 121.09616215517926 }, // sub
              // 14.539681022445446, 121.09749569177748
              { lat: 14.539681022445446, lng: 121.09749569177748 }, // sub
              // 14.537493745951576, 121.09878302938552
              { lat: 14.537493745951576, lng: 121.09878302938552 }, // sub
              // 14.535856815516285, 121.10181131994814
              { lat: 14.535856815516285, lng: 121.10181131994814 }, // sub
              // to pinagbuhatan
              { lat: 14.53593767424619, lng: 121.10217411867455 }, // to pinagbuhatan
            ],
          },
        ],
      },
      // PINAGBUHATAN
      {
        id: 15,
        code: 'PASIGFERRY_PINAGBUHATAN',
        name: 'Pinagbuhatan',
        isOperational: true,
        imageLocal:
          'assets/images/lines/pasigferry/PASIGFERRY_PINAGBUHATAN.jpg',
        image: '',
        imageAttributionHtml: '',
        description: 'Located near Pinagbuhatan.',
        // 14.53593767424619, 121.10217411867455
        coordinates: { lat: 14.53593767424619, lng: 121.10217411867455 }, // Pinagbuhatan Station
        edges: [
          {
            // reverse direction
            from: 'PASIGFERRY_PINAGBUHATAN',
            to: 'PASIGFERRY_KALAWAAN',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            duration: 5,
            path: [
              // from me
              { lat: 14.53593767424619, lng: 121.10217411867455 }, // from me
              // 14.535856815516285, 121.10181131994814
              { lat: 14.535856815516285, lng: 121.10181131994814 }, // sub
              // 14.537493745951576, 121.09878302938552
              { lat: 14.537493745951576, lng: 121.09878302938552 }, // sub
              // 14.539681022445446, 121.09749569177748
              { lat: 14.539681022445446, lng: 121.09749569177748 }, // sub
              // 14.54091473232845, 121.09616215517926
              { lat: 14.54091473232845, lng: 121.09616215517926 }, // sub
              // 14.54363829004517, 121.09616635148086
              { lat: 14.54363829004517, lng: 121.09616635148086 }, // sub
              // 14.54498854209715, 121.09476669503607
              { lat: 14.54498854209715, lng: 121.09476669503607 }, // sub
              // 14.548545244123195, 121.09400843141697
              { lat: 14.548545244123195, lng: 121.09400843141697 }, // sub
              // 14.552366350709532, 121.09289318783895
              { lat: 14.552366350709532, lng: 121.09289318783895 }, // sub
              // 14.552867855742576, 121.0919498493145
              { lat: 14.552867855742576, lng: 121.0919498493145 }, // sub
              // 14.552176079885212, 121.0893601288118
              { lat: 14.552176079885212, lng: 121.0893601288118 }, // sub
              // 14.553129516111682, 121.08760999151079
              { lat: 14.553129516111682, lng: 121.08760999151079 }, // sub
              // 14.553239698342722, 121.0847881995815
              { lat: 14.553239698342722, lng: 121.0847881995815 }, // sub
              // 14.553443082901245, 121.0824961147571
              { lat: 14.553443082901245, lng: 121.0824961147571 }, // sub
              // to kalawaan
              { lat: 14.553195481621618, lng: 121.08212417421424 }, // to kalawaan
            ],
          },
        ],
      },
    ],
  },
  // Add more transit lines as needed
];

// all mrt3 EXACT station codes here:
/*
MRT3_NORTH_AVENUE,
MRT3_QUEZON_AVENUE,
MRT3_GMA_KAMUNING,
MRT3_CUBAO,
MRT3_SANTOLAN_ANNAPOLIS,
MRT3_ORTIGAS,
MRT3_SHAW_BOULEVARD,
MRT3_BONI,
MRT3_GUADALUPE,
MRT3_BUENDIA,
MRT3_AYALA,
MRT3_MAGALLANES,
MRT3_TAFT_AVENUE */

// all lrt1 EXACT station codes here:
/* LRT1_FPJ,
LRT1_BALINTAWAK,
LRT1_MONUMENTO,
LRT1_5TH_AVENUE,
LRT1_R_PAPA,
LRT1_ABAD_SANTOS,
LRT1_BLUMENTRITT,
LRT1_TAYUMAN,
LRT1_BAMBANG,
LRT1_DOROTEO_JOSE,
LRT1_CARRIEDO,
LRT1_CENTRAL_TERMINAL,
LRT1_UN_AVENUE,
LRT1_PEDRO_GIL,
LRT1_QUIRINO,
LRT1_VITO_CRUZ,
LRT1_GIL_PUYAT,
LRT1_LIBERTAD,
LRT1_EDSA,
LRT1_BACLARAN,
LRT1_REDEMPTORIST,
LRT1_MIA,
LRT1_ASIA_WORLD,
LRT1_NINOY_AQUINO,
LRT1_DR_SANTOS,
LRT1_LAS_PINAS,
LRT1_ZAPOTE,
LRT1_NIOG
*/

// all lrt2 EXACT station codes here:
/*
LRT2_RECTO,
LRT2_LEGARDA,
LRT2_PUREZA,
LRT2_V_MAPA,
LRT2_J_RUIZ,
LRT2_GILMORE,
LRT2_BETTY_GO_BELMONTE,
LRT2_CUBAO,
LRT2_ANONAS,
LRT2_KATIPUNAN,
LRT2_SANTOLAN,
LRT2_MARIKINA,
LRT2_ANTIPOLO
*/

export const FAREMATRIX: Record<
  string,
  Record<string, Record<string, number>>
> = {
  MRT3: {
    MRT3_NORTH_AVENUE: {
      MRT3_NORTH_AVENUE: 0, // same
      MRT3_QUEZON_AVENUE: 13,
      MRT3_GMA_KAMUNING: 13,
      MRT3_CUBAO: 16,
      MRT3_SANTOLAN_ANNAPOLIS: 16,
      MRT3_ORTIGAS: 20,
      MRT3_SHAW_BOULEVARD: 20,
      MRT3_BONI: 20,
      MRT3_GUADALUPE: 24,
      MRT3_BUENDIA: 24,
      MRT3_AYALA: 28,
      MRT3_MAGALLANES: 28,
      MRT3_TAFT_AVENUE: 28,
    },
    MRT3_QUEZON_AVENUE: {
      MRT3_NORTH_AVENUE: 13,
      MRT3_QUEZON_AVENUE: 0, // same
      MRT3_GMA_KAMUNING: 13,
      MRT3_CUBAO: 13,
      MRT3_SANTOLAN_ANNAPOLIS: 16,
      MRT3_ORTIGAS: 16,
      MRT3_SHAW_BOULEVARD: 20,
      MRT3_BONI: 20,
      MRT3_GUADALUPE: 20,
      MRT3_BUENDIA: 24,
      MRT3_AYALA: 24,
      MRT3_MAGALLANES: 24,
      MRT3_TAFT_AVENUE: 28,
    },
    MRT3_GMA_KAMUNING: {
      MRT3_NORTH_AVENUE: 13,
      MRT3_QUEZON_AVENUE: 13,
      MRT3_GMA_KAMUNING: 0, // same
      MRT3_CUBAO: 13,
      MRT3_SANTOLAN_ANNAPOLIS: 13,
      MRT3_ORTIGAS: 16,
      MRT3_SHAW_BOULEVARD: 16,
      MRT3_BONI: 20,
      MRT3_GUADALUPE: 20,
      MRT3_BUENDIA: 20,
      MRT3_AYALA: 24,
      MRT3_MAGALLANES: 24,
      MRT3_TAFT_AVENUE: 24,
    },
    MRT3_CUBAO: {
      MRT3_NORTH_AVENUE: 16,
      MRT3_QUEZON_AVENUE: 13,
      MRT3_GMA_KAMUNING: 13,
      MRT3_CUBAO: 0, // same
      MRT3_SANTOLAN_ANNAPOLIS: 13,
      MRT3_ORTIGAS: 13,
      MRT3_SHAW_BOULEVARD: 16,
      MRT3_BONI: 16,
      MRT3_GUADALUPE: 20,
      MRT3_BUENDIA: 20,
      MRT3_AYALA: 20,
      MRT3_MAGALLANES: 24,
      MRT3_TAFT_AVENUE: 24,
    },
    MRT3_SANTOLAN_ANNAPOLIS: {
      MRT3_NORTH_AVENUE: 16,
      MRT3_QUEZON_AVENUE: 16,
      MRT3_GMA_KAMUNING: 13,
      MRT3_CUBAO: 13,
      MRT3_SANTOLAN_ANNAPOLIS: 0, // same
      MRT3_ORTIGAS: 13,
      MRT3_SHAW_BOULEVARD: 13,
      MRT3_BONI: 16,
      MRT3_GUADALUPE: 16,
      MRT3_BUENDIA: 20,
      MRT3_AYALA: 20,
      MRT3_MAGALLANES: 20,
      MRT3_TAFT_AVENUE: 24,
    },
    MRT3_ORTIGAS: {
      MRT3_NORTH_AVENUE: 20,
      MRT3_QUEZON_AVENUE: 16,
      MRT3_GMA_KAMUNING: 16,
      MRT3_CUBAO: 13,
      MRT3_SANTOLAN_ANNAPOLIS: 13,
      MRT3_ORTIGAS: 0, // same
      MRT3_SHAW_BOULEVARD: 13,
      MRT3_BONI: 13,
      MRT3_GUADALUPE: 16,
      MRT3_BUENDIA: 16,
      MRT3_AYALA: 20,
      MRT3_MAGALLANES: 20,
      MRT3_TAFT_AVENUE: 20,
    },
    MRT3_SHAW_BOULEVARD: {
      MRT3_NORTH_AVENUE: 20,
      MRT3_QUEZON_AVENUE: 20,
      MRT3_GMA_KAMUNING: 16,
      MRT3_CUBAO: 16,
      MRT3_SANTOLAN_ANNAPOLIS: 13,
      MRT3_ORTIGAS: 13,
      MRT3_SHAW_BOULEVARD: 0, // same
      MRT3_BONI: 13,
      MRT3_GUADALUPE: 13,
      MRT3_BUENDIA: 16,
      MRT3_AYALA: 16,
      MRT3_MAGALLANES: 20,
      MRT3_TAFT_AVENUE: 20,
    },
    MRT3_BONI: {
      MRT3_NORTH_AVENUE: 20,
      MRT3_QUEZON_AVENUE: 20,
      MRT3_GMA_KAMUNING: 20,
      MRT3_CUBAO: 16,
      MRT3_SANTOLAN_ANNAPOLIS: 16,
      MRT3_ORTIGAS: 13,
      MRT3_SHAW_BOULEVARD: 13,
      MRT3_BONI: 0, // same
      MRT3_GUADALUPE: 13,
      MRT3_BUENDIA: 13,
      MRT3_AYALA: 16,
      MRT3_MAGALLANES: 16,
      MRT3_TAFT_AVENUE: 20,
    },
    MRT3_GUADALUPE: {
      MRT3_NORTH_AVENUE: 24,
      MRT3_QUEZON_AVENUE: 20,
      MRT3_GMA_KAMUNING: 20,
      MRT3_CUBAO: 20,
      MRT3_SANTOLAN_ANNAPOLIS: 26,
      MRT3_ORTIGAS: 16,
      MRT3_SHAW_BOULEVARD: 13,
      MRT3_BONI: 13,
      MRT3_GUADALUPE: 0, // same
      MRT3_BUENDIA: 13,
      MRT3_AYALA: 13,
      MRT3_MAGALLANES: 16,
      MRT3_TAFT_AVENUE: 16,
    },
    MRT3_BUENDIA: {
      MRT3_NORTH_AVENUE: 24,
      MRT3_QUEZON_AVENUE: 24,
      MRT3_GMA_KAMUNING: 20,
      MRT3_CUBAO: 20,
      MRT3_SANTOLAN_ANNAPOLIS: 20,
      MRT3_ORTIGAS: 16,
      MRT3_SHAW_BOULEVARD: 16,
      MRT3_BONI: 13,
      MRT3_GUADALUPE: 13,
      MRT3_BUENDIA: 0, // same
      MRT3_AYALA: 13,
      MRT3_MAGALLANES: 13,
      MRT3_TAFT_AVENUE: 16,
    },
    MRT3_AYALA: {
      MRT3_NORTH_AVENUE: 24,
      MRT3_QUEZON_AVENUE: 24,
      MRT3_GMA_KAMUNING: 24,
      MRT3_CUBAO: 20,
      MRT3_SANTOLAN_ANNAPOLIS: 20,
      MRT3_ORTIGAS: 20,
      MRT3_SHAW_BOULEVARD: 16,
      MRT3_BONI: 16,
      MRT3_GUADALUPE: 13,
      MRT3_BUENDIA: 13,
      MRT3_AYALA: 0, // same
      MRT3_MAGALLANES: 13,
      MRT3_TAFT_AVENUE: 13,
    },
    MRT3_MAGALLANES: {
      MRT3_NORTH_AVENUE: 28,
      MRT3_QUEZON_AVENUE: 24,
      MRT3_GMA_KAMUNING: 24,
      MRT3_CUBAO: 24,
      MRT3_SANTOLAN_ANNAPOLIS: 20,
      MRT3_ORTIGAS: 20,
      MRT3_SHAW_BOULEVARD: 20,
      MRT3_BONI: 16,
      MRT3_GUADALUPE: 16,
      MRT3_BUENDIA: 13,
      MRT3_AYALA: 13,
      MRT3_MAGALLANES: 0, // same
      MRT3_TAFT_AVENUE: 13,
    },
    MRT3_TAFT_AVENUE: {
      MRT3_NORTH_AVENUE: 28,
      MRT3_QUEZON_AVENUE: 28,
      MRT3_GMA_KAMUNING: 24,
      MRT3_CUBAO: 24,
      MRT3_SANTOLAN_ANNAPOLIS: 24,
      MRT3_ORTIGAS: 20,
      MRT3_SHAW_BOULEVARD: 24,
      MRT3_BONI: 20,
      MRT3_GUADALUPE: 20,
      MRT3_BUENDIA: 16,
      MRT3_AYALA: 13,
      MRT3_MAGALLANES: 13,
      MRT3_TAFT_AVENUE: 0, // same
    },
  },
  LRT1: {
    LRT1_FPJ: {
      LRT1_FPJ: 0, // same
      LRT1_BALINTAWAK: 20,
      LRT1_MONUMENTO: 20,
      LRT1_5TH_AVENUE: 20,
      LRT1_R_PAPA: 25,
      LRT1_ABAD_SANTOS: 25,
      LRT1_BLUMENTRITT: 25,
      LRT1_TAYUMAN: 25,
      LRT1_BAMBANG: 25,
      LRT1_DOROTEO_JOSE: 25,
      LRT1_CARRIEDO: 30,
      LRT1_CENTRAL_TERMINAL: 30,
      LRT1_UN_AVENUE: 30,
      LRT1_PEDRO_GIL: 30,
      LRT1_QUIRINO: 30,
      LRT1_VITO_CRUZ: 35,
      LRT1_GIL_PUYAT: 35,
      LRT1_LIBERTAD: 35,
      LRT1_EDSA: 35,
      LRT1_BACLARAN: 35,
      LRT1_REDEMPTORIST: 40,
      LRT1_MIA: 40,
      LRT1_ASIA_WORLD: 40,
      LRT1_NINOY_AQUINO: 45,
      LRT1_DR_SANTOS: 45,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_BALINTAWAK: {
      LRT1_FPJ: 20,
      LRT1_BALINTAWAK: 0, // same
      LRT1_MONUMENTO: 20,
      LRT1_5TH_AVENUE: 20,
      LRT1_R_PAPA: 20,
      LRT1_ABAD_SANTOS: 20,
      LRT1_BLUMENTRITT: 20,
      LRT1_TAYUMAN: 25,
      LRT1_BAMBANG: 25,
      LRT1_DOROTEO_JOSE: 25,
      LRT1_CARRIEDO: 25,
      LRT1_CENTRAL_TERMINAL: 25,
      LRT1_UN_AVENUE: 30,
      LRT1_PEDRO_GIL: 30,
      LRT1_QUIRINO: 30,
      LRT1_VITO_CRUZ: 30,
      LRT1_GIL_PUYAT: 30,
      LRT1_LIBERTAD: 35,
      LRT1_EDSA: 35,
      LRT1_BACLARAN: 35,
      LRT1_REDEMPTORIST: 35,
      LRT1_MIA: 40,
      LRT1_ASIA_WORLD: 40,
      LRT1_NINOY_AQUINO: 40,
      LRT1_DR_SANTOS: 45,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_MONUMENTO: {
      LRT1_FPJ: 20,
      LRT1_BALINTAWAK: 20,
      LRT1_MONUMENTO: 0, // same
      LRT1_5TH_AVENUE: 15,
      LRT1_R_PAPA: 20,
      LRT1_ABAD_SANTOS: 20,
      LRT1_BLUMENTRITT: 20,
      LRT1_TAYUMAN: 20,
      LRT1_BAMBANG: 20,
      LRT1_DOROTEO_JOSE: 20,
      LRT1_CARRIEDO: 25,
      LRT1_CENTRAL_TERMINAL: 25,
      LRT1_UN_AVENUE: 25,
      LRT1_PEDRO_GIL: 25,
      LRT1_QUIRINO: 25,
      LRT1_VITO_CRUZ: 30,
      LRT1_GIL_PUYAT: 30,
      LRT1_LIBERTAD: 30,
      LRT1_EDSA: 30,
      LRT1_BACLARAN: 30,
      LRT1_REDEMPTORIST: 35,
      LRT1_MIA: 35,
      LRT1_ASIA_WORLD: 35,
      LRT1_NINOY_AQUINO: 40,
      LRT1_DR_SANTOS: 40,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_5TH_AVENUE: {
      LRT1_FPJ: 20,
      LRT1_BALINTAWAK: 20,
      LRT1_MONUMENTO: 15,
      LRT1_5TH_AVENUE: 0, // same
      LRT1_R_PAPA: 15,
      LRT1_ABAD_SANTOS: 15,
      LRT1_BLUMENTRITT: 20,
      LRT1_TAYUMAN: 20,
      LRT1_BAMBANG: 20,
      LRT1_DOROTEO_JOSE: 20,
      LRT1_CARRIEDO: 20,
      LRT1_CENTRAL_TERMINAL: 20,
      LRT1_UN_AVENUE: 25,
      LRT1_PEDRO_GIL: 25,
      LRT1_QUIRINO: 25,
      LRT1_VITO_CRUZ: 25,
      LRT1_GIL_PUYAT: 30,
      LRT1_LIBERTAD: 30,
      LRT1_EDSA: 30,
      LRT1_BACLARAN: 30,
      LRT1_REDEMPTORIST: 35,
      LRT1_MIA: 35,
      LRT1_ASIA_WORLD: 35,
      LRT1_NINOY_AQUINO: 35,
      LRT1_DR_SANTOS: 40,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_R_PAPA: {
      LRT1_FPJ: 25,
      LRT1_BALINTAWAK: 20,
      LRT1_MONUMENTO: 20,
      LRT1_5TH_AVENUE: 15,
      LRT1_R_PAPA: 0, // same
      LRT1_ABAD_SANTOS: 15,
      LRT1_BLUMENTRITT: 15,
      LRT1_TAYUMAN: 20,
      LRT1_BAMBANG: 20,
      LRT1_DOROTEO_JOSE: 20,
      LRT1_CARRIEDO: 20,
      LRT1_CENTRAL_TERMINAL: 20,
      LRT1_UN_AVENUE: 25,
      LRT1_PEDRO_GIL: 25,
      LRT1_QUIRINO: 25,
      LRT1_VITO_CRUZ: 25,
      LRT1_GIL_PUYAT: 25,
      LRT1_LIBERTAD: 30,
      LRT1_EDSA: 30,
      LRT1_BACLARAN: 30,
      LRT1_REDEMPTORIST: 30,
      LRT1_MIA: 30,
      LRT1_ASIA_WORLD: 35,
      LRT1_NINOY_AQUINO: 35,
      LRT1_DR_SANTOS: 35,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_ABAD_SANTOS: {
      LRT1_FPJ: 25,
      LRT1_BALINTAWAK: 20,
      LRT1_MONUMENTO: 20,
      LRT1_5TH_AVENUE: 15,
      LRT1_R_PAPA: 15,
      LRT1_ABAD_SANTOS: 0, // same
      LRT1_BLUMENTRITT: 15,
      LRT1_TAYUMAN: 15,
      LRT1_BAMBANG: 20,
      LRT1_DOROTEO_JOSE: 20,
      LRT1_CARRIEDO: 20,
      LRT1_CENTRAL_TERMINAL: 20,
      LRT1_UN_AVENUE: 20,
      LRT1_PEDRO_GIL: 25,
      LRT1_QUIRINO: 25,
      LRT1_VITO_CRUZ: 25,
      LRT1_GIL_PUYAT: 25,
      LRT1_LIBERTAD: 25,
      LRT1_EDSA: 30,
      LRT1_BACLARAN: 30,
      LRT1_REDEMPTORIST: 30,
      LRT1_MIA: 30,
      LRT1_ASIA_WORLD: 35,
      LRT1_NINOY_AQUINO: 35,
      LRT1_DR_SANTOS: 35,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_BLUMENTRITT: {
      LRT1_FPJ: 25,
      LRT1_BALINTAWAK: 20,
      LRT1_MONUMENTO: 20,
      LRT1_5TH_AVENUE: 20,
      LRT1_R_PAPA: 15,
      LRT1_ABAD_SANTOS: 15,
      LRT1_BLUMENTRITT: 0, // same
      LRT1_TAYUMAN: 15,
      LRT1_BAMBANG: 15,
      LRT1_DOROTEO_JOSE: 20,
      LRT1_CARRIEDO: 20,
      LRT1_CENTRAL_TERMINAL: 20,
      LRT1_UN_AVENUE: 20,
      LRT1_PEDRO_GIL: 20,
      LRT1_QUIRINO: 25,
      LRT1_VITO_CRUZ: 25,
      LRT1_GIL_PUYAT: 25,
      LRT1_LIBERTAD: 25,
      LRT1_EDSA: 25,
      LRT1_BACLARAN: 30,
      LRT1_REDEMPTORIST: 30,
      LRT1_MIA: 30,
      LRT1_ASIA_WORLD: 30,
      LRT1_NINOY_AQUINO: 35,
      LRT1_DR_SANTOS: 35,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_TAYUMAN: {
      LRT1_FPJ: 25,
      LRT1_BALINTAWAK: 25,
      LRT1_MONUMENTO: 20,
      LRT1_5TH_AVENUE: 20,
      LRT1_R_PAPA: 20,
      LRT1_ABAD_SANTOS: 15,
      LRT1_BLUMENTRITT: 15,
      LRT1_TAYUMAN: 0, // same
      LRT1_BAMBANG: 15,
      LRT1_DOROTEO_JOSE: 15,
      LRT1_CARRIEDO: 20,
      LRT1_CENTRAL_TERMINAL: 20,
      LRT1_UN_AVENUE: 20,
      LRT1_PEDRO_GIL: 20,
      LRT1_QUIRINO: 20,
      LRT1_VITO_CRUZ: 25,
      LRT1_GIL_PUYAT: 25,
      LRT1_LIBERTAD: 25,
      LRT1_EDSA: 25,
      LRT1_BACLARAN: 25,
      LRT1_REDEMPTORIST: 30,
      LRT1_MIA: 30,
      LRT1_ASIA_WORLD: 30,
      LRT1_NINOY_AQUINO: 35,
      LRT1_DR_SANTOS: 35,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_BAMBANG: {
      LRT1_FPJ: 25,
      LRT1_BALINTAWAK: 25,
      LRT1_MONUMENTO: 20,
      LRT1_5TH_AVENUE: 20,
      LRT1_R_PAPA: 20,
      LRT1_ABAD_SANTOS: 20,
      LRT1_BLUMENTRITT: 15,
      LRT1_TAYUMAN: 15,
      LRT1_BAMBANG: 0, // same
      LRT1_DOROTEO_JOSE: 15,
      LRT1_CARRIEDO: 15,
      LRT1_CENTRAL_TERMINAL: 20,
      LRT1_UN_AVENUE: 20,
      LRT1_PEDRO_GIL: 20,
      LRT1_QUIRINO: 20,
      LRT1_VITO_CRUZ: 20,
      LRT1_GIL_PUYAT: 25,
      LRT1_LIBERTAD: 25,
      LRT1_EDSA: 25,
      LRT1_BACLARAN: 25,
      LRT1_REDEMPTORIST: 30,
      LRT1_MIA: 30,
      LRT1_ASIA_WORLD: 30,
      LRT1_NINOY_AQUINO: 30,
      LRT1_DR_SANTOS: 35,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_DOROTEO_JOSE: {
      LRT1_FPJ: 25,
      LRT1_BALINTAWAK: 25,
      LRT1_MONUMENTO: 20,
      LRT1_5TH_AVENUE: 20,
      LRT1_R_PAPA: 20,
      LRT1_ABAD_SANTOS: 20,
      LRT1_BLUMENTRITT: 20,
      LRT1_TAYUMAN: 15,
      LRT1_BAMBANG: 15,
      LRT1_DOROTEO_JOSE: 0, // same
      LRT1_CARRIEDO: 15,
      LRT1_CENTRAL_TERMINAL: 15,
      LRT1_UN_AVENUE: 20,
      LRT1_PEDRO_GIL: 20,
      LRT1_QUIRINO: 20,
      LRT1_VITO_CRUZ: 20,
      LRT1_GIL_PUYAT: 25,
      LRT1_LIBERTAD: 25,
      LRT1_EDSA: 25,
      LRT1_BACLARAN: 25,
      LRT1_REDEMPTORIST: 25,
      LRT1_MIA: 30,
      LRT1_ASIA_WORLD: 30,
      LRT1_NINOY_AQUINO: 30,
      LRT1_DR_SANTOS: 35,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_CARRIEDO: {
      LRT1_FPJ: 30,
      LRT1_BALINTAWAK: 25,
      LRT1_MONUMENTO: 25,
      LRT1_5TH_AVENUE: 20,
      LRT1_R_PAPA: 20,
      LRT1_ABAD_SANTOS: 20,
      LRT1_BLUMENTRITT: 20,
      LRT1_TAYUMAN: 20,
      LRT1_BAMBANG: 15,
      LRT1_DOROTEO_JOSE: 15,
      LRT1_CARRIEDO: 0, // same
      LRT1_CENTRAL_TERMINAL: 15,
      LRT1_UN_AVENUE: 20,
      LRT1_PEDRO_GIL: 20,
      LRT1_QUIRINO: 20,
      LRT1_VITO_CRUZ: 20,
      LRT1_GIL_PUYAT: 20,
      LRT1_LIBERTAD: 25,
      LRT1_EDSA: 25,
      LRT1_BACLARAN: 25,
      LRT1_REDEMPTORIST: 25,
      LRT1_MIA: 25,
      LRT1_ASIA_WORLD: 30,
      LRT1_NINOY_AQUINO: 30,
      LRT1_DR_SANTOS: 30,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_CENTRAL_TERMINAL: {
      LRT1_FPJ: 30,
      LRT1_BALINTAWAK: 25,
      LRT1_MONUMENTO: 25,
      LRT1_5TH_AVENUE: 20,
      LRT1_R_PAPA: 20,
      LRT1_ABAD_SANTOS: 20,
      LRT1_BLUMENTRITT: 20,
      LRT1_TAYUMAN: 20,
      LRT1_BAMBANG: 20,
      LRT1_DOROTEO_JOSE: 15,
      LRT1_CARRIEDO: 15,
      LRT1_CENTRAL_TERMINAL: 0, // same
      LRT1_UN_AVENUE: 15,
      LRT1_PEDRO_GIL: 20,
      LRT1_QUIRINO: 20,
      LRT1_VITO_CRUZ: 20,
      LRT1_GIL_PUYAT: 20,
      LRT1_LIBERTAD: 20,
      LRT1_EDSA: 25,
      LRT1_BACLARAN: 25,
      LRT1_REDEMPTORIST: 25,
      LRT1_MIA: 25,
      LRT1_ASIA_WORLD: 30,
      LRT1_NINOY_AQUINO: 30,
      LRT1_DR_SANTOS: 30,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_UN_AVENUE: {
      LRT1_FPJ: 30,
      LRT1_BALINTAWAK: 30,
      LRT1_MONUMENTO: 25,
      LRT1_5TH_AVENUE: 25,
      LRT1_R_PAPA: 25,
      LRT1_ABAD_SANTOS: 20,
      LRT1_BLUMENTRITT: 20,
      LRT1_TAYUMAN: 20,
      LRT1_BAMBANG: 20,
      LRT1_DOROTEO_JOSE: 20,
      LRT1_CARRIEDO: 20,
      LRT1_CENTRAL_TERMINAL: 15,
      LRT1_UN_AVENUE: 0, // same
      LRT1_PEDRO_GIL: 15,
      LRT1_QUIRINO: 15,
      LRT1_VITO_CRUZ: 20,
      LRT1_GIL_PUYAT: 20,
      LRT1_LIBERTAD: 20,
      LRT1_EDSA: 20,
      LRT1_BACLARAN: 20,
      LRT1_REDEMPTORIST: 25,
      LRT1_MIA: 25,
      LRT1_ASIA_WORLD: 25,
      LRT1_NINOY_AQUINO: 30,
      LRT1_DR_SANTOS: 30,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_PEDRO_GIL: {
      LRT1_FPJ: 30,
      LRT1_BALINTAWAK: 30,
      LRT1_MONUMENTO: 25,
      LRT1_5TH_AVENUE: 25,
      LRT1_R_PAPA: 25,
      LRT1_ABAD_SANTOS: 25,
      LRT1_BLUMENTRITT: 20,
      LRT1_TAYUMAN: 20,
      LRT1_BAMBANG: 20,
      LRT1_DOROTEO_JOSE: 20,
      LRT1_CARRIEDO: 20,
      LRT1_CENTRAL_TERMINAL: 20,
      LRT1_UN_AVENUE: 15,
      LRT1_PEDRO_GIL: 0, // same
      LRT1_QUIRINO: 15,
      LRT1_VITO_CRUZ: 15,
      LRT1_GIL_PUYAT: 20,
      LRT1_LIBERTAD: 20,
      LRT1_EDSA: 20,
      LRT1_BACLARAN: 20,
      LRT1_REDEMPTORIST: 25,
      LRT1_MIA: 25,
      LRT1_ASIA_WORLD: 25,
      LRT1_NINOY_AQUINO: 25,
      LRT1_DR_SANTOS: 30,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_QUIRINO: {
      LRT1_FPJ: 30,
      LRT1_BALINTAWAK: 30,
      LRT1_MONUMENTO: 25,
      LRT1_5TH_AVENUE: 25,
      LRT1_R_PAPA: 25,
      LRT1_ABAD_SANTOS: 25,
      LRT1_BLUMENTRITT: 25,
      LRT1_TAYUMAN: 20,
      LRT1_BAMBANG: 20,
      LRT1_DOROTEO_JOSE: 20,
      LRT1_CARRIEDO: 20,
      LRT1_CENTRAL_TERMINAL: 20,
      LRT1_UN_AVENUE: 15,
      LRT1_PEDRO_GIL: 15,
      LRT1_QUIRINO: 0, // same
      LRT1_VITO_CRUZ: 15,
      LRT1_GIL_PUYAT: 20,
      LRT1_LIBERTAD: 20,
      LRT1_EDSA: 20,
      LRT1_BACLARAN: 20,
      LRT1_REDEMPTORIST: 20,
      LRT1_MIA: 25,
      LRT1_ASIA_WORLD: 25,
      LRT1_NINOY_AQUINO: 25,
      LRT1_DR_SANTOS: 30,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_VITO_CRUZ: {
      LRT1_FPJ: 35,
      LRT1_BALINTAWAK: 30,
      LRT1_MONUMENTO: 30,
      LRT1_5TH_AVENUE: 25,
      LRT1_R_PAPA: 25,
      LRT1_ABAD_SANTOS: 25,
      LRT1_BLUMENTRITT: 25,
      LRT1_TAYUMAN: 25,
      LRT1_BAMBANG: 20,
      LRT1_DOROTEO_JOSE: 20,
      LRT1_CARRIEDO: 20,
      LRT1_CENTRAL_TERMINAL: 20,
      LRT1_UN_AVENUE: 20,
      LRT1_PEDRO_GIL: 15,
      LRT1_QUIRINO: 15,
      LRT1_VITO_CRUZ: 0, // same
      LRT1_GIL_PUYAT: 15,
      LRT1_LIBERTAD: 15,
      LRT1_EDSA: 20,
      LRT1_BACLARAN: 20,
      LRT1_REDEMPTORIST: 20,
      LRT1_MIA: 20,
      LRT1_ASIA_WORLD: 25,
      LRT1_NINOY_AQUINO: 25,
      LRT1_DR_SANTOS: 25,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_GIL_PUYAT: {
      LRT1_FPJ: 35,
      LRT1_BALINTAWAK: 30,
      LRT1_MONUMENTO: 30,
      LRT1_5TH_AVENUE: 30,
      LRT1_R_PAPA: 25,
      LRT1_ABAD_SANTOS: 25,
      LRT1_BLUMENTRITT: 25,
      LRT1_TAYUMAN: 25,
      LRT1_BAMBANG: 25,
      LRT1_DOROTEO_JOSE: 25,
      LRT1_CARRIEDO: 20,
      LRT1_CENTRAL_TERMINAL: 20,
      LRT1_UN_AVENUE: 20,
      LRT1_PEDRO_GIL: 20,
      LRT1_QUIRINO: 20,
      LRT1_VITO_CRUZ: 15,
      LRT1_GIL_PUYAT: 0, // same
      LRT1_LIBERTAD: 15,
      LRT1_EDSA: 15,
      LRT1_BACLARAN: 20,
      LRT1_REDEMPTORIST: 20,
      LRT1_MIA: 20,
      LRT1_ASIA_WORLD: 20,
      LRT1_NINOY_AQUINO: 25,
      LRT1_DR_SANTOS: 25,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_LIBERTAD: {
      LRT1_FPJ: 35,
      LRT1_BALINTAWAK: 35,
      LRT1_MONUMENTO: 30,
      LRT1_5TH_AVENUE: 30,
      LRT1_R_PAPA: 30,
      LRT1_ABAD_SANTOS: 25,
      LRT1_BLUMENTRITT: 25,
      LRT1_TAYUMAN: 25,
      LRT1_BAMBANG: 25,
      LRT1_DOROTEO_JOSE: 25,
      LRT1_CARRIEDO: 25,
      LRT1_CENTRAL_TERMINAL: 20,
      LRT1_UN_AVENUE: 20,
      LRT1_PEDRO_GIL: 20,
      LRT1_QUIRINO: 20,
      LRT1_VITO_CRUZ: 15,
      LRT1_GIL_PUYAT: 15,
      LRT1_LIBERTAD: 0, // same
      LRT1_EDSA: 15,
      LRT1_BACLARAN: 15,
      LRT1_REDEMPTORIST: 20,
      LRT1_MIA: 20,
      LRT1_ASIA_WORLD: 20,
      LRT1_NINOY_AQUINO: 25,
      LRT1_DR_SANTOS: 25,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_EDSA: {
      LRT1_FPJ: 35,
      LRT1_BALINTAWAK: 35,
      LRT1_MONUMENTO: 30,
      LRT1_5TH_AVENUE: 30,
      LRT1_R_PAPA: 30,
      LRT1_ABAD_SANTOS: 30,
      LRT1_BLUMENTRITT: 25,
      LRT1_TAYUMAN: 25,
      LRT1_BAMBANG: 25,
      LRT1_DOROTEO_JOSE: 25,
      LRT1_CARRIEDO: 25,
      LRT1_CENTRAL_TERMINAL: 25,
      LRT1_UN_AVENUE: 20,
      LRT1_PEDRO_GIL: 20,
      LRT1_QUIRINO: 20,
      LRT1_VITO_CRUZ: 20,
      LRT1_GIL_PUYAT: 15,
      LRT1_LIBERTAD: 15,
      LRT1_EDSA: 0, // same
      LRT1_BACLARAN: 15,
      LRT1_REDEMPTORIST: 20,
      LRT1_MIA: 20,
      LRT1_ASIA_WORLD: 20,
      LRT1_NINOY_AQUINO: 20,
      LRT1_DR_SANTOS: 25,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_BACLARAN: {
      LRT1_FPJ: 35,
      LRT1_BALINTAWAK: 35,
      LRT1_MONUMENTO: 30,
      LRT1_5TH_AVENUE: 30,
      LRT1_R_PAPA: 30,
      LRT1_ABAD_SANTOS: 30,
      LRT1_BLUMENTRITT: 30,
      LRT1_TAYUMAN: 25,
      LRT1_BAMBANG: 25,
      LRT1_DOROTEO_JOSE: 25,
      LRT1_CARRIEDO: 25,
      LRT1_CENTRAL_TERMINAL: 25,
      LRT1_UN_AVENUE: 20,
      LRT1_PEDRO_GIL: 20,
      LRT1_QUIRINO: 20,
      LRT1_VITO_CRUZ: 20,
      LRT1_GIL_PUYAT: 20,
      LRT1_LIBERTAD: 15,
      LRT1_EDSA: 15,
      LRT1_BACLARAN: 0, // same
      LRT1_REDEMPTORIST: 15,
      LRT1_MIA: 20,
      LRT1_ASIA_WORLD: 20,
      LRT1_NINOY_AQUINO: 20,
      LRT1_DR_SANTOS: 25,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_REDEMPTORIST: {
      LRT1_FPJ: 40,
      LRT1_BALINTAWAK: 35,
      LRT1_MONUMENTO: 35,
      LRT1_5TH_AVENUE: 35,
      LRT1_R_PAPA: 30,
      LRT1_ABAD_SANTOS: 30,
      LRT1_BLUMENTRITT: 30,
      LRT1_TAYUMAN: 30,
      LRT1_BAMBANG: 30,
      LRT1_DOROTEO_JOSE: 25,
      LRT1_CARRIEDO: 25,
      LRT1_CENTRAL_TERMINAL: 25,
      LRT1_UN_AVENUE: 25,
      LRT1_PEDRO_GIL: 25,
      LRT1_QUIRINO: 20,
      LRT1_VITO_CRUZ: 20,
      LRT1_GIL_PUYAT: 20,
      LRT1_LIBERTAD: 20,
      LRT1_EDSA: 20,
      LRT1_BACLARAN: 15,
      LRT1_REDEMPTORIST: 0, // same
      LRT1_MIA: 15,
      LRT1_ASIA_WORLD: 20,
      LRT1_NINOY_AQUINO: 20,
      LRT1_DR_SANTOS: 20,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_MIA: {
      LRT1_FPJ: 40,
      LRT1_BALINTAWAK: 40,
      LRT1_MONUMENTO: 35,
      LRT1_5TH_AVENUE: 35,
      LRT1_R_PAPA: 30,
      LRT1_ABAD_SANTOS: 30,
      LRT1_BLUMENTRITT: 30,
      LRT1_TAYUMAN: 30,
      LRT1_BAMBANG: 30,
      LRT1_DOROTEO_JOSE: 30,
      LRT1_CARRIEDO: 25,
      LRT1_CENTRAL_TERMINAL: 25,
      LRT1_UN_AVENUE: 25,
      LRT1_PEDRO_GIL: 25,
      LRT1_QUIRINO: 25,
      LRT1_VITO_CRUZ: 20,
      LRT1_GIL_PUYAT: 20,
      LRT1_LIBERTAD: 20,
      LRT1_EDSA: 20,
      LRT1_BACLARAN: 20,
      LRT1_REDEMPTORIST: 15,
      LRT1_MIA: 0, // same
      LRT1_ASIA_WORLD: 15,
      LRT1_NINOY_AQUINO: 20,
      LRT1_DR_SANTOS: 20,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_ASIA_WORLD: {
      LRT1_FPJ: 40,
      LRT1_BALINTAWAK: 40,
      LRT1_MONUMENTO: 35,
      LRT1_5TH_AVENUE: 35,
      LRT1_R_PAPA: 35,
      LRT1_ABAD_SANTOS: 35,
      LRT1_BLUMENTRITT: 30,
      LRT1_TAYUMAN: 30,
      LRT1_BAMBANG: 30,
      LRT1_DOROTEO_JOSE: 30,
      LRT1_CARRIEDO: 30,
      LRT1_CENTRAL_TERMINAL: 30,
      LRT1_UN_AVENUE: 25,
      LRT1_PEDRO_GIL: 25,
      LRT1_QUIRINO: 25,
      LRT1_VITO_CRUZ: 25,
      LRT1_GIL_PUYAT: 20,
      LRT1_LIBERTAD: 20,
      LRT1_EDSA: 20,
      LRT1_BACLARAN: 20,
      LRT1_REDEMPTORIST: 20,
      LRT1_MIA: 15,
      LRT1_ASIA_WORLD: 0, // same
      LRT1_NINOY_AQUINO: 15,
      LRT1_DR_SANTOS: 20,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_NINOY_AQUINO: {
      LRT1_FPJ: 45,
      LRT1_BALINTAWAK: 40,
      LRT1_MONUMENTO: 40,
      LRT1_5TH_AVENUE: 35,
      LRT1_R_PAPA: 35,
      LRT1_ABAD_SANTOS: 35,
      LRT1_BLUMENTRITT: 35,
      LRT1_TAYUMAN: 35,
      LRT1_BAMBANG: 30,
      LRT1_DOROTEO_JOSE: 30,
      LRT1_CARRIEDO: 30,
      LRT1_CENTRAL_TERMINAL: 30,
      LRT1_UN_AVENUE: 30,
      LRT1_PEDRO_GIL: 25,
      LRT1_QUIRINO: 25,
      LRT1_VITO_CRUZ: 25,
      LRT1_GIL_PUYAT: 25,
      LRT1_LIBERTAD: 25,
      LRT1_EDSA: 20,
      LRT1_BACLARAN: 20,
      LRT1_REDEMPTORIST: 20,
      LRT1_MIA: 20,
      LRT1_ASIA_WORLD: 15,
      LRT1_NINOY_AQUINO: 0, // same
      LRT1_DR_SANTOS: 15,
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
    LRT1_DR_SANTOS: {
      LRT1_FPJ: 45,
      LRT1_BALINTAWAK: 45,
      LRT1_MONUMENTO: 40,
      LRT1_5TH_AVENUE: 40,
      LRT1_R_PAPA: 35,
      LRT1_ABAD_SANTOS: 35,
      LRT1_BLUMENTRITT: 35,
      LRT1_TAYUMAN: 35,
      LRT1_BAMBANG: 35,
      LRT1_DOROTEO_JOSE: 35,
      LRT1_CARRIEDO: 30,
      LRT1_CENTRAL_TERMINAL: 30,
      LRT1_UN_AVENUE: 30,
      LRT1_PEDRO_GIL: 30,
      LRT1_QUIRINO: 30,
      LRT1_VITO_CRUZ: 25,
      LRT1_GIL_PUYAT: 25,
      LRT1_LIBERTAD: 25,
      LRT1_EDSA: 25,
      LRT1_BACLARAN: 25,
      LRT1_REDEMPTORIST: 20,
      LRT1_MIA: 20,
      LRT1_ASIA_WORLD: 20,
      LRT1_NINOY_AQUINO: 15,
      LRT1_DR_SANTOS: 0, // same
      LRT1_LAS_PINAS: 0,
      LRT1_ZAPOTE: 0,
      LRT1_NIOG: 0,
    },
  },
  LRT2: {
    LRT2_RECTO: {
      LRT2_RECTO: 0, // same
      LRT2_LEGARDA: 15,
      LRT2_PUREZA: 20,
      LRT2_V_MAPA: 20,
      LRT2_J_RUIZ: 20,
      LRT2_GILMORE: 25,
      LRT2_BETTY_GO_BELMONTE: 25,
      LRT2_CUBAO: 25,
      LRT2_ANONAS: 25,
      LRT2_KATIPUNAN: 30,
      LRT2_SANTOLAN: 30,
      LRT2_MARIKINA: 35,
      LRT2_ANTIPOLO: 35,
    },
    LRT2_LEGARDA: {
      LRT2_RECTO: 15,
      LRT2_LEGARDA: 0, // same
      LRT2_PUREZA: 15,
      LRT2_V_MAPA: 20,
      LRT2_J_RUIZ: 20,
      LRT2_GILMORE: 20,
      LRT2_BETTY_GO_BELMONTE: 25,
      LRT2_CUBAO: 25,
      LRT2_ANONAS: 25,
      LRT2_KATIPUNAN: 25,
      LRT2_SANTOLAN: 30,
      LRT2_MARIKINA: 30,
      LRT2_ANTIPOLO: 35,
    },
    LRT2_PUREZA: {
      LRT2_RECTO: 20,
      LRT2_LEGARDA: 15,
      LRT2_PUREZA: 0, // same
      LRT2_V_MAPA: 15,
      LRT2_J_RUIZ: 20,
      LRT2_GILMORE: 20,
      LRT2_BETTY_GO_BELMONTE: 20,
      LRT2_CUBAO: 20,
      LRT2_ANONAS: 25,
      LRT2_KATIPUNAN: 25,
      LRT2_SANTOLAN: 30,
      LRT2_MARIKINA: 30,
      LRT2_ANTIPOLO: 30,
    },
    LRT2_V_MAPA: {
      LRT2_RECTO: 20,
      LRT2_LEGARDA: 20,
      LRT2_PUREZA: 15,
      LRT2_V_MAPA: 0, // same
      LRT2_J_RUIZ: 15,
      LRT2_GILMORE: 20,
      LRT2_BETTY_GO_BELMONTE: 20,
      LRT2_CUBAO: 20,
      LRT2_ANONAS: 20,
      LRT2_KATIPUNAN: 25,
      LRT2_SANTOLAN: 25,
      LRT2_MARIKINA: 30,
      LRT2_ANTIPOLO: 30,
    },
    LRT2_J_RUIZ: {
      LRT2_RECTO: 20,
      LRT2_LEGARDA: 20,
      LRT2_PUREZA: 20,
      LRT2_V_MAPA: 15,
      LRT2_J_RUIZ: 0, // same
      LRT2_GILMORE: 15,
      LRT2_BETTY_GO_BELMONTE: 20,
      LRT2_CUBAO: 20,
      LRT2_ANONAS: 20,
      LRT2_KATIPUNAN: 20,
      LRT2_SANTOLAN: 25,
      LRT2_MARIKINA: 25,
      LRT2_ANTIPOLO: 30,
    },
    LRT2_GILMORE: {
      LRT2_RECTO: 25,
      LRT2_LEGARDA: 20,
      LRT2_PUREZA: 20,
      LRT2_V_MAPA: 20,
      LRT2_J_RUIZ: 15,
      LRT2_GILMORE: 0, // same
      LRT2_BETTY_GO_BELMONTE: 15,
      LRT2_CUBAO: 20,
      LRT2_ANONAS: 20,
      LRT2_KATIPUNAN: 20,
      LRT2_SANTOLAN: 25,
      LRT2_MARIKINA: 25,
      LRT2_ANTIPOLO: 30,
    },
    LRT2_BETTY_GO_BELMONTE: {
      LRT2_RECTO: 25,
      LRT2_LEGARDA: 25,
      LRT2_PUREZA: 20,
      LRT2_V_MAPA: 20,
      LRT2_J_RUIZ: 20,
      LRT2_GILMORE: 15,
      LRT2_BETTY_GO_BELMONTE: 0, // same
      LRT2_CUBAO: 15,
      LRT2_ANONAS: 20,
      LRT2_KATIPUNAN: 20,
      LRT2_SANTOLAN: 20,
      LRT2_MARIKINA: 25,
      LRT2_ANTIPOLO: 25,
    },
    LRT2_CUBAO: {
      LRT2_RECTO: 25,
      LRT2_LEGARDA: 25,
      LRT2_PUREZA: 20,
      LRT2_V_MAPA: 20,
      LRT2_J_RUIZ: 20,
      LRT2_GILMORE: 20,
      LRT2_BETTY_GO_BELMONTE: 15,
      LRT2_CUBAO: 0, // same
      LRT2_ANONAS: 15,
      LRT2_KATIPUNAN: 20,
      LRT2_SANTOLAN: 20,
      LRT2_MARIKINA: 25,
      LRT2_ANTIPOLO: 25,
    },
    LRT2_ANONAS: {
      LRT2_RECTO: 25,
      LRT2_LEGARDA: 25,
      LRT2_PUREZA: 25,
      LRT2_V_MAPA: 20,
      LRT2_J_RUIZ: 20,
      LRT2_GILMORE: 20,
      LRT2_BETTY_GO_BELMONTE: 20,
      LRT2_CUBAO: 15,
      LRT2_ANONAS: 0, // same
      LRT2_KATIPUNAN: 15,
      LRT2_SANTOLAN: 20,
      LRT2_MARIKINA: 20,
      LRT2_ANTIPOLO: 25,
    },
    LRT2_KATIPUNAN: {
      LRT2_RECTO: 30,
      LRT2_LEGARDA: 25,
      LRT2_PUREZA: 25,
      LRT2_V_MAPA: 25,
      LRT2_J_RUIZ: 20,
      LRT2_GILMORE: 20,
      LRT2_BETTY_GO_BELMONTE: 20,
      LRT2_CUBAO: 20,
      LRT2_ANONAS: 15,
      LRT2_KATIPUNAN: 0, // same
      LRT2_SANTOLAN: 20,
      LRT2_MARIKINA: 20,
      LRT2_ANTIPOLO: 25,
    },
    LRT2_SANTOLAN: {
      LRT2_RECTO: 30,
      LRT2_LEGARDA: 30,
      LRT2_PUREZA: 30,
      LRT2_V_MAPA: 25,
      LRT2_J_RUIZ: 25,
      LRT2_GILMORE: 25,
      LRT2_BETTY_GO_BELMONTE: 20,
      LRT2_CUBAO: 20,
      LRT2_ANONAS: 20,
      LRT2_KATIPUNAN: 20,
      LRT2_SANTOLAN: 0, // same
      LRT2_MARIKINA: 15,
      LRT2_ANTIPOLO: 20,
    },
    LRT2_MARIKINA: {
      LRT2_RECTO: 35,
      LRT2_LEGARDA: 30,
      LRT2_PUREZA: 30,
      LRT2_V_MAPA: 30,
      LRT2_J_RUIZ: 25,
      LRT2_GILMORE: 25,
      LRT2_BETTY_GO_BELMONTE: 25,
      LRT2_CUBAO: 25,
      LRT2_ANONAS: 20,
      LRT2_KATIPUNAN: 20,
      LRT2_SANTOLAN: 15,
      LRT2_MARIKINA: 0, // same
      LRT2_ANTIPOLO: 20,
    },
    LRT2_ANTIPOLO: {
      LRT2_RECTO: 35,
      LRT2_LEGARDA: 35,
      LRT2_PUREZA: 30,
      LRT2_V_MAPA: 30,
      LRT2_J_RUIZ: 30,
      LRT2_GILMORE: 30,
      LRT2_BETTY_GO_BELMONTE: 25,
      LRT2_CUBAO: 25,
      LRT2_ANONAS: 25,
      LRT2_KATIPUNAN: 25,
      LRT2_SANTOLAN: 20,
      LRT2_MARIKINA: 20,
      LRT2_ANTIPOLO: 0, // same
    },
  },
};
