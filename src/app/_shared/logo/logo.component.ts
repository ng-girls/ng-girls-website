import { Component,  Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
  <a href="{{item.link}}" target="_blank" rel="noopener">
        <picture>
            <source media="(min-width: 500px)" srcset="{{item.logo}}">
            <source media="(min-width: 300px)" srcset="{{item.logo.replace('-200.webp', '-100.webp' )}}">
            <img src="{{item.logo}}" alt="{{item.title || ''}} logo" width="200" height="200"  loading="lazy" >
        </picture>
    </a>
  `,
  styles: [`
  picture >  img {
    max-width: 200px;
    height: 200px;
    margin-right: 10px;
  }
  @media (max-width: 768px){
    picture >  img {
      width: 100px;
      height: 100px;
    }
  }
      `
    ],
})
export class LogoComponent implements OnInit {
  @Input() item: any;
  constructor() {
  }
  ngOnInit(): void {
    this.item.logo = this.item.logo.indexOf('assets/') === -1 ? `./assets/partners/${this.item.logo}` : this.item.logo;
  }
}
