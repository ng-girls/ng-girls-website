import { browser } from 'protractor';
import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute, ScullyRoutesService, TransferStateService } from '@scullyio/ng-lib';
import { map, filter } from 'rxjs/operators';
import { organizers } from './organizers-list';
import { partners } from './parnters';
import { GetDeviceService } from '../service/get-device/get-device.service';

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
  rootPath: string = '../../../../';
  homeImage = this.rootPath + 'assets/backgrounds/eclipse/eclipse.webp';
  homeLogo = this.rootPath + 'assets/theme/logo-vertical/logo-vertical.webp';
  teamLogo = this.rootPath + 'assets/backgrounds/eclipse/eclipse.webp';
  teamBg = this.rootPath + 'assets/backgrounds/djangogirls/djangogirls.webp';
  innerWidth: any;
  device: {isMobile: Boolean, browser: any};
 

  constructor(private srs: ScullyRoutesService, private sts: TransferStateService,
    public getDevice: GetDeviceService) {
    }
    
    ngOnInit() {
     this.device = this.getDevice.getDevice();
     
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
