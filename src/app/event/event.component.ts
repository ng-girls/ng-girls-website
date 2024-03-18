import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  team = [
    { id: 'robert', name: 'Robert Willemelis', image: 'Robert.jpg' },
    { id: 'katarzyna', name: 'Katarzyna Płocka', image: 'Pelcia.jpg' },
  ];
  event$ = this.route.paramMap.pipe(
    map(params => params.get('eventId')),
    map(eventId => eventId ? this.eventService.events.find(event => event.id === eventId) : null)
  );

  isAuthenticated: boolean = false; // Flag to indicate authentication state
  password: string | null = null; // Variable to store the password from query parameters

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    // Retrieve the event based on the event ID from the route parameters
    this.route.paramMap.subscribe(params => {
      const eventId = params.get('eventId');
      if (eventId) {
        // Assuming you have a method in EventService to get the event by ID
        this.event$ = this.eventService.getEventById(eventId);
      }
    });

    // Retrieve password from query parameters
    this.route.queryParams.subscribe(params => {
      this.password = params['view'] || null;
    });

    this.isAuthenticated = this.checkAuthenticationStatus();
  }

  checkAuthenticationStatus(): boolean {
    const expectedPassword = 'internal'; // Replace with your actual expected password
    return this.password === expectedPassword;
  }

}
