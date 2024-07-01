import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events, Event } from 'src/types';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import events from 'src/app/data/events.json';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: Events = events;
  eventId$ = this.router.paramMap.pipe(
    map(params => params.get('eventId'))
  );

  constructor(private router: ActivatedRoute, private http: HttpClient, private route: ActivatedRoute) {
    console.log('EventService created', events);
  }
   // Simulate fetching events asynchronously
   getEvents(): Observable<any> {
    return of(this.events); // Return static events wrapped in an observable
  }

  // Extract event ID from route parameters
  getEventId(): Observable<string | null> {
    return this.route.paramMap.pipe(
      map(params => params.get('eventId'))
    );
  }

  // Get events with the specified ID
  getEventById(id: string): Observable<any> {
    return this.getEvents().pipe(
      map(events => events.find((event: Event) => event.id === id))
    );
  }
  // Example of a method to retrieve the password associated with an event ID
  getEventPassword(eventId: string): Observable<string> {
    // Here, you would typically fetch the password from a data source like a backend server.
    // For the sake of this example, I'll provide a hardcoded password.
    // You should replace this with your actual implementation.

    // Assuming you have a map of event IDs to passwords
    const eventPasswords: { [eventId: string]: string } = {
      'ngconf-2024': 'test',
      // Add more event IDs and passwords as needed
    };

    // Retrieve the password for the provided event ID
    const password = eventPasswords[eventId];

    // If the password is found, return it as an observable
    if (password) {
      return of(password);
    } else {
      // If the password is not found, you might want to handle this differently.
      // For example, you could return a default password, throw an error, or handle it in some other way.
      // Here, I'll return an observable with an empty string.
      return of('');
    }
  }
}
