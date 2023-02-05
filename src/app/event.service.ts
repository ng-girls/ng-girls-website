import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

const events = [
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
    sponsors: [
      { link: 'https://ng-be.org/', logo: 'assets/events/ngbe-2023/ng-be-logo.png' },
      { link: 'https://ng-be.org/sponsors/peopleware', logo: 'assets/events/ngbe-2023/peopleware.png' },
    ]
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
