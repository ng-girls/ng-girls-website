import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

const events = [
  {
    id: 'warsaw-2023',
    title: 'ngGirls @ NG Poland',
    location: 'Warsaw',
    city: 'Warsaw',
    state: 'Poland',
    date: 'November 5',
    year: '2023',
    applicationForm: 'https://forms.gle/woPmCW9PVfSzZrZk8',
    mentorsForm: 'https://forms.gle/uYoju5H5iMZhNXxs8',
    announcement: `<a href="http://ng-poland.pl/" target="_blank">NG Poland Conf</a> has been hosting ngGirls workshops for many years.
Feeling like family, we're happy to come back to Warsaw for the wonderful community,
where the participants are enthusiastic and the mentors are so committed. <br/>
<b>ngGirls @ NG Poland</b> will take place on Sunday, November 5th, from 10:00-17:00. For more details and application: `,
    sponsors: [{ link: 'http://ng-poland.pl/', logo: 'assets/events/ngpoland-2022/ngPoland.png' }]
  },
  {
    id: 'verona-2023',
    title: 'ngGirls @ angularday 2023',
    location: 'Verona',
    city: 'Verona',
    state: 'Italy',
    date: 'November 23',
    year: '2023',
    applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSf8uOZbx4rahJxBtuK-pH6sYzFJQrjXe3xEkOHJaH6ECigacw/viewform',
    mentorsForm: 'https://docs.google.com/forms/d/e/1FAIpQLSfrk8ZaS5DL4xhf8bx9vs7grSAid2sLfAqcpFhZa8KSwpbUJw/viewform',
    announcement: `We're excited to be part of <a href="https://2023.angularday.it">angularday 2023</a> - and bring the ngGirls workshop to the local community!
<b>ngGirls @ angularday 2023</b> will take place on Thursday, November 23rd, from 9:00-17:00 in Verona. For more details and application: `,
    sponsors: [{ link: 'https://2023.angularday.it', logo: 'assets/events/angularday-2022/angularday-logo.svg' }]
  },
  {
    id: 'rome-2023',
    title: 'ngGirls @ NG ROME MMXXIII',
    location: 'Rome',
    city: 'Rome',
    state: 'Italy',
    date: 'November 30',
    year: '2023',
    applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSeBooyy-i1vFQ1LbOQFsxk7X4dPrwzjEdpnzYzpOHpuL-bevQ/viewform',
    mentorsForm: 'https://docs.google.com/forms/d/e/1FAIpQLSfmk_tGgzk9SO7shtHDbO6nMUKWb-3jNrURSPzIEOZx3YIvHw/viewform',
    announcement: `We're excited to be part of <a href="https://2023.ngrome.io/">NG ROME MMXXIII</a> - and bring the ngGirls workshop to the local community!
<b>ngGirls @ NG ROME MMXXIII</b> will take place on Thursday, November 30th, from 9:00-17:00 in Rome. For more details and application: `,
    sponsors: [{ link: 'https://2023.ngrome.io/', logo: 'assets/events/rome-2023/logo.svg' }]
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
