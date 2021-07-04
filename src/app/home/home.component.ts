import { browser } from 'protractor';
import { ChangeDetectorRef, Component, HostListener, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Observable } from 'rxjs';
import { isScullyGenerated, ScullyRoute, ScullyRoutesService, TransferStateService } from '@scullyio/ng-lib';
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
  events$ = isScullyGenerated()
  ? this.sts.getState<any>('workshopRoutes')
  :this.sts.useScullyTransferState(
    'workshopRoutes',
    this.srs.available$.pipe(
    map(routeList => {
      return routeList.filter((route: ScullyRoute) =>
        route.route.startsWith(`/workshops/`),
      );
    }),
    map(workshops => workshops.filter(workshop => { 
      // workshop['foo'] = 'bar';
      // this.eventsLength = workshop.archived == false ? this.eventsLength + 1 : this.eventsLength;
      // if(this.eventsLength > 0){
      //   this['heroButtonLabel'] = `${this.eventsLength} Upcoming event${this.eventsLength > 1 ? 's' : ''} `;
      //   // this.page$.heroButtonLabel =  `${this.eventsLength} Upcoming event${this.eventsLength > 1 ? 's' : ''} `;
      // }
      return workshop.archived == false;
    } ))
  )
  );

  constructor(
    private srs: ScullyRoutesService, 
    private cdref: ChangeDetectorRef,
    private sts: TransferStateService,
    getDevice: GetDeviceService) {
      this.device = getDevice.getDevice();
    }
    // ngAfterContentChecked() {
    //   this.cdref.detectChanges();    
    //   this.sts.getState('workshopRoutes').pipe(
    //     map(workshop => {
    //       console.log(workshop);
    //       return workshop;
    //     })
    //   )
    //    }
    ngOnInit() {
      this.events$.subscribe(value => {
        console.log(value);
        const len = value.length;
        if(len > 0){
          // this['heroButtonLabel'] = `${this.eventsLength} Upcoming event${this.eventsLength > 1 ? 's' : ''} `;
          this.page$.heroButtonLabel =  `${len} Upcoming event${len > 1 ? 's' : ''} `;
        }
        return value;
      });
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
      
      // this.page$['heroButtonLabel'] = 'UPPCOMING events';
      // this.page$['heroButtonLabel'] = this.heroButtonLabel
    // this.events$ = this.sts.useScullyTransferState(
    //   'workshopRoutes',
    //   this.srs.available$.pipe(
    //   map(routeList => {
    //     return routeList.filter((route: ScullyRoute) =>
    //       route.route.startsWith(`/workshops/`),
    //     );
    //   }),
    //   map(workshops => workshops.filter(workshop => { 
    //     workshop['foo'] = 'bar';
    //     this.eventsLength = workshop.archived == false ? this.eventsLength + 1 : this.eventsLength;
    //     if(this.eventsLength > 0){
    //       this['heroButtonLabel'] = `${this.eventsLength} Upcoming event${this.eventsLength > 1 ? 's' : ''} `;
    //       // this.page$.heroButtonLabel =  `${this.eventsLength} Upcoming event${this.eventsLength > 1 ? 's' : ''} `;
    //     }
    //     return workshop.archived == false;
    //   } ))
    // )
    // );
    
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
