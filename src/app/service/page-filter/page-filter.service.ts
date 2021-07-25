import { Injectable } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';


@Injectable({
  providedIn: 'any'
})
export class PageFilterService {

  constructor() { }
  public getPages(path, reverse = false): (value: ScullyRoute[]) => ScullyRoute[] {
    if(!reverse){
      return routeList => {
        return routeList.filter((route: ScullyRoute) => route.route.startsWith(`/${path}/`)
        );
      };
    } else {
      return routeList => {
        return routeList.filter((route: ScullyRoute) => route.route.startsWith(`/${path}/`)
        ).reverse();
      };
    }
  }
  public getStage(logo, device): (value: ScullyRoute) => ScullyRoute {
    return routeList => {
      const data = routeList;
      data['heroDescription'] = `${data['date'] || ''}${data['city'] ? ', ' + data['city'] : ''} ${data['country'] ? ', ' + data['country'] : ''}`;
      data['bg'] = {
        src: routeList['image'],
        alt: `${routeList['title'] || ''} stage`, 
        device: device
      }
      data['logo'] = {
        src: logo,
        alt: 'logo'
      }
      return data;
    }
  }
  public filterBy(type, limit?): (value: ScullyRoute[]) => ScullyRoute[] {
    if(type === 'published'){
      return pages =>pages.filter(page => { 
        return page.archived == false;
      } )
    } else if(type === 'lastLimit'){
      return pages => pages.slice(0, limit ? limit : pages.length);

    }
  }
}
