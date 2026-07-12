import { Component, inject, NgZone, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription, switchMap, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { AlertController, MenuController, ModalController } from '@ionic/angular/standalone';
import { AboutModalComponent } from '../about-modal/about-modal.component'; // ✅ adjust path to match your folder structure
import { ProfileModalComponent } from '../profile-modal/profile-modal.component'; // adjust path
import { GenericModalComponent } from '../generic-modal/generic-modal.component'; // adjust path

import { addIcons } from 'ionicons';
import {
  informationCircleOutline,
  logOutOutline,
  chevronBackOutline,
  chevronForwardOutline,
  closeOutline,
  personCircleOutline,
  notificationsOutline,
  bookmarkOutline,
  helpCircleOutline,
  callOutline,
  bulbOutline,
  calendarOutline,
  locationOutline,
  arrowForwardOutline
} from 'ionicons/icons';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
  IonModal,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonButtons,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonBadge,
    IonCard,
    IonCardContent,
    IonRow,
    IonCol,
    IonModal,
    IonButton,
  ]
})
export class HomePage implements OnInit, OnDestroy {

  today = new Date();

  logoutConfirmOpen = false;

  allEvents: any[] = [];

  upcomingEventsCount = 0;

  
  unreadNotifications = 2;

  private sub?: Subscription;
  private profileSub?: Subscription;

  selectedDepartment: string | null = null;

  userProfile: any = null;

  departments = [
    { code: 'CITE', name: 'IT Education', icon: '💻' },
    { code: 'CNAHS', name: 'Nursing & Health', icon: '🩺' },
    { code: 'CLAGE', name: 'Arts & GenEd', icon: '📚' },
    { code: 'CEDE', name: 'Education', icon: '🎓' },
    { code: 'CHMT', name: 'Hospitality', icon: '🍽️' },
    { code: 'CBAA', name: 'Business', icon: '💼' },
    { code: 'CEHD', name: 'Engineering', icon: '⚙️' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private eventService: EventService,
    private alertController: AlertController,
    private menuController: MenuController,
    private modalController: ModalController,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({
  informationCircleOutline,
  logOutOutline,
  chevronBackOutline,
  chevronForwardOutline,
  closeOutline,
  personCircleOutline,
  notificationsOutline,
  bookmarkOutline,
  helpCircleOutline,
  callOutline,
  bulbOutline,
  calendarOutline,
  locationOutline,
  arrowForwardOutline
});
  }

  ngOnInit() {
    this.loadEvents();
    this.loadProfile();
  }

  ionViewWillEnter() {
    this.loadEvents();
  }

  loadEvents() {
    this.sub?.unsubscribe();
    this.sub = this.eventService.getEvents().subscribe((data: any[]) => {
      this.allEvents = data || [];
      this.updateUpcomingEventsCount();
    });
  }

 

  loadProfile() {
    this.profileSub?.unsubscribe();
    this.profileSub = this.authService.user$
      .pipe(
        switchMap(user => {
          if (!user) return of(null);
          return this.authService.getUserProfile(user.uid);
        })
      )
      .subscribe((profile: any) => {
        this.userProfile = profile;
        this.cdr.detectChanges();
      });
  }



  goTo(page: string) {
    this.router.navigateByUrl('/' + page);
  }

  deptPreviewOpen = false;
deptPreviewCode: string | null = null;

get deptPreviewInfo() {
  return this.departments.find(d => d.code === this.deptPreviewCode) || null;
}

get deptPreviewCount(): number {
  if (!this.deptPreviewCode) return 0;
  return this.getDepartmentCount(this.deptPreviewCode);
}

get deptPreviewUpcoming(): any[] {
  if (!this.deptPreviewCode) return [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return this.allEvents
    .filter(e => (e.department || '').toUpperCase() === this.deptPreviewCode)
    .filter(e => e.date && new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
}

selectDepartment(code: string) {
  this.deptPreviewCode = code;
  this.deptPreviewOpen = true;
}

closeDeptPreview() {
  this.deptPreviewOpen = false;
  this.deptPreviewCode = null;
}

viewAllDeptEvents() {
  const code = this.deptPreviewCode;
  this.closeDeptPreview();
  if (code) {
    this.router.navigate(['/events'], { queryParams: { department: code } });
  }
}

  async goProfile() {
    await this.menuController.close();
    const modal = await this.modalController.create({
      component: ProfileModalComponent,
      componentProps: {
        userProfile: this.userProfile,
        uid: this.authService.getCurrentUser()?.uid || ''
      },
      cssClass: 'about-popup-modal'
    });
    await modal.present();
  }

  async goAbout() {
    await this.menuController.close();
    const modal = await this.modalController.create({
      component: AboutModalComponent,
      cssClass: 'about-popup-modal'
    });
    await modal.present();
  }

  // ======================

  async goNotifications() {
    await this.openMockModal('notifications');
  }

  async goSavedEvents() {
    await this.openMockModal('saved-events');
  }

  async goHelp() {
    await this.openMockModal('help');
  }

  async goContactRegistrar() {
    await this.openMockModal('contact');
  }

  private async openMockModal(type: 'notifications' | 'saved-events' | 'help' | 'contact') {
    await this.menuController.close();
    const modal = await this.modalController.create({
      component: GenericModalComponent,
      componentProps: { type },
      cssClass: 'about-popup-modal'
    });
    await modal.present();
  }


  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to log out?',
      backdropDismiss: false,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Logout',
          role: 'destructive',
          handler: () => {
            this.doLogout();
          }
        }
      ]
    });

    await alert.present();
  }

  cancelLogout() {
    this.logoutConfirmOpen = false;
  }

  async doLogout() {
    this.logoutConfirmOpen = false;

    try {
      await this.authService.logout();
      localStorage.clear();
      sessionStorage.clear();
      await this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }


  getColor(code: string): string {
    switch (code) {
      case 'CITE': return '#8b5cf6';
      case 'CNAHS': return '#3b82f6';
      case 'CLAGE': return '#ec4899';
      case 'CEDE': return '#f97316';
      case 'CHMT': return '#ef4444';
      case 'CBAA': return '#facc15';
      case 'CEHD': return '#22c55e';
      default: return '#999999';
    }
  }

  getDepartmentCount(code: string): number {
    return this.allEvents.filter(
      e => (e.department || '').toUpperCase() === code
    ).length;
  }

  private updateUpcomingEventsCount() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    this.upcomingEventsCount = this.allEvents.filter(e => {
      const raw = e.date || e.startDate || e.eventDate;
      if (!raw) return false;
      const d = new Date(raw);
      return !isNaN(d.getTime()) && d >= now;
    }).length;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.profileSub?.unsubscribe();
  }
}