export interface TransitLine {
  name: string;
  code: string;
  stations: Station[];
  color?: string;
  bgColor?: string;
  textColor?: string;

  stationActiveIcon?: string; // file path to icon
  stationInactiveIcon?: string; // file path to icon

  // pricing
  minFare?: number; // in PHP
  maxFare?: number; // in PHP
}

export interface Station {
  id: number;
  code: string;
  name: string;
  isOperational: boolean;
  image?: string;
  description?: string;
  edges?: Edge[];

  // geo
  coordinates?: { lat: number; lng: number }; // Geographic coordinates

  // auto derived line properties
  lineCode?: string;
  lineColor?: string;
  lineBgColor?: string;
  lineTextColor?: string;

  // auto derive from line
  stationActiveIcon?: string; // file path to icon
  stationInactiveIcon?: string; // file path to icon

  // properties used for pathing and mapping
  stationAction?:
    | 'board-initial'
    | 'board'
    | 'alight-and-transfer'
    | 'alight-end'
    | null;
  prevEdge?: Edge; // in pathfinding context, the actual edge taken to reach this station
  nextEdge?: Edge; // in pathfinding context, the actual edge to take to reach the next station
}

export interface Edge {
  // code: string;
  from?: string;
  to: string;
  weight: number;
  transferType: 'inter-station' | 'inter-line' | 'inter-modal';
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

  // price
  price?: number; // in PHP
}

export const TRANSIT_LINES: TransitLine[] = [
  {
    name: 'LRT 1',
    code: 'LRT1',
    color: 'green',
    bgColor: 'green',
    textColor: 'white',
    stationActiveIcon: 'assets/icons/station-active-lrt1.png',
    minFare: 1,
    maxFare: 3,
    stations: [
      {
        id: 1,
        code: 'LRT1_FPJ',
        name: 'Fernando Poe Jr. (formerly Roosevelt)',
        isOperational: true,
        image: '',
        description:
          'Northern terminus of LRT-1, serving the Muñoz area in Quezon City.',
        // 14.657615323114445, 121.02094825800144
        coordinates: { lat: 14.657615323114445, lng: 121.02094825800144 }, // FPJ Station
        edges: [
          {
            from: 'LRT1_FPJ',
            to: 'LRT1_BALINTAWAK',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        image: '',
        description: 'Located in Quezon City, near Balintawak Market.',
        // 14.657535163572017, 121.00386348386314
        coordinates: { lat: 14.657535163572017, lng: 121.00386348386314 }, // Balintawak Station
        edges: [
          {
            from: 'LRT1_BALINTAWAK',
            to: 'LRT1_FPJ',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
            path: [
              { lat: 14.657535163572017, lng: 121.00386348386314 }, // from me
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
        image: '',
        description:
          'A major station in Caloocan City, near the Bonifacio Monument.',
        // 14.65432216386683, 120.98384231447913
        coordinates: { lat: 14.65432216386683, lng: 120.98384231447913 }, // Monumento Station
        edges: [
          {
            from: 'LRT1_MONUMENTO',
            to: 'LRT1_BALINTAWAK',
            weight: 4,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.65432216386683, lng: 120.98384231447913 }, // from me
              { lat: 14.657535163572017, lng: 121.00386348386314 }, // to prev
            ],
          },
          {
            from: 'LRT1_MONUMENTO',
            to: 'LRT1_5TH_AVENUE',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
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
        image: '',
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
            path: [
              { lat: 14.644436303427462, lng: 120.983385695334 }, // from me
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
        image: '',
        description: 'Situated in Manila, near R. Papa Street.',
        // 14.636138537552963, 120.98228369673073
        coordinates: { lat: 14.636138537552963, lng: 120.98228369673073 }, // R. Papa Station
        edges: [
          {
            to: 'LRT1_5TH_AVENUE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.636138537552963, lng: 120.98228369673073 }, // from me
              { lat: 14.644436303427462, lng: 120.983385695334 }, // to prev
            ],
          },
          {
            to: 'LRT1_ABAD_SANTOS',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            price: 2,
            path: [
              { lat: 14.636138537552963, lng: 120.98228369673073 }, // from me
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
        image: '',
        description: 'Located in Manila, near Abad Santos Avenue.',
        // 14.630590938571148, 120.98129525929572
        coordinates: { lat: 14.630590938571148, lng: 120.98129525929572 }, // Abad Santos Station
        edges: [
          {
            to: 'LRT1_R_PAPA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.630590938571148, lng: 120.98129525929572 }, // from me
              { lat: 14.636138537552963, lng: 120.98228369673073 }, // to prev
            ],
          },
          {
            to: 'LRT1_BLUMENTRITT',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            price: 2,
            path: [
              { lat: 14.630590938571148, lng: 120.98129525929572 }, // from me
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
        image: '',
        description: 'A station in Manila, near Blumentritt Road.',
        // 14.622652585067982, 120.98286856250003
        coordinates: { lat: 14.622652585067982, lng: 120.98286856250003 }, // Blumentritt Station
        edges: [
          {
            to: 'LRT1_ABAD_SANTOS',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.622652585067982, lng: 120.98286856250003 }, // from me
              { lat: 14.630590938571148, lng: 120.98129525929572 }, // to prev
            ],
          },
          {
            to: 'LRT1_TAYUMAN',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        image: '',
        description: 'Located in Manila, near Tayuman Street.',
        // 14.61675788330022, 120.98270392147654
        coordinates: { lat: 14.61675788330022, lng: 120.98270392147654 }, // Tayuman Station
        edges: [
          {
            to: 'LRT1_BLUMENTRITT',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
            path: [
              { lat: 14.61675788330022, lng: 120.98270392147654 }, // from me
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
        image: '',
        description: 'Situated in Manila, near Bambang Street.',
        // 14.61117057596535, 120.9822890904357
        coordinates: { lat: 14.61117057596535, lng: 120.9822890904357 }, // Bambang Station
        edges: [
          {
            to: 'LRT1_TAYUMAN',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.61117057596535, lng: 120.9822890904357 }, // from me
              { lat: 14.61675788330022, lng: 120.98270392147654 }, // to prev
            ],
          },
          {
            to: 'LRT1_DOROTEO_JOSE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        image: '',
        description: 'A major transfer point in Manila, connecting to LRT-2.',
        // 14.605461953754634, 120.98194541980351
        coordinates: { lat: 14.605461953754634, lng: 120.98194541980351 }, // Doroteo Jose Station
        edges: [
          {
            to: 'LRT1_BAMBANG',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
            path: [
              { lat: 14.605461953754634, lng: 120.98194541980351 }, // from me
              { lat: 14.59904708041471, lng: 120.98140067370474 }, // to next
            ],
          },
          {
            from: 'LRT1_DOROTEO_JOSE',
            to: 'LRT2_RECTO',
            weight: 2,
            transferType: 'inter-line',
            transitMode: 'walk',
            isOperational: true,
            transferDescription: 'Connected via an elevated walkway.',
            transferDistance: 'Approximately 2-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'Separate fare required',
            direction: 'northbound', // Assuming Recto is northbound relative to LRT-1 Doroteo Jose
            path: [
              { lat: 14.605461953754634, lng: 120.98194541980351 }, // from me
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
        image: '',
        description: 'Located in Manila, near Carriedo Street.',
        // 14.59904708041471, 120.98140067370474
        coordinates: { lat: 14.59904708041471, lng: 120.98140067370474 }, // Carriedo Station
        edges: [
          {
            to: 'LRT1_DOROTEO_JOSE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.59904708041471, lng: 120.98140067370474 }, // from me
              { lat: 14.605461953754634, lng: 120.98194541980351 }, // to
            ],
          },
          {
            to: 'LRT1_CENTRAL_TERMINAL',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.59904708041471, lng: 120.98140067370474 }, // from me
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
        image: '',
        description: 'Situated in Manila, near the Manila City Hall.',
        // 14.592772584129786, 120.98160257975337
        coordinates: { lat: 14.592772584129786, lng: 120.98160257975337 }, // Central Terminal Station
        edges: [
          {
            to: 'LRT1_CARRIEDO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.592772584129786, lng: 120.98160257975337 }, // from me
              { lat: 14.59904708041471, lng: 120.98140067370474 }, // to prev
            ],
          },
          {
            to: 'LRT1_UN_AVENUE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.592772584129786, lng: 120.98160257975337 }, // from me
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
        image: '',
        description: 'Located in Manila, near the United Nations Avenue.',
        // 14.582547796804986, 120.98454208223805
        coordinates: { lat: 14.582547796804986, lng: 120.98454208223805 }, // UN Avenue Station
        edges: [
          {
            to: 'LRT1_CENTRAL_TERMINAL',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.582547796804986, lng: 120.98454208223805 }, // from me
              { lat: 14.592772584129786, lng: 120.98160257975337 }, // to prev
            ],
          },
          {
            to: 'LRT1_PEDRO_GIL',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        image: '',
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
        image: '',
        description: 'Located in Manila, near Quirino Avenue.',
        // 14.570502454798115, 120.99151131231389
        coordinates: { lat: 14.570502454798115, lng: 120.99151131231389 }, // Quirino Station
        edges: [
          {
            to: 'LRT1_PEDRO_GIL',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        image: '',
        description: 'Situated in Manila, near Vito Cruz Street.',
        // 14.563565052791175, 120.99481603865144
        coordinates: { lat: 14.563565052791175, lng: 120.99481603865144 }, // Vito Cruz Station
        edges: [
          {
            to: 'LRT1_QUIRINO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
            path: [
              { lat: 14.563565052791175, lng: 120.99481603865144 }, // from me
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
        image: '',
        description: 'Located in Pasay City, near Gil Puyat Avenue.',
        // 14.55428697609849, 120.99712587034271
        coordinates: { lat: 14.55428697609849, lng: 120.99712587034271 }, // Gil Puyat Station
        edges: [
          {
            to: 'LRT1_VITO_CRUZ',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.55428697609849, lng: 120.99712587034271 }, // from me
              { lat: 14.563565052791175, lng: 120.99481603865144 }, // to prev
            ],
          },
          {
            to: 'LRT1_LIBERTAD',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        image: '',
        description: 'Situated in Pasay City, near Libertad Street.',
        // 14.547796780097222, 120.99855948289108
        coordinates: { lat: 14.547796780097222, lng: 120.99855948289108 }, // Libertad Station
        edges: [
          {
            to: 'LRT1_GIL_PUYAT',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        image: '',
        description:
          'Located in Pasay City, near the intersection of Taft Avenue and Epifanio de los Santos Avenue (EDSA).',
        // 14.538714843616395, 121.00063929330985
        coordinates: { lat: 14.538714843616395, lng: 121.00063929330985 }, // EDSA Station
        edges: [
          {
            to: 'LRT1_LIBERTAD',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
            path: [
              { lat: 14.538714843616395, lng: 121.00063929330985 }, // from me
              { lat: 14.534216158572693, lng: 120.99823494117172 }, // to next
            ],
          },
          {
            from: 'LRT1_EDSA',
            to: 'MRT3_TAFT_AVENUE',
            weight: 5, // Approximate walking time in minutes
            transferType: 'inter-line',
            transitMode: 'walk',
            isOperational: true,
            transferDescription: 'Connected via a covered footbridge.',
            transferDistance: 'Approximately a 5-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'Separate fare required',
            direction: 'northbound', // Assuming MRT-3 Taft Avenue is northbound relative to LRT-1 EDSA
            path: [
              { lat: 14.538714843616395, lng: 121.00063929330985 }, // from me
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
        image: '',
        description:
          'Southern terminus of the original LRT-1 line, located in Parañaque City.',
        // 14.534216158572693, 120.99823494117172
        coordinates: { lat: 14.534216158572693, lng: 120.99823494117172 }, // Baclaran Station
        edges: [
          {
            to: 'LRT1_EDSA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.534216158572693, lng: 120.99823494117172 }, // from me
              { lat: 14.538714843616395, lng: 121.00063929330985 }, // to prev
            ],
          },
          {
            to: 'LRT1_REDEMPTORIST',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.534216158572693, lng: 120.99823494117172 }, // from me
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
        image: '',
        description: 'Located in Parañaque City, near the Redemptorist Church.',
        // 14.530231044787087, 120.99278168609546
        coordinates: { lat: 14.530231044787087, lng: 120.99278168609546 }, // Redemptorist Station
        edges: [
          {
            to: 'LRT1_BACLARAN',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.530231044787087, lng: 120.99278168609546 }, // from me
              { lat: 14.534216158572693, lng: 120.99823494117172 }, // to prev
            ],
          },
          {
            to: 'LRT1_MIA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.530231044787087, lng: 120.99278168609546 }, // from me
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
        image: '',
        description:
          'Situated near the Ninoy Aquino International Airport (NAIA) complex.',
        // 14.518510885287759, 120.99286667487398
        coordinates: { lat: 14.518510885287759, lng: 120.99286667487398 }, // MIA
        edges: [
          {
            to: 'LRT1_REDEMPTORIST',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.518510885287759, lng: 120.99286667487398 }, // from me
              { lat: 14.530231044787087, lng: 120.99278168609546 }, // to prev
            ],
          },
          {
            to: 'LRT1_ASIA_WORLD',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.518510885287759, lng: 120.99286667487398 }, // from me
              { lat: 14.50845418511056, lng: 120.99118615050102 }, // to next
            ],
          },
        ],
      },
      {
        id: 23,
        code: 'LRT1_ASIA_WORLD',
        name: 'Asia World',
        isOperational: true,
        image: '',
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
            path: [
              { lat: 14.50845418511056, lng: 120.99118615050102 }, // from me
              { lat: 14.518510885287759, lng: 120.99286667487398 }, // to prev
            ],
          },
          {
            to: 'LRT1_NINOY_AQUINO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.50845418511056, lng: 120.99118615050102 }, // from me
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
        image: '',
        description: 'Situated along Ninoy Aquino Avenue in Parañaque City.',
        // 14.498914085756669, 120.99427694903393
        coordinates: { lat: 14.498914085756669, lng: 120.99427694903393 }, // Ninoy Aquino
        edges: [
          {
            to: 'LRT1_ASIA_WORLD',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.498914085756669, lng: 120.99427694903393 }, // from me
              { lat: 14.50845418511056, lng: 120.99118615050102 }, // to prev
            ],
          },
          {
            to: 'LRT1_DR_SANTOS',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.498914085756669, lng: 120.99427694903393 }, // from me
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
        image: '',
        description: 'Located in Parañaque City, near Dr. Santos Avenue.',
        // 14.485487817830236, 120.98938956143442
        coordinates: { lat: 14.485487817830236, lng: 120.98938956143442 }, // Dr. Santos
        edges: [
          {
            to: 'LRT1_NINOY_AQUINO',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.485487817830236, lng: 120.98938956143442 }, // from me
              { lat: 14.498914085756669, lng: 120.99427694903393 }, // to prev
            ],
          },
          {
            to: 'LRT1_LAS_PINAS',
            weight: 3,
            isOperational: false,
            transferType: 'inter-station',
            path: [
              { lat: 14.485487817830236, lng: 120.98938956143442 }, // from me
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
            transferType: 'inter-station',
            path: [
              { lat: 14.474573544628553, lng: 120.97574500672548 }, // from me
              { lat: 14.485487817830236, lng: 120.98938956143442 }, // to prev
            ],
          },
          {
            to: 'LRT1_ZAPOTE',
            weight: 3,
            isOperational: false,
            transferType: 'inter-station',
            path: [
              { lat: 14.474573544628553, lng: 120.97574500672548 }, // from me
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
        image: '',
        description:
          'Planned station near the Zapote area, serving both Las Piñas and Bacoor.',
        // 14.471764874184087, 120.96763115622156
        coordinates: { lat: 14.471764874184087, lng: 120.96763115622156 }, // Zapote
        edges: [
          {
            to: 'LRT1_LAS_PINAS',
            weight: 3,
            isOperational: false,
            transferType: 'inter-station',
            path: [
              { lat: 14.471764874184087, lng: 120.96763115622156 }, // from me
              { lat: 14.474573544628553, lng: 120.97574500672548 }, // to prev
            ],
          },
          {
            to: 'LRT1_NIOG',
            weight: 4,
            isOperational: false,
            transferType: 'inter-station',
            path: [
              { lat: 14.471764874184087, lng: 120.96763115622156 }, // from me
              { lat: 14.456928825088548, lng: 120.95956023328004 }, // to next
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
        // 14.456928825088548, 120.95956023328004
        coordinates: { lat: 14.456928825088548, lng: 120.95956023328004 }, // Niog
        edges: [
          {
            to: 'LRT1_ZAPOTE',
            weight: 4,
            isOperational: false,
            transferType: 'inter-station',
            path: [
              { lat: 14.456928825088548, lng: 120.95956023328004 }, // from me
              { lat: 14.471764874184087, lng: 120.96763115622156 }, // to prev
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'LRT 2',
    code: 'LRT2',
    color: 'blue',
    bgColor: 'blue',
    textColor: 'white',
    stationActiveIcon: 'assets/icons/station-active-lrt2.png',
    minFare: 10,
    maxFare: 30,
    stations: [
      {
        id: 1,
        code: 'LRT2_ANTIPOLO',
        name: 'Antipolo',
        isOperational: true,
        image: '',
        description: 'Eastern terminus of LRT-2, located in Antipolo, Rizal.',
        // 14.624824811486416, 121.121248307
        coordinates: { lat: 14.624824811486416, lng: 121.121248307 }, // Antipolo Station
        edges: [
          {
            from: 'LRT2_ANTIPOLO',
            to: 'LRT2_MARIKINA',
            weight: 4,
            transferType: 'inter-station',
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
        name: 'Marikina',
        isOperational: true,
        image: '',
        description: 'Located in Marikina City, near major commercial areas.',
        // 14.62052076177822, 121.10074150354535
        coordinates: { lat: 14.62052076177822, lng: 121.10074150354535 }, // Marikina Station
        edges: [
          {
            from: 'LRT2_MARIKINA',
            to: 'LRT2_ANTIPOLO',
            weight: 4,
            transferType: 'inter-station',
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
            isOperational: true,
            transferDescription: 'Direct train service to Santolan station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.62052076177822, lng: 121.10074150354535 }, // from me
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
        image: '',
        description:
          'Located along Marcos Highway, near the boundary of Marikina and Pasig.',
        // 14.622135967911797, 121.08597686462393
        coordinates: { lat: 14.622135967911797, lng: 121.08597686462393 }, // Santolan Station
        edges: [
          {
            from: 'LRT2_SANTOLAN',
            to: 'LRT2_MARIKINA',
            weight: 3,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to Marikina station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.622135967911797, lng: 121.08597686462393 }, // from me
              { lat: 14.62052076177822, lng: 121.10074150354535 }, // to prev
            ],
          },
          {
            from: 'LRT2_SANTOLAN',
            to: 'LRT2_KATIPUNAN',
            weight: 4,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to Katipunan station.',
            transferDistance: 'Approximately 4 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.622135967911797, lng: 121.08597686462393 }, // from me
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
        image: '',
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
            isOperational: true,
            transferDescription: 'Direct train service to Santolan station.',
            transferDistance: 'Approximately 4 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.630800864143024, lng: 121.07271230628201 }, // from me
              { lat: 14.622135967911797, lng: 121.08597686462393 }, // to prev
            ],
          },
          {
            from: 'LRT2_KATIPUNAN',
            to: 'LRT2_ANONAS',
            weight: 2,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to Anonas station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.630800864143024, lng: 121.07271230628201 }, // from me
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
        image: '',
        description: 'Located in Project 3, Quezon City, near Anonas Street.',
        // 14.628043289011293, 121.06482289673204
        coordinates: { lat: 14.628043289011293, lng: 121.06482289673204 }, // Anonas Station
        edges: [
          {
            from: 'LRT2_ANONAS',
            to: 'LRT2_KATIPUNAN',
            weight: 2,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to Katipunan station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.628043289011293, lng: 121.06482289673204 }, // from me
              { lat: 14.630800864143024, lng: 121.07271230628201 }, // to prev
            ],
          },
          {
            from: 'LRT2_ANONAS',
            to: 'LRT2_CUBAO',
            weight: 3,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to Cubao station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.628043289011293, lng: 121.06482289673204 }, // from me
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
        image: '',
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
            isOperational: true,
            transferDescription:
              'Direct train service from Cubao to Anonas station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.622724831527815, lng: 121.05266770816854 }, // from me
              { lat: 14.628043289011293, lng: 121.06482289673204 }, // to prev
            ],
          },
          {
            from: 'LRT2_CUBAO',
            to: 'LRT2_BETTY_GO_BELMONTE',
            weight: 2,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription:
              'Direct train service to Betty Go-Belmonte station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.622724831527815, lng: 121.05266770816854 }, // from me
              { lat: 14.618744832179202, lng: 121.04278254495594 }, // to next
            ],
          },
          {
            from: 'LRT2_CUBAO',
            to: 'MRT3_CUBAO',
            weight: 5,
            transferType: 'inter-line',
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
              { lat: 14.61954088328936, lng: 121.05094326122577 }, // to next line
            ],
          },
        ],
      },
      {
        id: 7,
        code: 'LRT2_BETTY_GO_BELMONTE',
        name: 'Betty Go-Belmonte',
        isOperational: true,
        image: '',
        description: 'Situated in Quezon City, near New Manila.',
        // 14.618744832179202, 121.04278254495594
        coordinates: { lat: 14.618744832179202, lng: 121.04278254495594 }, // Betty Go-Belmonte Station
        edges: [
          {
            from: 'LRT2_BETTY_GO_BELMONTE',
            to: 'LRT2_CUBAO',
            weight: 2,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to Cubao station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.618744832179202, lng: 121.04278254495594 }, // from me
              { lat: 14.622724831527815, lng: 121.05266770816854 }, // to prev
            ],
          },
          {
            from: 'LRT2_BETTY_GO_BELMONTE',
            to: 'LRT2_GILMORE',
            weight: 2,
            transferType: 'inter-station',
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
        image: '',
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
            isOperational: true,
            transferDescription: 'Direct train service to J. Ruiz station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.613660961641079, lng: 121.0345201516396 }, // from me
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
        image: '',
        description:
          'Located in San Juan City, near J. Ruiz Street and residential areas.',
        // 14.610667645518005, 121.02633594643939
        coordinates: { lat: 14.610667645518005, lng: 121.02633594643939 }, // J. Ruiz Station
        edges: [
          {
            from: 'LRT2_J_RUIZ',
            to: 'LRT2_GILMORE',
            weight: 2,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to Gilmore station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.610667645518005, lng: 121.02633594643939 }, // from me
              { lat: 14.613660961641079, lng: 121.0345201516396 }, // to prev
            ],
          },
          {
            from: 'LRT2_J_RUIZ',
            to: 'LRT2_V_MAPA',
            weight: 2,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to V. Mapa station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.610667645518005, lng: 121.02633594643939 }, // from me
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
        image: '',
        description: 'Located in Santa Mesa, Manila, near V. Mapa High School.',
        // 14.604210926251874, 121.01734453043514
        coordinates: { lat: 14.604210926251874, lng: 121.01734453043514 }, // V. Mapa Station
        edges: [
          {
            from: 'LRT2_V_MAPA',
            to: 'LRT2_J_RUIZ',
            weight: 2,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to J. Ruiz station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.604210926251874, lng: 121.01734453043514 }, // from me
              { lat: 14.610667645518005, lng: 121.02633594643939 }, // to prev
            ],
          },
          {
            from: 'LRT2_V_MAPA',
            to: 'LRT2_PUREZA',
            weight: 2,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to Pureza station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.604210926251874, lng: 121.01734453043514 }, // from me
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
        image: '',
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
            isOperational: true,
            transferDescription: 'Direct train service to V. Mapa station.',
            transferDistance: 'Approximately 2 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.601759353452428, lng: 121.0052661412116 }, // from me
              { lat: 14.604210926251874, lng: 121.01734453043514 }, // to prev
            ],
          },
          {
            from: 'LRT2_PUREZA',
            to: 'LRT2_LEGARDA',
            weight: 3,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to Legarda station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.601759353452428, lng: 121.0052661412116 }, // from me
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
        image: '',
        description: 'Located in Sampaloc, Manila, near Legarda Street.',
        // 14.600864578161373, 120.99250867046764
        coordinates: { lat: 14.600864578161373, lng: 120.99250867046764 }, // Legarda Station
        edges: [
          {
            from: 'LRT2_LEGARDA',
            to: 'LRT2_PUREZA',
            weight: 3,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to Pureza station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            price: 2,
            path: [
              { lat: 14.600864578161373, lng: 120.99250867046764 }, // from me
              { lat: 14.601759353452428, lng: 121.0052661412116 }, // to prev
            ],
          },
          {
            from: 'LRT2_LEGARDA',
            to: 'LRT2_RECTO',
            weight: 3,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to Recto station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.600864578161373, lng: 120.99250867046764 }, // from me
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
        image: '',
        description:
          'Western terminus of LRT-2, located in Manila, near University Belt.',
        // 14.60348141245216, 120.9834813414183
        coordinates: { lat: 14.60348141245216, lng: 120.9834813414183 }, // Recto Station
        edges: [
          {
            from: 'LRT2_RECTO',
            to: 'LRT2_LEGARDA',
            weight: 3,
            transferType: 'inter-station',
            isOperational: true,
            transferDescription: 'Direct train service to Legarda station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            price: 2,
            path: [
              { lat: 14.60348141245216, lng: 120.9834813414183 }, // from me
              { lat: 14.600864578161373, lng: 120.99250867046764 }, // to prev
            ],
          },
          {
            from: 'LRT2_RECTO',
            to: 'LRT1_DOROTEO_JOSE',
            weight: 5,
            transferType: 'inter-line',
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
        edges: [
          {
            from: 'LRT2_TUTUBAN',
            to: 'LRT2_RECTO',
            weight: 3,
            transferType: 'inter-station',
            isOperational: false,
            transferDescription: 'Direct train service to Recto station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.606363198972117, lng: 120.97193630977111 }, // from me
              { lat: 14.60348141245216, lng: 120.9834813414183 }, // to next
            ],
          },
          {
            from: 'LRT2_TUTUBAN',
            to: 'LRT2_DIVISORIA',
            weight: 3,
            transferType: 'inter-station',
            isOperational: false,
            transferDescription: 'Direct train service to Divisoria station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.606363198972117, lng: 120.97193630977111 }, // from me
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
        edges: [
          {
            from: 'LRT2_DIVISORIA',
            to: 'LRT2_TUTUBAN',
            weight: 3,
            transferType: 'inter-station',
            isOperational: false,
            transferDescription: 'Direct train service to Tutuban station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.602790069620127, lng: 120.96755569678145 }, // from me
              { lat: 14.606363198972117, lng: 120.97193630977111 }, // to prev
            ],
          },
          {
            from: 'LRT2_DIVISORIA',
            to: 'LRT2_PIER_4',
            weight: 3,
            transferType: 'inter-station',
            isOperational: false,
            transferDescription: 'Direct train service to Pier 4 station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'westbound',
            path: [
              { lat: 14.602790069620127, lng: 120.96755569678145 }, // from me
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
        edges: [
          {
            from: 'LRT2_PIER_4',
            to: 'LRT2_DIVISORIA',
            weight: 3,
            transferType: 'inter-station',
            isOperational: false,
            transferDescription: 'Direct train service to Divisoria station.',
            transferDistance: 'Approximately 3 minutes by train',
            accessibility: 'Elevators and escalators available',
            additionalCost: 'None',
            direction: 'eastbound',
            path: [
              { lat: 14.602524631445576, lng: 120.96157707895948 }, // from me
              { lat: 14.602790069620127, lng: 120.96755569678145 }, // to prev
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'MRT 3',
    code: 'MRT3',
    color: 'yellow',
    bgColor: 'yellow',
    textColor: 'black',
    stationActiveIcon: 'assets/icons/station-active-mrt3.png',
    stations: [
      {
        id: 1,
        code: 'MRT3_NORTH_AVENUE',
        name: 'North Avenue',
        isOperational: true,
        image: '',
        description:
          'Northern terminus of MRT-3, adjacent to TriNoma Mall and near SM City North EDSA.',
        // 14.652169907896354, 121.03226455190827
        coordinates: { lat: 14.652169907896354, lng: 121.03226455190827 }, // North Avenue Station
        edges: [
          {
            to: 'MRT3_QUEZON_AVENUE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        image: '',
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
        image: '',
        description:
          'Situated near GMA Network Center and accessible to Kamuning Road.',
        // 14.635217035522803, 121.0434184846183
        coordinates: { lat: 14.635217035522803, lng: 121.0434184846183 }, // GMA-Kamuning Station
        edges: [
          {
            to: 'MRT3_QUEZON_AVENUE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
            path: [
              { lat: 14.635217035522803, lng: 121.0434184846183 }, // from me
              { lat: 14.61954088328936, lng: 121.05094326122577 }, // to next
            ],
          },
        ],
      },
      {
        id: 4,
        code: 'MRT3_CUBAO',
        name: 'Araneta Center-Cubao',
        isOperational: true,
        image: '',
        description:
          'Integrated with Araneta City, providing connections to LRT Line 2 and access to shopping centers like Gateway Mall.',
        // 14.61954088328936, 121.05094326122577
        coordinates: { lat: 14.61954088328936, lng: 121.05094326122577 }, // Cubao Station
        edges: [
          {
            to: 'MRT3_GMA_KAMUNING',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.61954088328936, lng: 121.05094326122577 }, // from me
              { lat: 14.635217035522803, lng: 121.0434184846183 }, // to prev
            ],
          },
          {
            to: 'MRT3_SANTOLAN_ANNAPOLIS',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.61954088328936, lng: 121.05094326122577 }, // from me
              { lat: 14.607819718187484, lng: 121.05634098040402 }, // to next
            ],
          },
          {
            from: 'MRT3_CUBAO',
            to: 'LRT2_CUBAO',
            weight: 5,
            transferType: 'inter-line',
            transitMode: 'walk',
            isOperational: true,
            transferDescription:
              'Connected via a covered walkway inside the Araneta City complex.',
            transferDistance: 'Approximately 5-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'Separate fare required',
            direction: 'southbound', // Assuming LRT-2 Cubao is southbound relative to MRT-3 Cubao
            path: [
              { lat: 14.61954088328936, lng: 121.05094326122577 }, // from me
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
        image: '',
        description:
          'Positioned near Greenhills Shopping Center and various commercial establishments.',
        // 14.607819718187484, 121.05634098040402
        coordinates: { lat: 14.607819718187484, lng: 121.05634098040402 }, // Santolan-Annapolis Station
        edges: [
          {
            to: 'MRT3_CUBAO',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.607819718187484, lng: 121.05634098040402 }, // from me
              { lat: 14.61954088328936, lng: 121.05094326122577 }, // to prev
            ],
          },
          {
            to: 'MRT3_ORTIGAS',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.607819718187484, lng: 121.05634098040402 }, // from me
              { lat: 14.588041121351441, lng: 121.05694278354636 }, // to next
            ],
          },
        ],
      },
      {
        id: 6,
        code: 'MRT3_ORTIGAS',
        name: 'Ortigas',
        isOperational: true,
        image: '',
        description:
          'Serves the Ortigas Central Business District, with proximity to SM Megamall and Robinsons Galleria.',
        // 14.588041121351441, 121.05694278354636
        coordinates: { lat: 14.588041121351441, lng: 121.05694278354636 }, // Ortigas Station
        edges: [
          {
            to: 'MRT3_SANTOLAN_ANNAPOLIS',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.588041121351441, lng: 121.05694278354636 }, // from me
              { lat: 14.607819718187484, lng: 121.05634098040402 }, // to prev
            ],
          },
          {
            to: 'MRT3_SHAW_BOULEVARD',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.588041121351441, lng: 121.05694278354636 }, // from me
              { lat: 14.58146097152234, lng: 121.05362348774825 }, // to next
            ],
          },
        ],
      },
      {
        id: 7,
        code: 'MRT3_SHAW_BOULEVARD',
        name: 'Shaw Boulevard',
        isOperational: true,
        image: '',
        description:
          'Located near Shangri-La Plaza and Starmall EDSA-Shaw, serving as a major transfer point for commuters.',
        // 14.58146097152234, 121.05362348774825
        coordinates: { lat: 14.58146097152234, lng: 121.05362348774825 }, // Shaw Boulevard Station
        edges: [
          {
            to: 'MRT3_ORTIGAS',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.58146097152234, lng: 121.05362348774825 }, // from me
              { lat: 14.588041121351441, lng: 121.05694278354636 }, // to prev
            ],
          },
          {
            to: 'MRT3_BONI',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.58146097152234, lng: 121.05362348774825 }, // from me
              { lat: 14.574314844661698, lng: 121.04829707172406 }, // to next
            ],
          },
        ],
      },
      {
        id: 8,
        code: 'MRT3_BONI',
        name: 'Boni',
        isOperational: true,
        image: '',
        description:
          'Provides access to the Pioneer area and nearby commercial establishments.',
        // 14.574314844661698, 121.04829707172406
        coordinates: { lat: 14.574314844661698, lng: 121.04829707172406 }, // Boni Station
        edges: [
          {
            to: 'MRT3_SHAW_BOULEVARD',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.574314844661698, lng: 121.04829707172406 }, // from me
              { lat: 14.58146097152234, lng: 121.05362348774825 }, // to prev
            ],
          },
          {
            to: 'MRT3_GUADALUPE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.574314844661698, lng: 121.04829707172406 }, // from me
              { lat: 14.567224719862711, lng: 121.0465297922152 }, // to next
            ],
          },
        ],
      },
      {
        id: 9,
        code: 'MRT3_GUADALUPE',
        name: 'Guadalupe',
        isOperational: true,
        image: '',
        description:
          'Situated near Guadalupe Nuevo and Guadalupe Viejo, with access to the Pasig River ferry service.',
        // 14.567224719862711, 121.0465297922152
        coordinates: { lat: 14.567224719862711, lng: 121.0465297922152 }, // Guadalupe Station
        edges: [
          {
            to: 'MRT3_BONI',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.567224719862711, lng: 121.0465297922152 }, // from me
              { lat: 14.574314844661698, lng: 121.04829707172406 }, // to prev
            ],
          },
          {
            to: 'MRT3_BUENDIA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.567224719862711, lng: 121.0465297922152 }, // from me
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
        image: '',
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
            path: [
              { lat: 14.554615536966176, lng: 121.0344275884317 }, // from me
              { lat: 14.567224719862711, lng: 121.0465297922152 }, // to prev
            ],
          },
          {
            to: 'MRT3_AYALA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        image: '',
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
        image: '',
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
            path: [
              { lat: 14.542176999516412, lng: 121.01968479687375 }, // from me
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
        image: '',
        description:
          'Southern terminus of MRT-3, located at the intersection of EDSA and Taft Avenue in Pasay City. Provides a vital transfer point to LRT Line 1 via a connecting footbridge to EDSA Station, facilitating seamless north-south travel across Metro Manila.',
        // 14.53768596175474, 121.00178304515234
        coordinates: { lat: 14.53768596175474, lng: 121.00178304515234 }, // Taft Avenue Station
        edges: [
          {
            to: 'MRT3_MAGALLANES',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.53768596175474, lng: 121.00178304515234 }, // from me
              { lat: 14.542176999516412, lng: 121.01968479687375 }, // to prev
            ],
          },
          {
            from: 'MRT3_TAFT_AVENUE',
            to: 'LRT1_EDSA',
            weight: 5, // Approximate walking time in minutes
            transferType: 'inter-line',
            transitMode: 'walk',
            isOperational: true,
            transferDescription: 'Connected via a covered footbridge.',
            transferDistance: 'Approximately a 5-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'Separate fare required',
            direction: 'southbound', // Assuming LRT-1 EDSA is southbound relative to MRT-3 Taft Avenue
            path: [
              { lat: 14.53768596175474, lng: 121.00178304515234 }, // from me
              { lat: 14.538714843616395, lng: 121.00063929330985 }, // to next line
            ],
          },
        ],
      },
    ],
  },
  // Add more transit lines as needed
];
