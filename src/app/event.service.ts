import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

const events = [
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
