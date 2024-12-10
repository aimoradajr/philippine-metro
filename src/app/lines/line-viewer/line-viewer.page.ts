import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonThumbnail,
  IonItem,
  IonMenuButton,
  IonSelect,
  IonSelectOption,
  ModalController,
} from '@ionic/angular/standalone';
import { StationDetailsComponent } from '../../station-details/station-details.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-line-viewer',
  templateUrl: './line-viewer.page.html',
  styleUrls: ['./line-viewer.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonListHeader,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonThumbnail,
    IonItem,
    CommonModule,
    IonMenuButton,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
})
export class LineViewerPage implements OnInit {
  transitLines = [
    {
      name: 'LRT 1',
      code: 'lrt1',
      stations: [
        // LRT-1 Stations
        {
          id: 1,
          name: 'Fernando Poe Jr. (formerly Roosevelt)',
          isOperational: true,
          image: 'assets/stations/fernando-poe-jr.jpg',
          description:
            'Northern terminus of LRT-1, serving the Muñoz area in Quezon City.',
        },
        {
          id: 2,
          name: 'Balintawak',
          isOperational: true,
          image: 'assets/stations/balintawak.jpg',
          description: 'Provides access to the Balintawak Market and EDSA.',
        },
        {
          id: 3,
          name: 'Monumento',
          isOperational: true,
          image: 'assets/stations/monumento.jpg',
          description: 'Major hub near the Bonifacio Monument in Caloocan.',
        },
        {
          id: 4,
          name: '5th Avenue',
          isOperational: true,
          image: 'assets/stations/5th-avenue.jpg',
          description: 'Serves the Grace Park area in Caloocan.',
        },
        {
          id: 5,
          name: 'R. Papa',
          isOperational: true,
          image: 'assets/stations/r-papa.jpg',
          description:
            'Located near the Philippine Cultural College in Manila.',
        },
        {
          id: 6,
          name: 'Abad Santos',
          isOperational: true,
          image: 'assets/stations/abad-santos.jpg',
          description: 'Close to the Manila Chinese Cemetery.',
        },
        {
          id: 7,
          name: 'Blumentritt',
          isOperational: true,
          image: 'assets/stations/blumentritt.jpg',
          description: 'Near Blumentritt Market and PNR station.',
        },
        {
          id: 8,
          name: 'Tayuman',
          isOperational: true,
          image: 'assets/stations/tayuman.jpg',
          description: 'Serves the Tayuman area in Manila.',
        },
        {
          id: 9,
          name: 'Bambang',
          isOperational: true,
          image: 'assets/stations/bambang.jpg',
          description: 'Close to medical institutions in Manila.',
        },
        {
          id: 10,
          name: 'Doroteo Jose',
          isOperational: true,
          image: 'assets/stations/doroteo-jose.jpg',
          description: 'Interchange station with LRT-2 Recto Station.',
        },
        {
          id: 11,
          name: 'Carriedo',
          isOperational: true,
          image: 'assets/stations/carriedo.jpg',
          description: 'Near Quiapo Church and market.',
        },
        {
          id: 12,
          name: 'Central Terminal',
          isOperational: true,
          image: 'assets/stations/central-terminal.jpg',
          description: 'Access to Manila City Hall and Mehan Garden.',
        },
        {
          id: 13,
          name: 'United Nations (UN) Avenue',
          isOperational: true,
          image: 'assets/stations/un-avenue.jpg',
          description: 'Close to the Supreme Court and Rizal Park.',
        },
        {
          id: 14,
          name: 'Pedro Gil',
          isOperational: true,
          image: 'assets/stations/pedro-gil.jpg',
          description: 'Near Robinsons Place Manila and UP Manila.',
        },
        {
          id: 15,
          name: 'Quirino',
          isOperational: true,
          image: 'assets/stations/quirino.jpg',
          description: 'Serves the Malate area in Manila.',
        },
        {
          id: 16,
          name: 'Vito Cruz',
          isOperational: true,
          image: 'assets/stations/vito-cruz.jpg',
          description:
            'Near De La Salle University and Cultural Center of the Philippines.',
        },
        {
          id: 17,
          name: 'Gil Puyat (Buendia)',
          isOperational: true,
          image: 'assets/stations/gil-puyat.jpg',
          description:
            'Close to World Trade Center and Cartimar Shopping Center.',
        },
        {
          id: 18,
          name: 'Libertad',
          isOperational: true,
          image: 'assets/stations/libertad.jpg',
          description: 'Near Pasay City Hall and Pasay Public Market.',
        },
        {
          id: 19,
          name: 'EDSA',
          isOperational: true,
          image: 'assets/stations/edsa.jpg',
          description: 'Interchange with MRT-3 at Taft Avenue Station.',
        },
        {
          id: 20,
          name: 'Baclaran',
          isOperational: true,
          image: 'assets/stations/baclaran.jpg',
          description:
            'Southern terminus of LRT-1, near Baclaran Church and market.',
        },
        // LRT-1 Extension Stations
        {
          id: 21,
          name: 'Redemptorist-Aseana',
          isOperational: true,
          image: 'assets/stations/redemptorist-aseana.jpg',
          description:
            'Located in Parañaque City, this station serves the Aseana City complex and nearby areas.',
        },
        {
          id: 22,
          name: 'MIA Road',
          isOperational: true,
          image: 'assets/stations/mia-road.jpg',
          description:
            'Situated near the Ninoy Aquino International Airport, providing access to airport facilities.',
        },
        {
          id: 23,
          name: 'Asia World (PITX)',
          isOperational: true,
          image: 'assets/stations/asia-world.jpg',
          description:
            'Connected to the Parañaque Integrated Terminal Exchange (PITX), facilitating seamless transfers between different modes of transportation.',
        },
        {
          id: 24,
          name: 'Ninoy Aquino',
          isOperational: true,
          image: 'assets/stations/ninoy-aquino.jpg',
          description:
            'Serves the Ninoy Aquino Avenue area, enhancing connectivity for commuters.',
        },
        {
          id: 25,
          name: 'Dr. Santos (formerly Sucat)',
          isOperational: true,
          image: 'assets/stations/dr-santos.jpg',
          description:
            'Located along Dr. Santos Avenue, providing access to the Sucat area in Parañaque City.',
        },
        {
          id: 26,
          name: 'Las Piñas',
          isOperational: false,
          image: 'assets/stations/las-pinas.jpg',
          description:
            'Future station planned to serve the Las Piñas City area.',
        },
        {
          id: 27,
          name: 'Zapote',
          isOperational: false,
          image: 'assets/stations/zapote.jpg',
          description:
            'Upcoming station intended to serve the Zapote district, enhancing connectivity to Bacoor, Cavite.',
        },
        {
          id: 28,
          name: 'Niog',
          isOperational: false,
          image: 'assets/stations/niog.jpg',
          description:
            'Planned as the final station of the LRT-1 extension, located in Bacoor, Cavite.',
        },
      ],
    },
    {
      name: 'LRT 2',
      code: 'lrt2',
      stations: [
        {
          id: 1,
          name: 'Recto',
          isOperational: true,
          image: 'assets/stations/recto.jpg',
          description:
            'Western terminus of LRT-2, located near the University Belt in Manila.',
        },
        {
          id: 2,
          name: 'Legarda',
          isOperational: true,
          image: 'assets/stations/legarda.jpg',
          description:
            'Situated in Sampaloc, Manila, close to several educational institutions.',
        },
        {
          id: 3,
          name: 'Pureza',
          isOperational: true,
          image: 'assets/stations/pureza.jpg',
          description:
            'Located in Santa Mesa, Manila, near the Polytechnic University of the Philippines.',
        },
        {
          id: 4,
          name: 'V. Mapa',
          isOperational: true,
          image: 'assets/stations/v_mapa.jpg',
          description:
            'Found in Santa Mesa, Manila, providing access to various commercial establishments.',
        },
        {
          id: 5,
          name: 'J. Ruiz',
          isOperational: true,
          image: 'assets/stations/j_ruiz.jpg',
          description:
            'Located in San Juan City, serving the Pinaglabanan Shrine area.',
        },
        {
          id: 6,
          name: 'Gilmore',
          isOperational: true,
          image: 'assets/stations/gilmore.jpg',
          description:
            'Situated in Quezon City, known for its proximity to electronics shops.',
        },
        {
          id: 7,
          name: 'Betty Go-Belmonte',
          isOperational: true,
          image: 'assets/stations/betty_go_belmonte.jpg',
          description:
            'Located in Quezon City, near various residential areas.',
        },
        {
          id: 8,
          name: 'Araneta Center-Cubao',
          isOperational: true,
          image: 'assets/stations/araneta_center_cubao.jpg',
          description:
            'A major transfer point in Quezon City, connecting to LRT-2 and MRT-3.',
        },
        {
          id: 9,
          name: 'Anonas',
          isOperational: true,
          image: 'assets/stations/anonas.jpg',
          description:
            'Found in Quezon City, near several commercial establishments.',
        },
        {
          id: 10,
          name: 'Katipunan',
          isOperational: true,
          image: 'assets/stations/katipunan.jpg',
          description:
            'Located in Quezon City, serving the Ateneo de Manila University area.',
        },
        {
          id: 11,
          name: 'Santolan',
          isOperational: true,
          image: 'assets/stations/santolan.jpg',
          description:
            'Situated on the border of Pasig and Marikina, near SM Marikina.',
        },
        {
          id: 12,
          name: 'Marikina-Pasig',
          isOperational: true,
          image: 'assets/stations/marikina_pasig.jpg',
          description:
            'Located between Marikina and Pasig, near Sta. Lucia East Grand Mall.',
        },
        {
          id: 13,
          name: 'Antipolo',
          isOperational: true,
          image: 'assets/stations/antipolo.jpg',
          description:
            'Eastern terminus of LRT-2, located in Antipolo City near SM City Masinag.',
        },
      ],
    },
    {
      name: 'MRT 3',
      code: 'mrt3',
      stations: [
        {
          id: 1,
          name: 'North Avenue',
          isOperational: true,
          image: 'assets/stations/north_avenue.jpg',
          description:
            'Northern terminus of MRT-3, located in Quezon City near Trinoma Mall and SM City North EDSA.',
        },
        {
          id: 2,
          name: 'Quezon Avenue',
          isOperational: true,
          image: 'assets/stations/quezon_avenue.jpg',
          description:
            'Situated along Quezon Avenue in Quezon City, near the ABS-CBN Broadcasting Center and Eton Centris.',
        },
        {
          id: 3,
          name: 'GMA Kamuning',
          isOperational: true,
          image: 'assets/stations/gma_kamuning.jpg',
          description:
            'Located near GMA Network Center and Timog Avenue in Quezon City.',
        },
        {
          id: 4,
          name: 'Araneta Center-Cubao',
          isOperational: true,
          image: 'assets/stations/araneta_center_cubao.jpg',
          description:
            'A major transfer point in Quezon City, connecting to LRT-2 and near Araneta City.',
        },
        {
          id: 5,
          name: 'Santolan-Annapolis',
          isOperational: true,
          image: 'assets/stations/santolan_annapolis.jpg',
          description:
            'Located in San Juan City, near Greenhills Shopping Center.',
        },
        {
          id: 6,
          name: 'Ortigas',
          isOperational: true,
          image: 'assets/stations/ortigas.jpg',
          description:
            'Situated in Mandaluyong City, near SM Megamall and Robinsons Galleria.',
        },
        {
          id: 7,
          name: 'Shaw Boulevard',
          isOperational: true,
          image: 'assets/stations/shaw_boulevard.jpg',
          description:
            'Located in Mandaluyong City, near Shangri-La Plaza and Starmall EDSA-Shaw.',
        },
        {
          id: 8,
          name: 'Boni',
          isOperational: true,
          image: 'assets/stations/boni.jpg',
          description:
            'Situated in Mandaluyong City, near Robinsons Forum and Cybergate Complex.',
        },
        {
          id: 9,
          name: 'Guadalupe',
          isOperational: true,
          image: 'assets/stations/guadalupe.jpg',
          description:
            'Located in Makati City, near Guadalupe Commercial Complex and Pasig River.',
        },
        {
          id: 10,
          name: 'Buendia',
          isOperational: true,
          image: 'assets/stations/buendia.jpg',
          description:
            'Situated in Makati City, near Makati Central Business District and RCBC Plaza.',
        },
        {
          id: 11,
          name: 'Ayala',
          isOperational: true,
          image: 'assets/stations/ayala.jpg',
          description:
            'Located in Makati City, directly connected to Ayala Center and Glorietta Mall.',
        },
        {
          id: 12,
          name: 'Magallanes',
          isOperational: true,
          image: 'assets/stations/magallanes.jpg',
          description:
            'Situated in Makati City, near Magallanes Village and Alphaland Southgate Mall.',
        },
        {
          id: 13,
          name: 'Taft Avenue',
          isOperational: true,
          image: 'assets/stations/taft_avenue.jpg',
          description:
            'Southern terminus of MRT-3, located in Pasay City near Metropoint Mall and connected to LRT-1 EDSA Station.',
        },
      ],
    },
    // Add more transit lines as needed
  ];

  public stations = [
    // LRT-1 Stations
    {
      id: 1,
      name: 'Fernando Poe Jr. (formerly Roosevelt)',
      isOperational: true,
      image: 'assets/stations/fernando-poe-jr.jpg',
      description:
        'Northern terminus of LRT-1, serving the Muñoz area in Quezon City.',
    },
    {
      id: 2,
      name: 'Balintawak',
      isOperational: true,
      image: 'assets/stations/balintawak.jpg',
      description: 'Provides access to the Balintawak Market and EDSA.',
    },
    {
      id: 3,
      name: 'Monumento',
      isOperational: true,
      image: 'assets/stations/monumento.jpg',
      description: 'Major hub near the Bonifacio Monument in Caloocan.',
    },
    {
      id: 4,
      name: '5th Avenue',
      isOperational: true,
      image: 'assets/stations/5th-avenue.jpg',
      description: 'Serves the Grace Park area in Caloocan.',
    },
    {
      id: 5,
      name: 'R. Papa',
      isOperational: true,
      image: 'assets/stations/r-papa.jpg',
      description: 'Located near the Philippine Cultural College in Manila.',
    },
    {
      id: 6,
      name: 'Abad Santos',
      isOperational: true,
      image: 'assets/stations/abad-santos.jpg',
      description: 'Close to the Manila Chinese Cemetery.',
    },
    {
      id: 7,
      name: 'Blumentritt',
      isOperational: true,
      image: 'assets/stations/blumentritt.jpg',
      description: 'Near Blumentritt Market and PNR station.',
    },
    {
      id: 8,
      name: 'Tayuman',
      isOperational: true,
      image: 'assets/stations/tayuman.jpg',
      description: 'Serves the Tayuman area in Manila.',
    },
    {
      id: 9,
      name: 'Bambang',
      isOperational: true,
      image: 'assets/stations/bambang.jpg',
      description: 'Close to medical institutions in Manila.',
    },
    {
      id: 10,
      name: 'Doroteo Jose',
      isOperational: true,
      image: 'assets/stations/doroteo-jose.jpg',
      description: 'Interchange station with LRT-2 Recto Station.',
    },
    {
      id: 11,
      name: 'Carriedo',
      isOperational: true,
      image: 'assets/stations/carriedo.jpg',
      description: 'Near Quiapo Church and market.',
    },
    {
      id: 12,
      name: 'Central Terminal',
      isOperational: true,
      image: 'assets/stations/central-terminal.jpg',
      description: 'Access to Manila City Hall and Mehan Garden.',
    },
    {
      id: 13,
      name: 'United Nations (UN) Avenue',
      isOperational: true,
      image: 'assets/stations/un-avenue.jpg',
      description: 'Close to the Supreme Court and Rizal Park.',
    },
    {
      id: 14,
      name: 'Pedro Gil',
      isOperational: true,
      image: 'assets/stations/pedro-gil.jpg',
      description: 'Near Robinsons Place Manila and UP Manila.',
    },
    {
      id: 15,
      name: 'Quirino',
      isOperational: true,
      image: 'assets/stations/quirino.jpg',
      description: 'Serves the Malate area in Manila.',
    },
    {
      id: 16,
      name: 'Vito Cruz',
      isOperational: true,
      image: 'assets/stations/vito-cruz.jpg',
      description:
        'Near De La Salle University and Cultural Center of the Philippines.',
    },
    {
      id: 17,
      name: 'Gil Puyat (Buendia)',
      isOperational: true,
      image: 'assets/stations/gil-puyat.jpg',
      description: 'Close to World Trade Center and Cartimar Shopping Center.',
    },
    {
      id: 18,
      name: 'Libertad',
      isOperational: true,
      image: 'assets/stations/libertad.jpg',
      description: 'Near Pasay City Hall and Pasay Public Market.',
    },
    {
      id: 19,
      name: 'EDSA',
      isOperational: true,
      image: 'assets/stations/edsa.jpg',
      description: 'Interchange with MRT-3 at Taft Avenue Station.',
    },
    {
      id: 20,
      name: 'Baclaran',
      isOperational: true,
      image: 'assets/stations/baclaran.jpg',
      description:
        'Southern terminus of LRT-1, near Baclaran Church and market.',
    },
    // LRT-1 Extension Stations
    {
      id: 21,
      name: 'Redemptorist-Aseana',
      isOperational: true,
      image: 'assets/stations/redemptorist-aseana.jpg',
      description:
        'Located in Parañaque City, this station serves the Aseana City complex and nearby areas.',
    },
    {
      id: 22,
      name: 'MIA Road',
      isOperational: true,
      image: 'assets/stations/mia-road.jpg',
      description:
        'Situated near the Ninoy Aquino International Airport, providing access to airport facilities.',
    },
    {
      id: 23,
      name: 'Asia World (PITX)',
      isOperational: true,
      image: 'assets/stations/asia-world.jpg',
      description:
        'Connected to the Parañaque Integrated Terminal Exchange (PITX), facilitating seamless transfers between different modes of transportation.',
    },
    {
      id: 24,
      name: 'Ninoy Aquino',
      isOperational: true,
      image: 'assets/stations/ninoy-aquino.jpg',
      description:
        'Serves the Ninoy Aquino Avenue area, enhancing connectivity for commuters.',
    },
    {
      id: 25,
      name: 'Dr. Santos (formerly Sucat)',
      isOperational: true,
      image: 'assets/stations/dr-santos.jpg',
      description:
        'Located along Dr. Santos Avenue, providing access to the Sucat area in Parañaque City.',
    },
    {
      id: 26,
      name: 'Las Piñas',
      isOperational: false,
      image: 'assets/stations/las-pinas.jpg',
      description: 'Future station planned to serve the Las Piñas City area.',
    },
    {
      id: 27,
      name: 'Zapote',
      isOperational: false,
      image: 'assets/stations/zapote.jpg',
      description:
        'Upcoming station intended to serve the Zapote district, enhancing connectivity to Bacoor, Cavite.',
    },
    {
      id: 28,
      name: 'Niog',
      isOperational: false,
      image: 'assets/stations/niog.jpg',
      description:
        'Planned as the final station of the LRT-1 extension, located in Bacoor, Cavite.',
    },
  ];

  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const lineCode = params['line_code'];
      // Handle the new lineId here
      console.log('Navigated to line:', lineCode);
      // Additional logic to handle the new lineId

      this.selectLineByCode(lineCode);
    });
  }

  selectedLine: any = null;

  onLineChange(event: any) {}

  selectLineByCode(lineCode: string) {
    if (lineCode) {
      this.selectedLine = this.transitLines.find(
        (line) => line.code === lineCode
      );
    }
  }

  async openStationDetails(station: any) {
    const modal = await this.modalController.create({
      component: StationDetailsComponent,
      componentProps: { station },
      // enterAnimation: this.slideInAnimation,
      // leaveAnimation: this.slideOutAnimation,
    });
    await modal.present();
  }
}
