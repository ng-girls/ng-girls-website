import { Component, Input, OnInit } from '@angular/core';
import { ObservableInput } from "ngx-observable-input";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  @Input()  image;
  @Input()  imageBg;
  @ObservableInput() @Input("url") public url$: Observable<string>;
  @Input()  logo;

  constructor() { 
  }
  ngOnInit(): void {
    if(this.image.src){
      this.image.src = this.image.src;
      this.image.alt = this.image.alt ? this.image.alt : 'eclipse';
    }
    this.logo.alt = this.logo.alt ? this.logo.alt : 'logo';
    this.image['responsive'] = true;
  }

}
