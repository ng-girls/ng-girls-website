import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  team = [
    { id: 'shmuela', name: 'Shmuela Jacobs', image: 'Shmuela.jpg', subtitle: 'Founder, ngGirls' },
    { id: 'revital', name: 'Revital Friedman', image: 'Revital.jpg' },
    { id: 'robert', name: 'Robert Willemelis', image: 'Robert.jpg' },
    { id: 'martina', name: 'Martina Kraus', image: 'Martina.jpg' },
    { id: 'katarzyna', name: 'Katarzyna Płocka', image: 'Pelcia.jpg' },
    { id: 'alisa', name: 'Alisa Duncan', image: 'Alisa.jpg' },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
