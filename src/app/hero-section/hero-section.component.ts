import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  @Input()   image;
  @Input()   imageAlt;
  @Input()   logo;
  @Input()   logoAlt;
  @Input() device: any;

  constructor() { 
  }
  ngOnInit(): void {
    this.imageAlt = this.imageAlt ? this.imageAlt : 'eclipse';
    this.logoAlt = this.logoAlt ? this.logoAlt : 'logo';
  }

}
