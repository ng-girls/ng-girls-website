import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responsive',
  pure: true
})
export class ResponsivePipe implements PipeTransform {
  private cachedData: any = null;
  private cachedUrl = '';

  constructor() { }
  // constructor(private http: HttpClient) { }

  transform(url: string, suffix?: string, height?: any): any {
    var ua = navigator.userAgent;
    let isMobile = false;
    
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      isMobile = true;
    }
    let newUrl = url;
    if(url && url !== '' && suffix && suffix !== ''){
      if(height && height !== 700 && isMobile === true){
        if(url.indexOf('.webp')){
          newUrl = url.replace('.webp', '-' + height + '-' + suffix + '.webp');
        }
      } else {

        if(url.indexOf('.webp')){
          newUrl = url.replace('.webp', '-' + suffix + '.webp');
        }
      }
    }
    // if (url !== this.cachedUrl) {
    //   this.cachedData = null;
    //   this.cachedUrl = url;
    //   this.http.get(url).subscribe(result => this.cachedData = result);
    // }

    return newUrl;
  }

}
