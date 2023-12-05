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
