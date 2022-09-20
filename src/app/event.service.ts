import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

const events = [
  {
    id: 'ng-de-2022',
    title: 'ngGirls @ NG-DE',
    location: 'Berlin',
    city: 'Berlin',
    state: 'Germany',
    date: 'October 4',
    year: '2022',
    applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSfZ2qMPfuigiq3KRnrTv30ndomTaGj6XK44RIvjHnnbIRO4Ow/viewform',
    mentorsForm: 'https://docs.google.com/forms/d/e/1FAIpQLSeEjunIiKEONuSWauN53qgxhcrGsMGd4P4I2gFi8ggxlR1Rbg/viewform',
    announcement: `ngGirls has been part of the Angular conference in Germany, <a href="https://ng-de.org/" target="_blank">NG-DE</a>, 
    since its first edition, and has been supported by the wonderful <a href="https://www.meetup.com/de-DE/Angular-Meetup-Berlin/" target="_blank">Angular Berlin</a> community. 
    <br/>
    We're excited to come back to Berlin with our free workshop!`,
    sponsors: [
      { link: 'https://ng-de.org/', logo: 'assets/events/ngde-2022/ng-de.svg' },
      { link: 'https://workshops.de/', logo: 'assets/events/ngde-2022/workshops-de.svg' },
      { link: 'https://www.meetup.com/de-DE/Angular-Meetup-Berlin/', logo: 'assets/events/ngde-2022/angular-berlin.svg' },
      { link: 'https://angular.de/', logo: 'assets/events/ngde-2022/angular-de.svg' },
    ]
  },
  {
    id: 'verona-2022',
    title: 'ngGirls @ angularday',
    location: 'Verona',
    city: 'Verona',
    state: 'Italy',
    date: 'October 8',
    year: '2022',
    applicationForm: 'https://forms.gle/ttLTBJbCFjeA4u8t7',
    mentorsForm: 'https://forms.gle/YJk8N1g23Ls7jiHH9',
    announcement: `We're excited to be part of <a href="https://2022.angularday.it/">angularday, Verona</a> - and bring the ngGirls workshop to the local community!
<b>ngGirls @ angularday</b> will take place on Saturday, October 8th, from 9:30-17:30, at the conference venue. For more details and application: `,
    sponsors: [{ link: 'https://2022.angularday.it/', logo: 'assets/events/angularday-2022/angularday-logo.svg' }]
  }, {
    id: 'warsaw-2022',
    title: 'ngGirls @ ngPoland',
    location: 'Warsaw',
    city: 'Warsaw',
    state: 'Poland',
    date: 'October 23',
    year: '2022',
    applicationForm: 'https://forms.gle/f9BmEQttGWDYVLJ88',
    mentorsForm: 'https://forms.gle/co3L9i82Mgx9c25S6',
    announcement: `<a href="http://ng-poland.pl/" target="_blank">NG-Poland Conf</a> has been hosting ngGirls workshops for many years. 
Feeling like family, we're happy to come back to Warsaw for the wonderful community, 
where the participants are enthusiastic and the mentors are so committed. <br/>
<b>ngGirls @ ngPoland</b> will take place on Sunday, October 23rd, from 10:00-17:00. For more details and application: `,
    sponsors: [{ link: 'http://ng-poland.pl/', logo: 'assets/events/ngpoland-2022/ngPoland.png' }]
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

  constructor(private router: ActivatedRoute) {
  }
}
