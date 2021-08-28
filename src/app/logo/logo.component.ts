import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input()   logo: any;
  sizeLogo =  {width: '305px', height: '325px', scale: {d:'1', m: '0.8'} };
 

  constructor() {
  }

}
