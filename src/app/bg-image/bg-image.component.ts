import { Component,  OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';

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
  isMobile = false;
  
  loading = 'eager';
  device: any;
  mobileHeight: number = 700;
  
  extraClasses = '';

    
  constructor(private host:AppComponent
     ) {
      this.isMobile = this.host.class.indexOf('desktop') === -1 ? true : false;
      // this.device = getDevice.getDevice();
      // console.log(this.image)
  }

  ngOnInit(): void {
    // let mobileHeight: number = 700;
  let height = 700;
  let imageHeight: string = '700';
// [ngClass]="{'bg-image--responsive': responsive == true,  'bg-image--fadout': fadeout == true}"
    this.loading = this.lazy === true ? 'lazy' : this.loading;
    height = (this.isMobile) ? this.mobileHeight : 700;
    this.responsive = (this.image && this.image.responsive) ? this.image.responsive : this.responsive;
    // this.extraClasses = 'bg-image--responsive';
    if(this.isMobile === true){
      this.extraClasses += ' bg--mobile';
    }
    if(this.fadeout){
      this.extraClasses += ' bg-image--fadout';
    }
    //  bg-image--{{imageHeight}} bg-image-mobile--{{mobileHeight}}
    // TODO: change if responsive changes
    
    
    this.mobileHeight = (this.image && this.image.mobileHeight) ? this.image.mobileHeight : this.mobileHeight;
    this.extraClasses += `bg-image--${imageHeight} bg-image-mobile--${this.mobileHeight}` 
  }

}
