import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

const events = [
  {
    id: 'warsaw-2023',
    title: 'ngGirls @ NG-Poland',
    location: 'Warsaw',
    city: 'Warsaw',
    state: 'Poland',
    date: 'November 5',
    year: '2023',
    applicationForm: 'https://forms.gle/woPmCW9PVfSzZrZk8',
    mentorsForm: '',
    announcement: `<a href="http://ng-poland.pl/" target="_blank">NG-Poland Conf</a> has been hosting ngGirls workshops for many years.
Feeling like family, we're happy to come back to Warsaw for the wonderful community,
where the participants are enthusiastic and the mentors are so committed. <br/>
<b>ngGirls @ NG-Poland</b> will take place on Sunday, November 5th, from 10:00-17:00. For more details and application: `,
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
