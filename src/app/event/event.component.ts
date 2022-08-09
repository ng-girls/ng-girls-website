import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  event$ = this.route.paramMap.pipe(
    map(params => params.get('eventId')),
    map(eventId => this.eventService.events.find(event => event.id === eventId))
  );

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
