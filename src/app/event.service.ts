import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events, Event } from 'src/types';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const events: Events = [

  {
    id: 'paris-2024',
    title: 'ngGirls @ Paris',
    location: 'Paris',
    city: 'Paris',
    state: 'France',
    date: 'February 3, 2024',
    year: '2024',
    applicationForm: 'https://docs.google.com/forms/d/e/1FAIpQLSeBvSIsUBw2KvpEGFqu7QnCWwcFSKa7MnK49AHO9VFGlwoVuA/viewform?usp=sf_link',
    applicationButton: 'inscription participante',
    // mentorsForm: 'https://docs.google.com/forms/d/e/1FAIpQLSeBvSIsUBw2KvpEGFqu7QnCWwcFSKa7MnK49AHO9VFGlwoVuA/viewform?usp=sf_link',
    // mentorsButton: 'inscription mentor',
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
    timetable: {
      instructors: [],
      groups: [
        { 
          mentor: [{ 'firstname': 'Sangeeta', 'lastname': 'Joshi', 'image': 'assets/events/ngconf-2024/mentors/sangeeta.jpg'}],
          
        },
        { 
          mentor: [{ 'firstname': 'Jan-Niklas', 'lastname': 'Wortmann', 'image': 'assets/events/ngconf-2024/mentors/jan-niklas.jfif'}],
          
        },
        { 
          mentor: [{ 'firstname': 'Craig', 'lastname': 'Spence', 'image': 'assets/events/ngconf-2024/mentors/craig.jfif'}],
          
        },
        { 
          mentor: [{ 'firstname': 'Nalini', 'lastname': 'Kodali', 'image': 'assets/events/ngconf-2024/mentors/female.svg'}],
          
        },
      ],
      infos: [
        { key: '📅', text: 'Tuesday March 19, 2024'},
        { key: '⏰', text: '9:00 - 17:00 MST (Salt Lake City, USA, GMT -7)'},
        { key: '🏠', text: 'The Grand American Hotel, Salt Lake City'},
        { key: '🥤', text: 'Lunch and refreshments provided'},
        { key: '👨‍👦‍👦', text: 'Link to the groups', link: 'https://docs.google.com/presentation/d/1WbK7dg154tquToFlk8KBW2ppSfqdalMs0Xxn_6ZIXW8/edit#slide=id.gacb9094982_0_29'},
        { key: '📚', text: 'ngGirls tutorial', link: 'https://ng-girls.gitbook.io/todo-list-tutorial'},
        { key: '🚪', text: 'Room "Tuscany", 3rd floor'},
        { key: '🧭', text: 'Way to the workshop room', link: 'https://www.youtube.com/watch?v=nIbfPDzGETw'},

      ],
      basics: {
        floorplan: 'assets/events/ngconf-2024/floorplan.png',
        timezone: 'Mountain Standard Time (GMT-7)'
      },
      dates: [
        { time: '09:00 - 09:15', text: '👋  Check in'},
        { time: '09:15 - 10:00', text: '💡  Introduction to ngGirls and Angular'}, 
        { time: '10:00 - 12:55', text: '🪑 start working in groups'},
        { time: '12:55	        ', text: ' 📷 group photo'},
        { time: '13:00 - 14:00', text: '🍕  Lunch break & networking'},
        { time: '14:00 - 16:30', text: '⌨️  Coding & working'},
        { time: '16:30 - 17:00', text: '🏆  Closing lecture and goodbyes' }
      ]
    },
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

  constructor(private router: ActivatedRoute, private http: HttpClient, private route: ActivatedRoute) {
  }
   // Simulate fetching events asynchronously
   getEvents(): Observable<any> {
    return of(this.events); // Return static events wrapped in an observable
  }

  // Extract event ID from route parameters
  getEventId(): Observable<string | null> {
    return this.route.paramMap.pipe(
      map(params => params.get('eventId'))
    );
  }

  // Get events with the specified ID
  getEventById(id: string): Observable<any> {
    return this.getEvents().pipe(
      map(events => events.find((event: Event) => event.id === id))
    );
  }
  // Example of a method to retrieve the password associated with an event ID
  getEventPassword(eventId: string): Observable<string> {
    // Here, you would typically fetch the password from a data source like a backend server.
    // For the sake of this example, I'll provide a hardcoded password.
    // You should replace this with your actual implementation.

    // Assuming you have a map of event IDs to passwords
    const eventPasswords: { [eventId: string]: string } = {
      'ngconf-2024': 'test',
      // Add more event IDs and passwords as needed
    };

    // Retrieve the password for the provided event ID
    const password = eventPasswords[eventId];

    // If the password is found, return it as an observable
    if (password) {
      return of(password);
    } else {
      // If the password is not found, you might want to handle this differently.
      // For example, you could return a default password, throw an error, or handle it in some other way.
      // Here, I'll return an observable with an empty string.
      return of('');
    }
  }
}
