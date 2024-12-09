import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
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
} from '@ionic/angular/standalone';
import { StationDetailsComponent } from '../../station-details/station-details.component';

@Component({
  selector: 'app-lrt1',
  templateUrl: './lrt1.page.html',
  styleUrls: ['./lrt1.page.scss'],
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
  ],
})
export class LRT1Page {
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

  constructor(private modalController: ModalController) {}

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
