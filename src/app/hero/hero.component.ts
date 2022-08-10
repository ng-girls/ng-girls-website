import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { slideInAnimation } from '../animations';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [slideInAnimation]
})
export class HeroComponent implements OnInit {
  events = this.eventService.events;

  constructor(private eventService: EventService, private contexts: ChildrenOutletContexts) {
  }

  ngOnInit(): void {
  }

  getAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  scrollTo(element: HTMLElement) {
    element.scrollIntoView({behavior:'smooth'});
  }
}
