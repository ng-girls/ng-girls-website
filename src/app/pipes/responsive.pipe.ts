import { Pipe, PipeTransform } from '@angular/core';
import { AppComponent } from '../app.component';

@Pipe({
  name: 'responsive',
  pure: true
})
export class ResponsivePipe implements PipeTransform {
  isMobile = false;
  constructor(private host:AppComponent) {
    this.isMobile = this.host.class.indexOf('desktop') === -1 ? true : false;
  }

  transform(url: string, suffix?: string, height?: any): any {
    const type = '.webp';
    suffix = suffix !== '' ? `-${suffix}` : suffix;
    if(url && url !== ''){
      let prefix = '';
      if(height && height !== 700 && this.isMobile === true){
        prefix =  '-' + height;
      } 
      return  url.replace(type, prefix + suffix + type);
    }
    return url;
  }

}
