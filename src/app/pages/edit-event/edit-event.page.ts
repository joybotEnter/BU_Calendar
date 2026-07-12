import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonSelect,
  IonSelectOption,
  ToastController,
  LoadingController,
  IonButtons,
  IonIcon
} from '@ionic/angular/standalone';

import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventModel } from '../../models/event.model';


import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  createOutline,
  textOutline,
  businessOutline,
  calendarOutline,
  timeOutline,
  locationOutline,
  documentTextOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';

addIcons({
  'chevron-back-outline': chevronBackOutline,
  'create-outline': createOutline,
  'text-outline': textOutline,
  'business-outline': businessOutline,
  'calendar-outline': calendarOutline,
  'time-outline': timeOutline,
  'location-outline': locationOutline,
  'document-text-outline': documentTextOutline,
  'checkmark-circle-outline': checkmarkCircleOutline
});

@Component({
  selector: 'app-edit-event',
  standalone: true,
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonButtons,
    IonIcon
  ]
})
export class EditEventPage implements OnInit {

  id = '';


  imageUrl = 'assets/buu.jpg';

  event: EventModel = {
    title: '',
    department: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    createdBy: '',
    createdAt: 0
  };

  departments = [
    'CITE',
    'CNAHS',
    'CLAGE',
    'CEDE',
    'CHMT',
    'CBAA',
    'CEHD'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private toast: ToastController,
    private loading: LoadingController
  ) {}

  ngOnInit() {

  this.route.queryParams.subscribe(params => {

    this.id = params['id'];

    if (!this.id) {
      console.log('No event id received');
      return;
    }

    this.eventService.getEvent(this.id).subscribe((data: any) => {
      if (data) {
        this.event = data;
      }
    });

  });

}

  goBack() {
    this.router.navigateByUrl('/events');
  }

  async updateEvent() {

    const loading = await this.loading.create({
      message: 'Updating event...'
    });

    await loading.present();

    try {
      await this.eventService.updateEvent(this.id, this.event);

      await loading.dismiss();

      const toast = await this.toast.create({
        message: 'Event updated!',
        duration: 2000,
        color: 'success'
      });

      await toast.present();

      this.router.navigateByUrl('/events');

    } catch (err: any) {

      await loading.dismiss();

      const toast = await this.toast.create({
        message: err.message || 'Update failed',
        duration: 3000,
        color: 'danger'
      });

      toast.present();
    }
  }
}