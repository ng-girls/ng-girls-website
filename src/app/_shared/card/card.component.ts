import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
  <a [routerLink]="card.route" *ngIf="!card.archived">
    <mat-card class="card-{{type}}">
      <img mat-card-image src="{{card.imagePreview? card.imagePreview : card.image}}" alt="workshop {{card.title}}" loading="lazy" >
      <mat-card-header>
          <mat-card-title>{{card.title}}</mat-card-title>
          <mat-card-subtitle>{{card.date}}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content *ngIf="card.description">
      <p>{{card.description}}</p>
      </mat-card-content>
      </mat-card>
  </a>
  `,
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: any;
  @Input() type: string = 'workshops';
  constructor() {
  }
  ngOnInit(): void {
     if(this.card.author){
       this.card.date = this.card.author;
     }

  }
}
