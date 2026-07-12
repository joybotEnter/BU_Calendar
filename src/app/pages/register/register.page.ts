import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  ToastController,
  LoadingController,
  
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  RouterLink
]
})
export class RegisterPage {

  name = '';
  studentNumber = '';
  password = '';
  confirmPassword = '';
  department = '';

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
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController
  ) {}

  async register() {

    if (
      !this.name ||
      !this.studentNumber ||
      !this.password ||
      !this.department
    ) {

      const t = await this.toast.create({
        message: 'Please complete all fields.',
        duration: 2000,
        color: 'danger'
      });

      return t.present();
    }

    if (this.password !== this.confirmPassword) {

      const t = await this.toast.create({
        message: 'Passwords do not match.',
        duration: 2000,
        color: 'danger'
      });

      return t.present();
    }

    const loading = await this.loading.create({
      message: 'Creating account...'
    });

    await loading.present();

    try {

      // Generate Firebase email from Student Number

      await this.auth.register(
  this.name,
  this.studentNumber,
  this.password,
  this.department
);

      await loading.dismiss();

      const t = await this.toast.create({
        message: 'Account created successfully!',
        duration: 2000,
        color: 'success'
      });

      await t.present();

      this.router.navigateByUrl('/home', {
        replaceUrl: true
      });

    } catch (error: any) {

      await loading.dismiss();

      const t = await this.toast.create({
        message: error.message,
        duration: 3000,
        color: 'danger'
      });

      t.present();
    }
  }

}