import {Component} from '@angular/core';
import {IconElementService} from './service/icon-element/icon-element.service';
import {ICONS} from './service/icon-element/icon-element.consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private iconElementService: IconElementService) {

    for (const iconsKey of Object.keys(ICONS)) {
      this.iconElementService.initIcon(iconsKey as any);
    }
  }
}
