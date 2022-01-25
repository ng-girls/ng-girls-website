import { Component,  Input } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
  <h2 class="section-title {{type}}" *ngIf="range == 2">{{label}}</h2>
  <h3 class="sub-title text--center {{type}}" *ngIf="range == 3">{{label}}</h3>
  `,
  styleUrls: ['title.component.scss'],
})
export class TitleComponent {
  @Input() label: any;
  @Input() range: any = 2;
  @Input() type: any = 'light';
  constructor() {

   }
}
