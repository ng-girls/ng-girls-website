import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { isScullyGenerated, ScullyRoute, ScullyRoutesService, TransferStateService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';
import { organizers } from './organizers-list';
import { partners } from './parnters';
import { GetDeviceService } from '../service/get-device/get-device.service';
import { DEFAULTS } from '../defaults.consts';
import { PageFilterService } from '../service/page-filter/page-filter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // events$: Observable<ScullyRoute[]>;
  page$: any;
  eventsLength = 0;
  organizers = organizers;
  partners = partners;
  events: any;
  posts$: Observable<ScullyRoute[]>;
  DEFAULTS = DEFAULTS;
  heroButtonLabel: String;
  device: {isMobile: Boolean, browser: any};
  isScullyGenerated = isScullyGenerated();
  hasState = this.sts.stateHasKey('workshopsRoutes')
  events$ = isScullyGenerated() && this.sts.stateHasKey('workshopsRoutes')
  ? this.sts.getState<any>('workshopsRoutes')
  : this.sts.useScullyTransferState(
    'workshopsRoutes',
    this.srs.available$.pipe(
      map(this.pageFilter.getPages('workshops', false, 'foobar')),
      map(this.pageFilter.filterBy('published'))
  )
  );

  constructor(
    private srs: ScullyRoutesService, 
    private sts: TransferStateService,
    private pageFilter: PageFilterService,
    getDevice: GetDeviceService) {
      this.device = getDevice.getDevice();
      console.log('=== state ===')
      console.log(this.isScullyGenerated )
      console.log(this.hasState )
    }
    ngOnInit() {
      console.log('on init home comXXpoenten');
      this.heroButtonLabel = '';
      // TODO: refactor with scully observable
      this.page$ = {};
      this.page$['bg'] = {
        src: DEFAULTS.homeImage,
        alt: 'ngGirls eclipse', 
        device: this.device
      }
      this.page$['logo'] = {
        src: DEFAULTS.homeLogo,
        alt: 'logo'
      }
      this.page$['heroButtonLabel'] = '';
      this.events$.subscribe(value => {
        console.log(value);
        // console.log(this.page$['heroButtonLabel']);
        const len = value.length;
        if(len > 0){
          // this['heroButtonLabel'] = `${this.eventsLength} Upcoming event${this.eventsLength > 1 ? 's' : ''} `;
          this.page$['heroButtonLabel'] =  `${len} Upcoming event${len > 1 ? 's' : ''} `;
        }
        return value;
      });
      
     
    this.posts$ = this.sts.useScullyTransferState(
      'blogRoutes',
      this.srs.available$.pipe(
        map(this.pageFilter.getPages('blog', true)),
        map(this.pageFilter.filterBy('lastLimit', 3))
      )
    );
  }

}
