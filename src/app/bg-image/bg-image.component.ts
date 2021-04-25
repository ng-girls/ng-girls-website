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
  ua = navigator.userAgent;
  isMobile = false;
  height = 700;

    
  constructor() {

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(this.ua)){
      this.isMobile = true;
      this.height = this.mobileHeight;
    }
  }

  ngOnInit(): void {
  }

}
