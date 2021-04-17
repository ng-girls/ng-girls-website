import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  @Input()   image;
  @Input()   full = false;
  // innerWidth: any;


  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.innerWidth = window.innerWidth;
  // }

constructor() { }

ngOnInit(): void {
//     this.innerWidth = window.innerWidth;
  }

}
