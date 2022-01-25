import { Component } from '@angular/core';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss']
})
export class AboutSectionComponent {

  subsections = [
    {
      title: 'motivation',
      img: './assets/backgrounds/motivation_small.webp',
      description: 'ngGirls aims to introduce women to the world of technology and increase the diversity. Angular is a great technology to start with. We believe this is a win-win situation!'
    },
    {
      title: 'operation',
      img: './assets/backgrounds/operation_small.webp',
      description: 'We plan various events and activities in which the participants build and deploy a web application with Angular. We offer guidance to help finding a job in front end development.'
    },
    {
      title: 'participation',
      img: './assets/backgrounds/participation_small.webp',
      description: "If you're a committed, motivated woman who wants to step into the Web Development world - your place is with us! Want to help? Please get in touch!"
    }
  ];

  mailAddress = "hello@ng-girls.org";
  newsletterLink = "https://docs.google.com/forms/d/e/1FAIpQLSdWw5cOjjGNM7cxUpk7F7fYBZU4_1okOH9sYlwU-WcY6U8Sjg/viewform";

  constructor() { }

}
