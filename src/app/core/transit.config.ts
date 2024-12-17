export interface Edge {
  from?: string;
  to: string;
  weight: number;
  transferType: 'inter-station' | 'inter-line' | 'inter-modal';
  isOperational: boolean;
  transferDescription?: string;
  transferDistance?: string;
  accessibility?: string;
  additionalCost?: string;
  direction?: string; // northbound, southbound, eastbound, westbound, clockwise, counterclockwise

  // geo
  path?: { lat: number; lng: number }[]; // Sequence of coordinates defining the path
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
}

export interface TransitLine {
  name: string;
  code: string;
  stations: Station[];
  color?: string;
  bgColor?: string;
  textColor?: string;
}

export const TRANSIT_LINES: TransitLine[] = [
  {
    name: 'LRT 1',
    code: 'LRT1',
    color: 'green',
    bgColor: 'green',
    textColor: 'white',
    stations: [
      {
        id: 1,
        code: 'LRT1_FPJ',
        name: 'Fernando Poe Jr. (formerly Roosevelt)',
        isOperational: true,
        image: '',
        description:
          'Northern terminus of LRT-1, serving the Muñoz area in Quezon City.',
        coordinates: { lat: 14.65765, lng: 121.02121 }, // FPJ Station
        edges: [
          {
            to: 'LRT1_BALINTAWAK',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.6575, lng: 121.0207 },
              { lat: 14.65745, lng: 121.00378 },
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
        coordinates: { lat: 14.65745, lng: 121.00378 }, // Balintawak Station
        edges: [
          {
            to: 'LRT1_FPJ',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.65765, lng: 121.02121 },
              { lat: 14.65745, lng: 121.00378 },
            ],
          },
          {
            to: 'LRT1_MONUMENTO',
            weight: 4,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.65745, lng: 121.00378 },
              { lat: 14.65444, lng: 120.98378 },
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
        coordinates: { lat: 14.65444, lng: 120.98378 }, // Monumento Station
        edges: [
          {
            to: 'LRT1_BALINTAWAK',
            weight: 4,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.65745, lng: 121.00378 },
              { lat: 14.65444, lng: 120.98378 },
            ],
          },
          {
            to: 'LRT1_5TH_AVENUE',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.65444, lng: 120.98378 },
              { lat: 14.644455, lng: 120.983474 },
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
        coordinates: { lat: 14.644455, lng: 120.983474 }, // 5th Avenue Station
        edges: [
          {
            to: 'LRT1_MONUMENTO',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.65444, lng: 120.98378 },
              { lat: 14.644455, lng: 120.983474 },
            ],
          },
          {
            to: 'LRT1_R_PAPA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.644455, lng: 120.983474 },
              { lat: 14.63619, lng: 120.98239 },
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
        coordinates: { lat: 14.63619, lng: 120.98239 }, // R. Papa Station
        edges: [
          {
            to: 'LRT1_5TH_AVENUE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.644455, lng: 120.983474 },
              { lat: 14.63619, lng: 120.98239 },
            ],
          },
          {
            to: 'LRT1_ABAD_SANTOS',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
            path: [
              { lat: 14.63619, lng: 120.98239 },
              { lat: 14.63061, lng: 120.98147 },
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
        edges: [
          {
            to: 'LRT1_R_PAPA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_BLUMENTRITT',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_ABAD_SANTOS',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_TAYUMAN',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_BLUMENTRITT',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_BAMBANG',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_TAYUMAN',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_DOROTEO_JOSE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_BAMBANG',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_CARRIEDO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            from: 'LRT1_DOROTEO_JOSE',
            to: 'LRT2_RECTO',
            weight: 2,
            transferType: 'inter-line',
            isOperational: true,
            transferDescription: 'Connected via an elevated walkway.',
            transferDistance: 'Approximately 2-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'Separate fare required',
            direction: 'northbound', // Assuming Recto is northbound relative to LRT-1 Doroteo Jose
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
        edges: [
          {
            to: 'LRT1_DOROTEO_JOSE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_CENTRAL_TERMINAL',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_CARRIEDO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_UN_AVENUE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_CENTRAL_TERMINAL',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_PEDRO_GIL',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_UN_AVENUE',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          }, // Northbound
          {
            to: 'LRT1_QUIRINO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_PEDRO_GIL',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_VITO_CRUZ',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_QUIRINO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_GIL_PUYAT',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_VITO_CRUZ',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_LIBERTAD',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_GIL_PUYAT',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_EDSA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_LIBERTAD',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_BACLARAN',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            from: 'LRT1_EDSA',
            to: 'MRT3_TAFT_AVENUE',
            weight: 5, // Approximate walking time in minutes
            transferType: 'inter-line',
            isOperational: true,
            transferDescription: 'Connected via a covered footbridge.',
            transferDistance: 'Approximately a 5-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'Separate fare required',
            direction: 'northbound', // Assuming MRT-3 Taft Avenue is northbound relative to LRT-1 EDSA
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
        edges: [
          {
            to: 'LRT1_EDSA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_REDEMPTORIST',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_BACLARAN',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_MIA',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_REDEMPTORIST',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_ASIA_WORLD',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_MIA',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_NINOY_AQUINO',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_ASIA_WORLD',
            weight: 2,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_DR_SANTOS',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'LRT1_NINOY_AQUINO',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
          },
          // Future connection to LRT1_MANILA_CAVITE_TOLL
        ],
      },
      // Future stations (Cavite Extension Phases 2 and 3)
      {
        id: 26,
        code: 'LRT1_MANILA_CAVITE_TOLL',
        name: 'Manila-Cavite Toll',
        isOperational: false,
        image: '',
        description: 'Planned station along the Manila-Cavite Toll Expressway.',
        edges: [
          {
            to: 'LRT1_DR_SANTOS',
            weight: 4,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_LAS_PINAS',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
          },
        ],
      },
      {
        id: 27,
        code: 'LRT1_LAS_PINAS',
        name: 'Las Piñas',
        isOperational: false,
        image: '',
        description: 'Planned station in Las Piñas City.',
        edges: [
          {
            to: 'LRT1_MANILA_CAVITE_TOLL',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_ZAPOTE',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
          },
        ],
      },
      {
        id: 28,
        code: 'LRT1_ZAPOTE',
        name: 'Zapote',
        isOperational: false,
        image: '',
        description:
          'Planned station near the Zapote area, serving both Las Piñas and Bacoor.',
        edges: [
          {
            to: 'LRT1_LAS_PINAS',
            weight: 3,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'LRT1_NIOG',
            weight: 4,
            isOperational: true,
            transferType: 'inter-station',
          },
        ],
      },
      {
        id: 29,
        code: 'LRT1_NIOG',
        name: 'Niog',
        isOperational: false,
        image: '',
        description:
          'Planned southern terminus of the LRT-1 extension, located in Bacoor, Cavite.',
        edges: [
          {
            to: 'LRT1_ZAPOTE',
            weight: 4,
            isOperational: true,
            transferType: 'inter-station',
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
    stations: [
      {
        id: 1,
        code: 'LRT2_ANTIPOLO',
        name: 'Antipolo',
        isOperational: true,
        image: '',
        description: 'Eastern terminus of LRT-2, located in Antipolo, Rizal.',
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
          },
          {
            from: 'LRT2_CUBAO',
            to: 'MRT3_CUBAO',
            weight: 5,
            transferType: 'inter-line',
            isOperational: true,
            transferDescription:
              'Connected via walkway to MRT-3 Cubao station.',
            transferDistance: 'Approximately 5-minute walk',
            accessibility: 'Elevators and ramps available',
            additionalCost: 'Separate fare required',
            direction: 'northbound',
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
          },
          {
            from: 'LRT2_RECTO',
            to: 'LRT1_DOROTEO_JOSE',
            weight: 5,
            transferType: 'inter-line',
            isOperational: true,
            transferDescription:
              'Connected via elevated walkway to LRT-1 Doroteo Jose station.',
            transferDistance: 'Approximately 5-minute walk',
            accessibility: 'Elevators and ramps available',
            additionalCost: 'Separate fare required',
            direction: 'northbound',
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
    stations: [
      {
        id: 1,
        code: 'MRT3_NORTH_AVENUE',
        name: 'North Avenue',
        isOperational: true,
        image: '',
        description:
          'Northern terminus of MRT-3, adjacent to TriNoma Mall and near SM City North EDSA.',
        edges: [
          {
            to: 'MRT3_QUEZON_AVENUE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'MRT3_NORTH_AVENUE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'MRT3_GMA_KAMUNING',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'MRT3_QUEZON_AVENUE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'MRT3_CUBAO',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'MRT3_GMA_KAMUNING',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'MRT3_SANTOLAN_ANNAPOLIS',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            from: 'MRT3_CUBAO',
            to: 'LRT2_CUBAO',
            weight: 5,
            transferType: 'inter-line',
            isOperational: true,
            transferDescription:
              'Connected via a covered walkway inside the Araneta City complex.',
            transferDistance: 'Approximately 5-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'Separate fare required',
            direction: 'southbound', // Assuming LRT-2 Cubao is southbound relative to MRT-3 Cubao
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
        edges: [
          {
            to: 'MRT3_CUBAO',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'MRT3_ORTIGAS',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'MRT3_SANTOLAN_ANNAPOLIS',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'MRT3_SHAW_BOULEVARD',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'MRT3_ORTIGAS',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'MRT3_BONI',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'MRT3_SHAW_BOULEVARD',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'MRT3_GUADALUPE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'MRT3_BONI',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'MRT3_BUENDIA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'MRT3_GUADALUPE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'MRT3_AYALA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'MRT3_BUENDIA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'MRT3_MAGALLANES',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'MRT3_AYALA',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            to: 'MRT3_TAFT_AVENUE',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
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
        edges: [
          {
            to: 'MRT3_MAGALLANES',
            weight: 5,
            isOperational: true,
            transferType: 'inter-station',
          },
          {
            from: 'MRT3_TAFT_AVENUE',
            to: 'LRT1_EDSA',
            weight: 5, // Approximate walking time in minutes
            transferType: 'inter-line',
            isOperational: true,
            transferDescription: 'Connected via a covered footbridge.',
            transferDistance: 'Approximately a 5-minute walk',
            accessibility: 'Elevators and ramps are available',
            additionalCost: 'Separate fare required',
            direction: 'southbound', // Assuming LRT-1 EDSA is southbound relative to MRT-3 Taft Avenue
          },
        ],
      },
    ],
  },
  // Add more transit lines as needed
];
