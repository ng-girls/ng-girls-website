import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Events } from 'src/types';

const events: Events = [

  {
    id: 'tu-berlin-2024',
    title: 'ngGirls @ TU Berlin 2024',
    location: 'Berlin',
    city: 'Berlin',
    state: 'Germany',
    date: 'March 12, 2024',
    year: '2024',
    // applicationForm: '',
    mentorsForm: 'https://docs.google.com/forms/d/e/1FAIpQLSegHaopSqTCHvI2z-asBYkmuxZOHOqFODFUj_I5HDokHenRiw/viewform',
    announcement: `We're excited to bring the ngGirls workshop to the local community at TU Berlin!
<b>ngGirls @ NG TU Berlin</b> will take place on Tuesday, March 12th, from 9:00-17:00 in Berlin. For more details and application: `,
    sponsors: [{ link: 'https://www.tu.berlin/', logo: 'assets/events/tu-berlin-2024/tu-logo.svg' }]
  },
  {
    id: 'ngconf-2024',
    title: 'ngGirls @ NG-CONF',
    location: 'Salt Lake City',
    city: 'Salt Lake City',
    state: 'USA',
    date: 'March 19, 2024',
    year: '2024',
    applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSdCfn6mN3VCmRNGSTRHMQl99T6MA7nqEXo-_RIwojSk5t9PkA/viewform',
    mentorsForm: 'https://docs.google.com/forms/d/e/1FAIpQLSd0sli7Jv9yjRTGq5vspHE_E9HuBO1u2qPlZTJ-0zTTEIbjKw/viewform',
    announcement: `We're excited to be part of <a href="https://ng-conf.org/">NG-CONF 2024</a> - and bring the ngGirls workshop in cooperation with JetBrains to the local community!
    <b>ngGirls @ NG-CONF</b> will take place on Tuesday, March 19th, from 9:00-17:00 in Salt Lake City. For more details and application: `,
    sponsors: [
      { link: 'https://www.jetbrains.com/', logo: 'assets/events/ngconf-2024/jetbrains.svg' },
      { link: 'https://ng-conf.org/', logo: 'assets/events/ngconf-2024/logo_ngconf_2.png' }
    ]
  },
  {
    id: 'rome-2024',
    title: 'ngGirls @ NG ROME MMXXIV',
    location: 'Rome',
    city: 'Rome',
    state: 'Italy',
    date: 'June 26, 2024',
    year: '2024',
    applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLScpM4cBeqDtHkeKw8vZhPDbSdP_6wjtZMEOB6nOzVrFv6GrIg/viewform',
    mentorsForm: 'https://docs.google.com/forms/d/e/1FAIpQLSdYYM2momTb95ury4-BR2jjjTwAzdtOpuitTPR8XAR2gjEcpQ/viewform',
    announcement: `We're excited to be part of <a href="https://2023.ngrome.io/">NG ROME MMXXIV</a> - and bring the ngGirls workshop to the local community!
<b>ngGirls @ NG ROME MMXXIV</b> will take place on Wednesday, June 26th, from 9:00-17:00 in Rome. For more details and application: `,
    sponsors: [{ link: 'https://ngrome.io/', logo: 'assets/events/rome-2024/logo.svg' }]
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
