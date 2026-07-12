import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User
} from '@angular/fire/auth';

import {
  Firestore,
  doc,
  setDoc,
  docData
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);
  private firestore = inject(Firestore);

  user$: Observable<User | null> = authState(this.auth);

  constructor() {}

  async register(
    name: string,
    studentNumber: string,
    password: string,
    department: string
  ) {

    const email = `${studentNumber}@bucalendar.app`;

    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const uid = credential.user.uid;

    await setDoc(doc(this.firestore, 'users', uid), {
      uid,
      name,
      studentNumber,
      email,
      department
    });

    return credential;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  getUserProfile(uid: string) {
    const userDoc = doc(this.firestore, `users/${uid}`);
    return docData(userDoc);
  }

  async updateProfilePhoto(uid: string, photoBase64: string) {
  const userDoc = doc(this.firestore, `users/${uid}`);
  return setDoc(userDoc, { photoBase64 }, { merge: true });
}
}