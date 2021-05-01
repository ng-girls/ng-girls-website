import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetDeviceService {
  constructor() {
  }

  public getDevice(): any {
    const ua = navigator.userAgent;
    let device = {
        isMobile: false,
        browser: false
    }
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      device.isMobile = true;
    }
    return device;
  }
}
