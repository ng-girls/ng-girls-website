import { Component,  OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bg-image',
  templateUrl: './bg-image.component.html',
  styleUrls: ['./bg-image.component.scss']
})
export class BgImageComponent implements OnInit {
  @Input()   image: any;
  @Input()   fadeout = false;
  responsive: boolean = false;
  imageHeight: string = '700';
  mobileHeight: number = 700;
  device: any;
  height = 700;

    
  constructor() {
  }

  ngOnInit(): void {
    
    this.device = this.image.device;
    this.height = (this.device && this.device.isMobile) ? this.mobileHeight : 700;
    this.responsive = (this.image.responsive) ? this.image.responsive : this.responsive;
    this.mobileHeight = (this.image.mobileHeight) ? this.image.mobileHeight : this.mobileHeight;
  }

}
