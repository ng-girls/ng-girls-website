import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team = [
    { id: 'shmuela', name: 'Shmuela Jacobs', image: 'Shmuela.jpg', subtitle: 'Founder, ngGirls'},
    { id: 'revital', name: 'Revital Friedman', image: 'Revital.jpg', subtitle: 'Founder, ngGirls'},
    { id: 'robert', name: 'Robert Willemelis', image: 'Robert.jpg', subtitle: 'Founder, ngGirls'},
    { id: 'martina', name: 'Martina Kraus', image: 'Martina.jpg', subtitle: 'Founder, ngGirls'},
    { id: 'katarzyna', name: 'Katarzyna Płocka', image: 'Pelcia.jpg', subtitle: 'Founder, ngGirls'},
    { id: 'alisa', name: 'Alisa Duncan', image: 'Alisa.jpg', subtitle: 'Founder, ngGirls'},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
