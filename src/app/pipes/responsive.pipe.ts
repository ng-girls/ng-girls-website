import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'responsive'
})
export class ResponsivePipe implements PipeTransform {
  private cachedData: any = null;
  private cachedUrl = '';

  constructor() { }
  // constructor(private http: HttpClient) { }

  transform(url: string, suffix?: string): any {
    let newUrl = url;
    if(url && suffix && suffix !== ''){
      if(url.indexOf('.webp')){
        newUrl = url.replace('.webp', '-' + suffix + '.webp');
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
