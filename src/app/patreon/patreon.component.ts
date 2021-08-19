import { Component } from '@angular/core';

@Component({
  selector: 'app-patreon',
  templateUrl: './patreon.component.html',
  styleUrls: ['./patreon.component.scss']
})
export class PatreonComponent {
  item: any;

  constructor() { 
    this.item = {
      title: 'Support ngGirls on Patreon',
      titleType: 'yellow',
      alt: 'Patreon ngGirls',
      link: 'https://www.patreon.com/ngGirls',
      width: '430',
      height: '229',
      logo: '../../assets/backgrounds/patreon/patreon-200.webp' 
    }
  }
}
