import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

import { EventService } from '../../services/event.service';

import { addIcons } from 'ionicons';
import {
  chevronBackOutline,
  laptopOutline,
  medkitOutline,
  colorPaletteOutline,
  schoolOutline,
  restaurantOutline,
  briefcaseOutline,
  bookOutline,
  chevronForwardOutline,
  searchOutline
} from 'ionicons/icons';

addIcons({
  'chevron-back-outline': chevronBackOutline,
  'laptop-outline': laptopOutline,
  'medkit-outline': medkitOutline,
  'color-palette-outline': colorPaletteOutline,
  'school-outline': schoolOutline,
  'restaurant-outline': restaurantOutline,
  'briefcase-outline': briefcaseOutline,
  'book-outline': bookOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'search-outline': searchOutline
});

interface DeptInfo {
  code: string;
  name: string;
  icon: string;
  color: string;
  bg: string;
}

@Component({
  selector: 'app-departments',
  standalone: true,
  templateUrl: './departments.page.html',
  styleUrls: ['./departments.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon
  ]
})
export class DepartmentsPage {

  private router = inject(Router);
  private eventService = inject(EventService);

  events: any[] = [];
  searchTerm = '';
  private sub?: Subscription;

  departments: DeptInfo[] = [
    { code: 'CITE',  name: 'IT Education',            icon: 'laptop-outline',        color: '#8b5cf6', bg: '#f3eeff' },
    { code: 'CNAHS', name: 'Nursing & Health',         icon: 'medkit-outline',        color: '#3b82f6', bg: '#eaf2ff' },
    { code: 'CLAGE', name: 'Arts & GenEd',             icon: 'color-palette-outline', color: '#ec4899', bg: '#fdedf5' },
    { code: 'CEDE',  name: 'Education',                icon: 'school-outline',       color: '#f97316', bg: '#fff1e6' },
    { code: 'CHMT',  name: 'Hospitality',              icon: 'restaurant-outline',   color: '#ef4444', bg: '#fdecec' },
    { code: 'CBAA',  name: 'Business & Accountancy',   icon: 'briefcase-outline',    color: '#facc15', bg: '#fef9e6' },
    { code: 'CEHD',  name: 'Human Development',        icon: 'book-outline',         color: '#22c55e', bg: '#eafbf0' }
  ];

  ionViewWillEnter() {
    this.sub?.unsubscribe();
    this.sub = this.eventService.getEvents().subscribe((data: any[]) => {
      this.events = data || [];
    });
  }

  get filteredDepartments(): DeptInfo[] {
    if (!this.searchTerm.trim()) return this.departments;
    const t = this.searchTerm.toLowerCase();
    return this.departments.filter(d =>
      d.code.toLowerCase().includes(t) || d.name.toLowerCase().includes(t)
    );
  }

  countFor(deptCode: string): number {
    return this.events.filter(e => (e.department || '').toUpperCase() === deptCode).length;
  }

  openDepartment(deptCode: string) {
    this.router.navigate(['/events'], { queryParams: { department: deptCode } });
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}