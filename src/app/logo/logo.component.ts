import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input()   logo: string;
  @Input()   logoAlt: string;
  constructor() { 
    this.logoAlt = this.logoAlt ? this.logoAlt : 'logo';
  }

  ngOnInit(): void {
  }

}
