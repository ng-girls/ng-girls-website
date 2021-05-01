import { browser } from 'protractor';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute, ScullyRoutesService, TransferStateService } from '@scullyio/ng-lib';
import { map, filter } from 'rxjs/operators';
import { organizers } from './organizers-list';
import { partners } from './parnters';
import { GetDeviceService } from '../service/get-device/get-device.service';
import { DEFAULTS } from '../defaults.consts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events$: Observable<ScullyRoute[]>;
  eventsLength = 0;
  organizers = organizers;
  partners = partners;
  events: any;
  posts$: Observable<ScullyRoute[]>;
  innerWidth: any;
  DEFAULTS = DEFAULTS;
  device: {isMobile: Boolean, browser: any};
 

  constructor(private srs: ScullyRoutesService, private sts: TransferStateService,
    getDevice: GetDeviceService) {
      this.device = getDevice.getDevice();
    }
    
    ngOnInit() {
     
    this.events$ = this.sts.useScullyTransferState(
      'workshopRoutes',
      this.srs.available$.pipe(
      map(routeList => {
        return routeList.filter((route: ScullyRoute) =>
          route.route.startsWith(`/workshops/`),
        );
      }),
      map(workshops => workshops.filter(workshop => { 
        this.eventsLength = workshop.archived == false ? this.eventsLength + 1 : this.eventsLength;
        return workshop.archived == false;
      } ))
    )
    );
    // this.events = this.events$.subscribe(data => data.map( workshop => console.log(workshop.archived) ));

    // this.eventsLength = this.events$.length;
    this.posts$ = this.sts.useScullyTransferState(
      'blogRoutes',
      this.srs.available$.pipe(
      map(routeList => {
        return routeList.filter((route: ScullyRoute) => 
        route.route.startsWith(`/blog/`))
      }),
      map(posts => posts.slice(0, 3))
    )
    );
  }

}
