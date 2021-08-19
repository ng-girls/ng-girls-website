import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  sizeLogo =  {width: '185px', height: '61px', scale: {d:'0.7',m: '0.6'} };
  constructor() {
  

  }
}
