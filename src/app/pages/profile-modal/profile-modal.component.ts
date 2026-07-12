import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular/standalone';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline, cameraOutline, personCircleOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [CommonModule, IonIcon],
  template: `
    <div class="modal-card">

      <button class="modal-close-btn" (click)="close()">
        <ion-icon name="close-outline"></ion-icon>
      </button>

      <div class="profile-hero">

        <div class="avatar-wrap">
          <img *ngIf="photoPreview" [src]="photoPreview" class="avatar-img" />
          <ion-icon *ngIf="!photoPreview" name="person-circle-outline" class="avatar-placeholder"></ion-icon>

          <label class="camera-btn">
            <ion-icon name="camera-outline"></ion-icon>
            <input type="file" accept="image/*" (change)="onFileSelected($event)" hidden />
          </label>
        </div>

        <h2>{{ userProfile?.name || 'Student' }}</h2>
        <p *ngIf="userProfile?.studentNumber">{{ userProfile.studentNumber }}</p>
        <span class="dept-badge" *ngIf="userProfile?.department">{{ userProfile.department }}</span>
      </div>

      <div class="modal-body">
        <p class="hint" *ngIf="!saving">Tap the camera icon to update your profile photo.</p>
        <p class="hint saving" *ngIf="saving">Saved!</p>
      </div>

    </div>
  `,
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent {

  @Input() userProfile: any = null;
  @Input() uid: string = '';

  photoPreview: string | null = null;
  saving = false;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService
  ) {
    addIcons({ closeOutline, cameraOutline, personCircleOutline });
  }

  ngOnInit() {
    this.photoPreview = this.userProfile?.photoBase64 || null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      this.photoPreview = base64;
      this.saving = true;
      try {
        await this.authService.updateProfilePhoto(this.uid, base64);
      } catch (err) {
        console.error('Failed to save photo:', err);
      } finally {
        this.saving = false;
      }
    };
    reader.readAsDataURL(file);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}