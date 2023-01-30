import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

const events = [
  {
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
  },
  {
    id: 'rome-2022',
    title: 'ngGirls @ NG ROME MMXXII',
    location: 'Rome',
    city: 'Rome',
    state: 'Italy',
    date: 'December 1',
    year: '2022',
    applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSc9i28iBoa6NcEOLOA1AKZ0UBgQ-_DHXS39DBsV4RLe7Nagnw/viewform',
    mentorsForm: 'https://docs.google.com/forms/d/e/1FAIpQLSd5wNo6XADHmueIJ_jU0UG11GiWLa9h-DjXwj-dtj1iHZ6SLQ/viewform',
    announcement: `We're excited to be part of <a href="https://ngrome.io/">NG ROME MMXXII</a> - and bring the ngGirls workshop to the local community!
<b>ngGirls @ NG ROME MMXXII</b> will take place on Thursday, December 1st, from 9:00-17:00. Venue will be soon announced. For more details and application: `,
    sponsors: [{ link: 'https://ngrome.io//', logo: 'assets/events/rome-2022/logo-ng-rome-2022.svg' }]
  },
  {
    id: 'belgium-2023',
    title: 'ngGirls @ NG-BE',
    location: 'Holiday Inn Gent - Expo, an IHG Hotel, Maaltekouter, Gent, Belgien',
    city: 'Ghent',
    state: 'Belgium',
    date: 'March 24',
    year: '2023',
    applicationForm: 'https://forms.gle/LjSiygW8nP7gH1kc9',
    mentorsForm: 'https://forms.gle/XYSapXdCzM5GFeix9',
    announcement: `We're excited to be part of <a href="https://ng-be.org/">NG-BE</a> - and bring the ngGirls workshop to the local community!
<b>ngGirls @ NG-BE</b> will take place on Friday, March 24th, from 9 AM - 5 PM Central European Time (GMT +1) in the Ghent Expo Holiday Inn, Ghent, Belgium. For more details and application: `,
    sponsors: [{ link: 'https://ng-be.org/', logo: 'assets/events/ngbe-2023/ng-be-logo.png' }]
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
