import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  ToastController,
  LoadingController,
  IonLabel,
  IonCardContent,
  IonCard
} from '@ionic/angular/standalone';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonLabel,
    IonCardContent,
    IonCard
  ]
})
export class LoginPage {

  studentNumber = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController
  ) {}

  async login() {

  if (!this.studentNumber || !this.password) {
    const t = await this.toast.create({
      message: 'Please enter your Student Number and Password.',
      duration: 2000,
      color: 'danger'
    });
    return t.present();
  }

  const loading = await this.loading.create({
    message: 'Signing in...'
  });

  await loading.present();

  try {

    const email = `${this.studentNumber}@bucalendar.app`;

    await this.auth.login(email, this.password);

    await loading.dismiss();

    const t = await this.toast.create({
      message: 'Welcome!',
      duration: 1500,
      color: 'success'
    });

    await t.present();

    this.router.navigateByUrl('/home', { replaceUrl: true });

  } catch (error: any) {

    await loading.dismiss();

    const t = await this.toast.create({
      message: 'Invalid Student Number or Password',
      duration: 3000,
      color: 'danger'
    });

    await t.present();
  }
}

  goToRegister() {
  this.router.navigateByUrl('/register');
}

}