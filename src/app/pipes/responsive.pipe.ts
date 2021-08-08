import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responsive',
  pure: true
})
export class ResponsivePipe implements PipeTransform {
  constructor() { }

  transform(url: string, suffix?: string, height?: any): any {
    var ua = navigator.userAgent;
    let isMobile = false;
    const type = '.webp';
    suffix = suffix !== '' ? `-${suffix}` : suffix;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      isMobile = true;
    }
    if(url && url !== ''){
      let prefix = '';
      if(height && height !== 700 && isMobile === true){
        prefix =  '-' + height;
      } 
      return  url.replace(type, prefix + suffix + type);
    }
    return url;
  }

}
