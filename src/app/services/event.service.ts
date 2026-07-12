import { Injectable, inject } from '@angular/core';
import { doc, docData } from '@angular/fire/firestore';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  updateDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {

  private firestore = inject(Firestore);
  private eventsRef = collection(this.firestore, 'events');

  getEvents(): Observable<any[]> {
    return collectionData(this.eventsRef, { idField: 'id' }) as Observable<any[]>;
  }

  async deleteEvent(id: string) {
  const ref = doc(this.firestore, `events/${id}`);
  return deleteDoc(ref);
}

  addEvent(event: any) {
    return addDoc(this.eventsRef, event);
  }

 

  getEvent(id: string) {
  const ref = doc(this.firestore, `events/${id}`);
  return docData(ref, { idField: 'id' });
}

  updateEvent(id: string, data: any) {
    const ref = doc(this.firestore, `events/${id}`);
    return updateDoc(ref, data);
  }
}