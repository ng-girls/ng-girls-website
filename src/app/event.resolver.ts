import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from './event.service'; // Update this import with the correct event service

@Injectable({ providedIn: 'root' })
export class EventResolver implements Resolve<Event[]> {
  constructor(private eventService: EventService) {}

  resolve(): Observable<Event[]> {
    return this.eventService.getEvents(); // Assuming getEvents() returns an Observable of events
  }
}
