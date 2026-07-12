import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  closeOutline,
  timeOutline,
  compassOutline,
  flagOutline,
  eyeOutline,
  ribbonOutline,
  schoolOutline
} from 'ionicons/icons';

import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-about-modal',
  standalone: true,
  imports: [CommonModule, IonIcon],
  template: `
  <div class="modal-card">

    <button class="modal-close-btn" (click)="close()">
      <ion-icon name="close-outline"></ion-icon>
    </button>

    <div class="about-hero">
      <div class="about-brand">
        <img src="assets/bu-logo.png" class="about-logo" alt="BU Logo">
        <p class="motto">Patria · Scientia · et Virtus</p>
        <h2>Baliuag University</h2>
        <p class="subtitle">Student Calendar Portal</p>
        <span class="est-badge">Est. 1925 · Glorious Past, Radiant Future</span>
      </div>
    </div>

    <div class="modal-body">

      <div class="about-section">
        <div class="about-label">
          <ion-icon name="time-outline"></ion-icon>
          History
        </div>
        <p>
          Founded in 1925 by Domingo "Tatang" Santiago Sr. as the
          Baliuag Institute, a modest high school of 75 students, the
          institution grew steadily through the decades — becoming
          Baliuag Junior College in 1947 and Baliuag Colleges in 1968.
          In 2001, it was conferred university status under the
          leadership of Dr. Alicia Santiago-Bustos, marking the start
          of Baliuag University's golden age. Today, under Dr. Patricia
          Bustos-Lagunda, BU continues to grow, innovate, and serve
          generations of students nearing its centennial legacy.
        </p>
      </div>

      <div class="about-section">
        <div class="about-label">
          <ion-icon name="compass-outline"></ion-icon>
          Philosophy
        </div>
        <p>
          Guided by its firm belief in Divine Providence, Baliuag
          University's philosophy is rooted in humanitarian principles,
          democracy, sustainable development, and peace — anchored in
          its threefold precept: <em>patria, scientia, et virtus</em>
          (country, science, and virtue).
        </p>
      </div>

      <div class="about-section">
        <div class="about-label">
          <ion-icon name="flag-outline"></ion-icon>
          Mission
        </div>
        <p>
          As a recognized leader in affordable, quality education in
          Baliuag and its surrounding communities, Baliuag University
          offers programs responsive to the times yet rooted in
          heritage and humanistic values. Its graduates realize their
          aspirations as well as society's greater good, while its
          research and outreach programs address issues relevant to
          the communities it serves.
        </p>
      </div>

      <div class="about-section">
        <div class="about-label">
          <ion-icon name="eye-outline"></ion-icon>
          Vision
        </div>
        <p>
          Baliuag University aims to be an educational leader in the
          region, respected and recognized in the Philippines and
          abroad for its academic excellence, achievements in research,
          commitment to community service, and pioneering technological
          advancement.
        </p>
      </div>

      <div class="about-section">
        <div class="about-label">
          <ion-icon name="school-outline"></ion-icon>
          Programs &amp; Colleges
        </div>
        <div class="programs-grid">
          <div class="program-chip" *ngFor="let p of programs">{{ p }}</div>
        </div>
      </div>

      <div class="about-section">
        <div class="about-label">
          <ion-icon name="ribbon-outline"></ion-icon>
          Core Values
        </div>
        <div class="values-grid">
          <div class="value-chip">Responsibility</div>
          <div class="value-chip">Integrity</div>
          <div class="value-chip">Service</div>
          <div class="value-chip">Excellence</div>
          <div class="value-chip">Respect</div>
        </div>
      </div>

    </div>

  </div>
`,
  styleUrls: ['./about-modal.component.scss']
})
export class AboutModalComponent {

  programs = [
    'College of Law',
    'Basic Education',
    'Senior High School',
    'Liberal Arts and General Education',
    'Business Administration and Accountancy',
    'Nursing and Allied Health Sciences',
    'Education and Library and Information Science',
    'Information Technology',
    'Engineering',
    'Hospitality Management and Tourism',
    'Doctorate and Masters Programs',
    'Certificate Programs',
    'International Programs'
  ];

  constructor(private modalCtrl: ModalController) {
    addIcons({
      closeOutline,
      timeOutline,
      compassOutline,
      flagOutline,
      eyeOutline,
      ribbonOutline,
      schoolOutline
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}