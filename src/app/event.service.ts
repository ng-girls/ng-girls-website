import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events, Event } from 'src/types';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const events: Events = [

  {
    id: 'rome-2024',
    title: 'ngGirls @ NG ROME MMXXIV',
    location: 'Rome',
    city: 'Rome',
    state: 'Italy',
    date: 'June 26, 2024',
    year: '2024',
    applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLScpM4cBeqDtHkeKw8vZhPDbSdP_6wjtZMEOB6nOzVrFv6GrIg/viewform',
    mentorsForm: 'https://docs.google.com/forms/d/e/1FAIpQLSdYYM2momTb95ury4-BR2jjjTwAzdtOpuitTPR8XAR2gjEcpQ/viewform',
    announcement: `We're excited to be part of <a href="https://2023.ngrome.io/">NG ROME MMXXIV</a> - and bring the ngGirls workshop to the local community!
<b>ngGirls @ NG ROME MMXXIV</b> will take place on Wednesday, June 26th, from 9:00-17:00 in Rome. For more details and application: `,
    sponsors: [{ link: 'https://ngrome.io/', logo: 'assets/events/rome-2024/logo.svg' }]
  }
];


@Injectable({
  providedIn: 'root'
})
export class EventService {
  events = events;
  eventId$ = this.router.paramMap.pipe(
    map(params => params.get('eventId'))
  );

  constructor(private router: ActivatedRoute, private http: HttpClient, private route: ActivatedRoute) {
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
