import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  closeOutline,
  notificationsOutline,
  calendarOutline,
  bookmarkOutline,
  helpCircleOutline,
  chevronDownOutline,
  callOutline,
  mailOutline,
  locationOutline,
  timeOutline,
  megaphoneOutline,
  cardOutline,
  chatbubblesOutline,
  logoYoutube,
  logoTiktok,
  logoTwitter,
  createOutline,
  trashOutline,
  logoInstagram
} from 'ionicons/icons';

export type MockModalType = 'notifications' | 'saved-events' | 'help' | 'contact';

interface MockNotification {
  icon: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

interface MockSavedEvent {
  title: string;
  date: string;
  department: string;
  color: string;
}

interface MockFaq {
  question: string;
  answer: string;
  open: boolean;
}

interface ContactItem {
  icon: string;
  name: string;
  sub: string;
  iconBg: string;
  iconColor: string;
  link?: string;
  isLink?: boolean;
}

interface ContactGroup {
  label: string;
  items: ContactItem[];
}



@Component({
  selector: 'app-generic-modal',
  standalone: true,
  imports: [CommonModule, IonIcon, IonButton],
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent {

  @Input() type: MockModalType = 'notifications';

  constructor(private modalController: ModalController) {
    addIcons({
      closeOutline,
      notificationsOutline,
      calendarOutline,
      bookmarkOutline,
      helpCircleOutline,
      chevronDownOutline,
      callOutline,
      mailOutline,
      locationOutline,
      timeOutline,
      megaphoneOutline,
      cardOutline,
      chatbubblesOutline,
      logoYoutube,
      logoTiktok,
      logoTwitter,
      logoInstagram,
      createOutline,
  trashOutline
    });
  }


  notifications: MockNotification[] = [
  {
    icon: 'calendar-outline',
    title: 'CITE Hackathon reminder',
    message: 'Registration closes tomorrow at 5:00 PM.',
    time: '2h ago',
    unread: true
  },
  {
    icon: 'notifications-outline',
    title: 'Schedule updated',
    message: 'CNAHS clinical rotation moved to Room 204.',
    time: '1d ago',
    unread: true
  },
  {
    icon: 'megaphone-outline',
    title: 'Enrollment reminder',
    message: 'Second semester enrollment opens next Monday.',
    time: '2d ago',
    unread: false
  },
  {
    icon: 'calendar-outline',
    title: 'New event posted',
    message: 'CBAA Career Fair has been added to your calendar.',
    time: '3d ago',
    unread: false
  },
  {
    icon: 'card-outline',
    title: 'Tuition payment due',
    message: 'Second payment deadline is on July 25.',
    time: '5d ago',
    unread: false
  },
  {
    icon: 'megaphone-outline',
    title: 'Class suspension notice',
    message: 'Classes suspended tomorrow due to inclement weather.',
    time: '6d ago',
    unread: true
  },
  {
    icon: 'calendar-outline',
    title: 'Venue change',
    message: 'CEHD Design Expo moved to the University Gym.',
    time: '1w ago',
    unread: false
  },
  {
    icon: 'notifications-outline',
    title: 'Library reminder',
    message: 'You have 2 books due for return this Friday.',
    time: '1w ago',
    unread: false
  },
  {
    icon: 'card-outline',
    title: 'Scholarship application open',
    message: 'Academic scholarship applications open until Aug 15.',
    time: '2w ago',
    unread: false
  },
  {
    icon: 'megaphone-outline',
    title: 'Foundation Week schedule released',
    message: 'Check out the full lineup of activities for Foundation Week.',
    time: '2w ago',
    unread: false
  }
];

savedEvents: MockSavedEvent[] = [
  { title: 'CITE Hackathon 2026', date: 'Jul 18, 2026', department: 'CITE', color: '#8b5cf6' },
  { title: 'Nursing Pinning Ceremony', date: 'Aug 2, 2026', department: 'CNAHS', color: '#3b82f6' },
  { title: 'Business Career Fair', date: 'Aug 9, 2026', department: 'CBAA', color: '#facc15' },
  { title: 'Engineering Design Expo', date: 'Aug 14, 2026', department: 'CEHD', color: '#22c55e' },
  { title: 'Foundation Week Opening', date: 'Sep 1, 2026', department: 'CLAGE', color: '#ec4899' },
  { title: 'Criminology Mock Trial', date: 'Sep 5, 2026', department: 'CCJE', color: '#f97316' },
  { title: 'Accountancy Board Exam Send-off', date: 'Sep 10, 2026', department: 'CBAA', color: '#facc15' },
  { title: 'Sports Fest Opening Ceremony', date: 'Sep 15, 2026', department: 'CLAGE', color: '#ec4899' },
  { title: 'IT Congress 2026', date: 'Sep 22, 2026', department: 'CITE', color: '#8b5cf6' },
  { title: 'Education Week Culmination', date: 'Sep 28, 2026', department: 'CEHD', color: '#22c55e' }
];

  faqs: MockFaq[] = [
    {
      question: 'How do I sync events to my phone\u2019s calendar?',
      answer: 'Open an event, tap "Add to Calendar," and choose your default calendar app.',
      open: false
    },
    {
      question: 'Why can\u2019t I see events from another department?',
      answer: 'Events are filtered by department by default. Tap "Departments" and choose "All" to view everything.',
      open: false
    },
    {
      question: 'How do I update my profile photo?',
      answer: 'Go to My Profile from the side menu, tap your avatar, then choose a new photo.',
      open: false
    },
    {
      question: 'I forgot my password. What do I do?',
      answer: 'On the login screen, tap "Forgot Password" and follow the reset instructions sent to your school email.',
      open: false
    },
    {
      question: 'How do I turn off notifications for one department?',
      answer: 'Go to Notifications settings from your profile and toggle off the departments you don\u2019t want alerts from.',
      open: false
    },
    {
      question: 'Can I use the app without a network connection?',
      answer: 'Events you\u2019ve already loaded stay viewable offline, but new updates need an internet connection to sync.',
      open: false
    }
  ];

  contactGroups: ContactGroup[] = [
    {
      label: 'Social Media',
      items: [
        {
          icon: 'logo-youtube',
          name: 'BaliuagU1925',
          sub: 'YouTube',
          iconBg: '#ff0000',
          iconColor: '#ffffff',
          link: 'https://youtube.com/@BaliuagU1925',
          isLink: true
        },
        {
          icon: 'logo-tiktok',
          name: 'letsgobu',
          sub: 'TikTok',
          iconBg: '#000000',
          iconColor: '#ffffff',
          link: 'https://tiktok.com/@letsgobu',
          isLink: true
        },
        {
          icon: 'logo-twitter',
          name: 'baliuagu',
          sub: 'X',
          iconBg: '#000000',
          iconColor: '#ffffff',
          link: 'https://x.com/baliuagu',
          isLink: true
        },
        {
          icon: 'logo-instagram',
          name: 'baliuagu',
          sub: 'Instagram',
          iconBg: '#e1306c',
          iconColor: '#ffffff',
          link: 'https://instagram.com/baliuagu',
          isLink: true
        }
      ]
    },
    {
      label: 'Phone',
      items: [
        {
          icon: 'call-outline',
          name: '(044) 766 3344',
          sub: 'Mobile',
          iconBg: '#e5f3e8',
          iconColor: '#006633',
          link: 'tel:+63447663344'
        }
      ]
    },
    {
      label: 'Email',
      items: [
        {
          icon: 'mail-outline',
          name: 'info@baliuagu.edu.ph',
          sub: 'Email',
          iconBg: '#e5f3e8',
          iconColor: '#006633',
          link: 'mailto:info@baliuagu.edu.ph'
        }
      ]
    },
    {
      label: 'Messenger',
      items: [
        {
          icon: 'chatbubbles-outline',
          name: 'Baliuag University',
          sub: 'Messenger',
          iconBg: '#e5f3e8',
          iconColor: '#006633',
          link: 'https://m.me/BaliuagUniversity'
        }
      ]
    },
    {
      label: 'Registrar\u2019s Office',
      items: [
        {
          icon: 'call-outline',
          name: '(044) 766-2555',
          sub: 'Mobile',
          iconBg: '#e5f3e8',
          iconColor: '#006633',
          link: 'tel:+63447662555'
        },
        {
          icon: 'mail-outline',
          name: 'registrar@baliuag.edu.ph',
          sub: 'Email',
          iconBg: '#e5f3e8',
          iconColor: '#006633',
          link: 'mailto:registrar@baliuag.edu.ph'
        },
        {
          icon: 'location-outline',
          name: 'Ground Floor, Administration Building',
          sub: 'Office',
          iconBg: '#e5f3e8',
          iconColor: '#006633'
        },
        {
          icon: 'time-outline',
          name: 'Mon\u2013Fri, 8:00 AM\u20135:00 PM',
          sub: 'Office Hours',
          iconBg: '#e5f3e8',
          iconColor: '#006633'
        }
      ]
    }
  ];


  
  get unreadCount(): number {
    return this.notifications.filter(n => n.unread).length;
  }

  markAllRead() {
    this.notifications.forEach(n => (n.unread = false));
  }

  toggleFaq(faq: MockFaq) {
    faq.open = !faq.open;
  }

  dismiss() {
    this.modalController.dismiss();
  }
}