import { Component, Input, OnInit } from '@angular/core';
import { GetDeviceService } from 'src/app/service/get-device/get-device.service';

@Component({
  selector: 'app-svg',
  template: `
  <mat-icon class="{{class}}" [svgIcon]="icon" [style.transform]="transform" [style.width]="size.width" [style.height]="size.height"></mat-icon>
  `,
  styleUrls: ['svg.component.scss'],
})
export class SVGComponent implements OnInit {
  transform= '';
  isMobile = false;
  @Input() size;
  @Input() class: any;
  @Input() icon: any;
  constructor(device: GetDeviceService) {
    if(device.isMobile()){
      this.isMobile = true;
    }
  }
  ngOnInit(): void {
    this.transform = `scale(${this.isMobile ? this.size.scale.m : this.size.scale.d})`;

  }
}
