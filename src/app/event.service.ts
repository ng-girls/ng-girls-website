import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

const events = [
  {
    id: 'verona-2022',
    title: 'ngGirls @ AngularDay',
    location: 'Verona',
    city: 'Verona',
    state: 'Italy',
    date: 'October 8',
    year: '2022',
    announcement: `We're excited to be part of <a href="https://2022.angularday.it/">AngularDay, Verona</a> - and bring the ngGirls workshop to the local community!
<b>ngGirls @ Verona</b> will take place on Saturday, October 8th, from 9:30-17:30, at the conference venue. For more details and application: `,
    sponsors: [{link: 'https://2022.angularday.it/', logo: 'assets/angularday-2022/angularday-logo.svg'}]
  },
  {
    id: 'berlin-2022',
    title: 'ngGirls @ NG-DE',
    location: 'Berlin',
    city: 'Berlin',
    state: 'Germany',
    date: 'October 8',
    year: '2022',
    announcement: `We're excited to be part of <a href="https://2022.angularday.it/">AngularDay, Berlin</a> - and bring the ngGirls workshop to the local community!
<b>ngGirls @ Verona</b> will take place on Saturday, October 8th, from 9:30-17:30, at the conference venue. For more details and application: `,
  sponsors: [{link: 'https://2022.angularday.it/', logo: 'assets/angularday-2022/angularday-logo.svg'}]
  },
  {
    id: 'warsaw-2022',
    title: 'ngGirls @ NG-Poland',
    location: 'Warsaw',
    city: 'Warsaw',
    state: 'Poland',
    date: 'October 25',
    year: '2022',
    announcement: `We're excited to be part of <a href="https://2022.angularday.it/">AngularDay, Warsaw</a> - and bring the ngGirls workshop to the local community!
<b>ngGirls @ Verona</b> will take place on Saturday, October 8th, from 9:30-17:30, at the conference venue. For more details and application: `,
    sponsors: [{link: 'https://2022.angularday.it/', logo: 'assets/angularday-2022/angularday-logo.svg'}]
  }

];

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events = events;
  eventId$ = this.router.paramMap.pipe(
    map(params => params.get('eventId')),
    tap(console.log)
  );

  constructor(private router: ActivatedRoute, private sanitizer: DomSanitizer) {
    // this.router.paramMap
    this.eventId$.subscribe(console.log)
  }
}
