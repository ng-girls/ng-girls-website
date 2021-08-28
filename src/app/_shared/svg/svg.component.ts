import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-svg',
  template: `
  <mat-icon class="{{class}}" [svgIcon]="icon" [style.transform]="transform" [style.width]="size.width" [style.height]="size.height"></mat-icon>
  `,
  styleUrls: ['svg.component.scss'],
})
export class SVGComponent implements OnInit {
  transform= '';
  @Input() size;
  @Input() class: any;
  @Input() icon: any;
  isMobile = false;
  constructor(private host:AppComponent) {
    this.isMobile = this.host.class.indexOf('desktop') === -1 ? true : false;
  }
  ngOnInit(): void {
    this.transform = `scale(${this.isMobile ? this.size.scale.m : this.size.scale.d})`;

  }
}
