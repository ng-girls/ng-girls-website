import {Component, HostBinding} from '@angular/core';
import {IconElementService} from './service/icon-element/icon-element.service';
import {ICONS} from './service/icon-element/icon-element.consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: {'class': 'device'}
})
export class AppComponent {
  @HostBinding('class') class = this.isMobile() ? 'device--mobile' : 'device--desktop';
  constructor(private iconElementService: IconElementService) {
    for (const iconsKey of Object.keys(ICONS)) {
      this.iconElementService.initIcon(iconsKey as any);
    }
  }
  public isMobile(): boolean{
    const ua = navigator.userAgent;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      return true;
    }
    return false;
  }
}
