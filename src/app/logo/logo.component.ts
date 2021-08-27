import { Component, OnInit, Input } from '@angular/core';
import { GetDeviceService } from '../service/get-device/get-device.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input()   logo: any;
  sizeLogo =  {width: '305px', height: '325px', scale: {d:'1', m: '0.8'}, isMobile: false };
 

  constructor(device: GetDeviceService) {
    if(device.isMobile()){
      this.sizeLogo.isMobile = true;
    }
  }
  ngOnInit(): void {
  }

}
