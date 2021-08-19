import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class GetDeviceService {
  constructor() {
  }

  public isMobile(): boolean{
    const ua = navigator.userAgent;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      return true;
    }
    return false;
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
