import { Component,  OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bg-image',
  templateUrl: './bg-image.component.html',
  styleUrls: ['./bg-image.component.scss']
})
export class BgImageComponent implements OnInit {
  @Input()   image: string;
  @Input()   responsive: boolean = false;
  @Input()   imageHeight: string = '700';
  @Input()   mobileHeight: number = 700;
  @Input()   imageAlt: string;
  @Input() device;
  ua = navigator.userAgent;
  isMobile = false;
  height = 700;

    
  constructor() {
    if(this.device.isMobile){
      this.isMobile = true;
      this.height = this.mobileHeight;
    }
  }

  ngOnInit(): void {
  }

}
