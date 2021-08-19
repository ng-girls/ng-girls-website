import { Component,  Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
  <a href="{{item.link}}" target="_blank" rel="noopener">
      <app-title *ngIf="item.title" label="{{item.title}}" type="{{item.titleType}}"></app-title>
        <picture class="img-{{item.width}}">
            <source media="(min-width: 500px)" srcset="{{item.logo}}">
            <source media="(min-width: 300px)" srcset="{{item.logo.replace('-200.webp', '-100.webp' )}}">
            <img src="{{item.logo}}" alt="{{item.alt || ''}} logo" width="{{item.width}}" height="{{item.height}}"  loading="lazy" >
        </picture>
    </a>
  `,
  styleUrls: ['logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() item: any;
  constructor() {
  }
  ngOnInit(): void {
    this.item.width = this.item.width || '200';
    this.item.height = this.item.height || '200';
    this.item.logo = this.item.logo.indexOf('assets/') === -1 ? `./assets/partners/${this.item.logo}` : this.item.logo;
  }
}
