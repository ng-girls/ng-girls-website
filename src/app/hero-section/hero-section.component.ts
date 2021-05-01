import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  @Input()  image;
  @Input()  logo;
  @Input() device;

  constructor() { 
  }
  ngOnInit(): void {
    this.image.alt = this.image.alt ? this.image.alt : 'eclipse';
    this.logo.alt = this.logo.alt ? this.logo.alt : 'logo';
  }

}
