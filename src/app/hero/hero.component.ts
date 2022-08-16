import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  events = this.eventService.events;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
  }

  scrollTo(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
