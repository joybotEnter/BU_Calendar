import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { EventService } from 'src/app/services/event.service';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  add,
  chevronBackOutline,
  chevronForwardOutline,
  calendarOutline,
  calendarClearOutline,
  sparklesOutline,
  locationOutline,
  searchOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  closeOutline,
  timeOutline,
  addCircleOutline,
  createOutline,
  trashOutline
} from 'ionicons/icons';


addIcons({
  'add': add,
  'chevron-back-outline': chevronBackOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'calendar-outline': calendarOutline,
  'calendar-clear-outline': calendarClearOutline,
  'sparkles-outline': sparklesOutline,
  'location-outline': locationOutline,
  'search-outline': searchOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'close-circle-outline': closeCircleOutline,
  'close-outline': closeOutline,
  'time-outline': timeOutline,
  'add-circle-outline': addCircleOutline,

  'create-outline': createOutline,
  'trash-outline': trashOutline
});


@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    FormsModule
  ]
})
export class EventsPage {

  private router = inject(Router);
  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);

  events: any[] = [];
  searchTerm = '';
  activeDept: string | null = null;
  private sub?: Subscription;

  private deptNames: Record<string, string> = {
    CITE: 'IT Education',
    CNAHS: 'Nursing & Health',
    CLAGE: 'Arts & GenEd',
    CEDE: 'Education',
    CHMT: 'Hospitality',
    CBAA: 'Business & Accountancy',
    CEHD: 'Human Development'
  };

  ionViewWillEnter() {
    this.loadEvents();
    const dept = this.route.snapshot.queryParamMap.get('department');
    this.activeDept = dept ? dept.toUpperCase() : null;
  }

  loadEvents() {
    this.sub?.unsubscribe();
    this.sub = this.eventService.getEvents().subscribe((data: any[]) => {
      this.events = data || [];
    });
  }

  


  
  get baseEvents(): any[] {
    let list = this.events;

    if (this.activeDept) {
      list = list.filter(e => (e.department || '').toUpperCase() === this.activeDept);
    }

    if (this.searchTerm.trim()) {
      const t = this.searchTerm.toLowerCase();
      list = list.filter(e =>
        (e.title || '').toLowerCase().includes(t) ||
        (e.department || '').toLowerCase().includes(t) ||
        (e.venue || '').toLowerCase().includes(t)
      );
    }

    return list;
  }

  get upcomingEvents(): any[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.baseEvents
      .filter(e => e.date && new Date(e.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  goToAddEvent() {
  this.router.navigate(['/add-event']);
}

 editEvent(event: any) {
  this.router.navigate(['/edit-event'], {
    queryParams: {
      id: event.id
    }
  });
}

  get doneEvents(): any[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.baseEvents
      .filter(e => e.date && new Date(e.date) < today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  get upcomingCount(): number {
    return this.upcomingEvents.length;
  }

  get deptDisplayName(): string {
    if (!this.activeDept) return 'All Events';
    return this.deptNames[this.activeDept] || this.activeDept;
  }

  clearDeptFilter() {
    this.router.navigateByUrl('/events');
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



  get themeColor(): string {
    return this.activeDept ? this.getColor(this.activeDept) : '#006633';
  }

  get themeColorLight(): string {
    return this.activeDept ? this.getColorLight(this.activeDept) : '#eafaf1';
  }

  get themeGradient(): string {
    return `linear-gradient(135deg, ${this.themeColor}, ${this.themeColor}cc)`;
  }


  
  goBack() {
  if (this.activeDept) {
    this.router.navigateByUrl('/departments');
  } else {
    this.router.navigateByUrl('/home');
  }
}

 


  getColor(dept: string = ''): string {
    switch (dept.toUpperCase()) {
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

  getColorLight(dept: string = ''): string {
    switch (dept.toUpperCase()) {
      case 'CITE': return '#f3eeff';
      case 'CNAHS': return '#eaf2ff';
      case 'CLAGE': return '#fdedf5';
      case 'CEDE': return '#fff1e6';
      case 'CHMT': return '#fdecec';
      case 'CBAA': return '#fef9e6';
      case 'CEHD': return '#eafbf0';
      default: return '#eafaf1';
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}