import { Component, ViewChild, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { EventService } from 'src/app/services/event.service';

import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  closeOutline,
  timeOutline,
  calendarOutline,
  locationOutline,
  personOutline,
  addCircleOutline,
  createOutline,
trashOutline
} from 'ionicons/icons';

addIcons({
  'chevron-back-outline': chevronBackOutline,
  'close-outline': closeOutline,
  'time-outline': timeOutline,
  'calendar-outline': calendarOutline,
  'location-outline': locationOutline,
  'person-outline': personOutline,
  'add-circle-outline': addCircleOutline,
  
});

interface DeptFilter {
  code: string;
  color: string;
  active: boolean;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonModal,
    IonButton,
    FullCalendarModule,
    IonIcon,
    IonButtons
  ]
})
export class CalendarPage implements OnInit, OnDestroy {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  private router = inject(Router);
  private eventService = inject(EventService);
  private sub?: Subscription;
  private alertController = inject(AlertController);

  goBack() {
    this.router.navigateByUrl('/home');
  }

  modalOpen = false;
  selectedEvent: any = null;

  // for days with multiple events
  dayListOpen = false;
  dayListDate = '';
  dayListEvents: any[] = [];

  private allEvents: any[] = [];

  departments: DeptFilter[] = [
    { code: 'CITE', color: '#8b5cf6', active: true },
    { code: 'CNAHS', color: '#3b82f6', active: true },
    { code: 'CLAGE', color: '#ec4899', active: true },
    { code: 'CEDE', color: '#f97316', active: true },
    { code: 'CHMT', color: '#ef4444', active: true },
    { code: 'CBAA', color: '#facc15', active: true },
    { code: 'CEHD', color: '#22c55e', active: true }
  ];

  calendarOptions: any;

  constructor() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      height: 'auto',

      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },

      events: [],


      eventClick: (info: any) => {

  console.log('FullCalendar Event:', info.event);

  const eventData = {
    id: info.event.id,
    title: info.event.title,
    date: info.event.startStr,
    ...info.event.extendedProps
  };

  console.log('Selected Event:', eventData);

  this.openEventDetail(eventData);
},

      dateClick: (info: any) => {
        const eventsOnDay = this.allEvents.filter(e => e.date === info.dateStr);
        if (eventsOnDay.length === 0) return;

        if (eventsOnDay.length === 1) {
          this.openEventDetail(eventsOnDay[0]);
        } else {
          this.dayListDate = info.dateStr;
          this.dayListEvents = eventsOnDay;
          this.dayListOpen = true;
        }
      }
    };
  }

  ionViewWillEnter() {
    this.loadEvents();
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.sub?.unsubscribe();
    this.sub = this.eventService.getEvents().subscribe((data: any[]) => {
      this.allEvents = data || [];
      this.refreshCalendarEvents();
    });
  }

  toggleDept(dept: DeptFilter) {
    dept.active = !dept.active;
    this.refreshCalendarEvents();
  }

  allActive(): boolean {
    return this.departments.every(d => d.active);
  }

  

  toggleAll() {
    const makeActive = !this.allActive();
    this.departments.forEach(d => d.active = makeActive);
    this.refreshCalendarEvents();
  }

  private refreshCalendarEvents() {
    const activeCodes = new Set(
      this.departments.filter(d => d.active).map(d => d.code)
    );

    const filtered = this.allEvents
      .filter(e => activeCodes.has((e.department || '').toUpperCase()))
      .map(e => ({
        id: e.id,
        title: e.title,
        date: e.date,
        backgroundColor: this.getColor(e.department),
        borderColor: this.getColor(e.department),
        extendedProps: {
          id: e.id,
          department: e.department,
          time: e.time,
          venue: e.venue,
          description: e.description,
          createdBy: e.createdBy,
          createdAt: e.createdAt
        }
      }));

    this.calendarOptions = {
      ...this.calendarOptions,
      events: filtered
    };
  }

  

  openEventDetail(event: any) {
    this.dayListOpen = false;
    this.selectedEvent = event;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.selectedEvent = null;
  }

  closeDayList() {
    this.dayListOpen = false;
    this.dayListEvents = [];
  }
editEvent(event: any) {

  this.modalOpen = false;
  this.selectedEvent = null;

  setTimeout(() => {
    this.router.navigate(['/edit-event'], {
      queryParams: {
        id: event.id
      }
    });
  }, 300);

}

async deleteEvent(id: string) {

  const alert = await this.alertController.create({
    header: 'Delete Event',
    message: 'Are you sure you want to delete this event?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: async () => {
          await this.eventService.deleteEvent(id);
          this.closeModal();
          this.loadEvents(); // Refresh the calendar
        }
      }
    ]
  });

  await alert.present();
}

  formatCreatedAt(timestamp: number): string {
    if (!timestamp) return '';
    const d = new Date(timestamp);
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getColor(dept: string) {
    switch ((dept || '').toUpperCase()) {
      case 'CITE': return '#8b5cf6';
      case 'CNAHS': return '#3b82f6';
      case 'CLAGE': return '#ec4899';
      case 'CEDE': return '#f97316';
      case 'CHMT': return '#ef4444';
      case 'CBAA': return '#facc15';
      case 'CEHD': return '#22c55e';
      default: return '#006633';
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  get visibleEventCount(): number {
  return this.calendarOptions?.events?.length || 0;
}

get upcomingCount(): number {
  const today = new Date().toISOString().split('T')[0];
  return this.allEvents.filter(e => e.date >= today).length;
}
}