import { Component } from '@angular/core';
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

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';

import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  addCircleOutline,
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
  'add-circle-outline': addCircleOutline,
  'text-outline': textOutline,
  'business-outline': businessOutline,
  'calendar-outline': calendarOutline,
  'time-outline': timeOutline,
  'location-outline': locationOutline,
  'document-text-outline': documentTextOutline,
  'checkmark-circle-outline': checkmarkCircleOutline
});

@Component({
  selector: 'app-add-event',
  standalone: true,
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
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
    IonIcon,
    
  ]
})
export class AddEventPage {

  title = '';
  department = '';
  date = '';
  time = '';
  venue = '';
  description = '';

  imageUrl = 'assets/bu.jpg';

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
    private eventService: EventService,
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController
  ) {}

  goBack() {
    this.router.navigateByUrl('/events');
  }

  async saveEvent() {

    if (!this.title || !this.department || !this.date || !this.time || !this.venue || !this.description) {
      const t = await this.toast.create({
        message: 'Please complete all fields.',
        duration: 2000,
        color: 'danger'
      });

      await t.present();
      return;
    }

    const loading = await this.loading.create({
      message: 'Saving event...',
      spinner: 'crescent'
    });

    await loading.present();

    try {

      const user = this.auth.getCurrentUser();

      await this.eventService.addEvent({
        title: this.title,
        department: this.department,
        date: this.date,
        time: this.time,
        venue: this.venue,
        description: this.description,
        createdBy: user?.uid || '',
        createdAt: Date.now()
      });

      await loading.dismiss();

      const success = await this.toast.create({
        message: 'Event added successfully!',
        duration: 2000,
        color: 'success'
      });

      await success.present();

      this.title = '';
      this.department = '';
      this.date = '';
      this.time = '';
      this.venue = '';
      this.description = '';

      this.router.navigateByUrl('/events');

    } catch (error: any) {

      await loading.dismiss();

      const err = await this.toast.create({
        message: error?.message || 'Something went wrong',
        duration: 3000,
        color: 'danger'
      });

      await err.present();
    }
  }
  
}