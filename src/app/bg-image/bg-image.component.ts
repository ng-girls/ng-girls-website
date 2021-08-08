import { Component,  OnInit, Input } from '@angular/core';
import { GetDeviceService } from '../service/get-device/get-device.service';

@Component({
  selector: 'app-bg-image',
  templateUrl: './bg-image.component.html',
  styleUrls: ['./bg-image.component.scss']
})
export class BgImageComponent implements OnInit {
  @Input()   image: any;
  @Input()   lazy = false;
  @Input()   fadeout = false;
  responsive: boolean = false;
  imageHeight: string = '700';
  mobileHeight: number = 700;
  loading = 'eager';
  device: any;
  height = 700;
  extraClasses = '';

    
  constructor(getDevice: GetDeviceService,
     ) {
      this.device = getDevice.getDevice();
  }

  ngOnInit(): void {
// [ngClass]="{'bg-image--responsive': responsive == true,  'bg-image--fadout': fadeout == true}"
    this.loading = this.lazy === true ? 'lazy' : this.loading;
    this.height = (this.device && this.device.isMobile) ? this.mobileHeight : 700;
    this.responsive = (this.image && this.image.responsive) ? this.image.responsive : this.responsive;
    // this.extraClasses = 'bg-image--responsive';
    if(this.device.isMobile === true){
      this.extraClasses += ' bg--mobile';
    }
    if(this.fadeout){
      this.extraClasses += ' bg-image--fadout';
    }
    
    
    this.mobileHeight = (this.image && this.image.mobileHeight) ? this.image.mobileHeight : this.mobileHeight;
  }
  getClasses(){
    return this.extraClasses;
  }

}
