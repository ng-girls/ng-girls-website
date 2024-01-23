import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Events } from 'src/types';

const events: Events = [

  {
    id: 'paris-2024',
    title: 'ngGirls @ Paris',
    location: 'Paris',
    city: 'Paris',
    state: 'France',
    date: 'February 3, 2024',
    year: '2024',
    applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSc9gSruxOh0ZgtmgO_yFm7w1ZwRPR2jt1T5DAPa7WHHoiEkXg/viewform',
    applicationButton: 'inscription participante',
    mentorsForm: 'https://docs.google.com/forms/d/e/1FAIpQLSebfkegZQNaYIuWYTW-M3tIK0lapmiwx3DWoN3Ns6CP1nX_qg/viewform',
    mentorsButton: 'inscription mentor',
    announcement: `Nous avons le plaisir de vous annoncer notre prochain atelier ngGirls à Paris. Il sera porté par <a href="https://angulardevs.fr/" target="_blank">Angular Devs France</a> pour la communauté locale! <b>ngGirls @ Paris 2024</b> aura lieu le Samedi 3 Février de 9h à 17h à Paris.
    Pour plus de détails et vous inscrire: `,
    sponsors: [{ link: 'https://angulardevs.fr/', logo: 'assets/events/paris-2024/angular_devs_fr.webp' }]
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
      { link: 'https://ng-conf.org/', logo: 'assets/events/ngconf-2024/logo.webp' }
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
