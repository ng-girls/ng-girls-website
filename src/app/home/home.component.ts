import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute, ScullyRoutesService, TransferStateService } from '@scullyio/ng-lib';
import { map, filter } from 'rxjs/operators';
import { organizers } from './organizers-list';
import { partners } from './parnters';

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
  homeImage = '../../../../assets/backgrounds/eclipse.webp';
  innerWidth: any;
  breakpoint: string = '';

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.breakpoint = this.getBreakpoint(this.innerWidth);
  }

  constructor(private srs: ScullyRoutesService, private sts: TransferStateService) {
    this.breakpoint = this.getBreakpoint(this.innerWidth);
   }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    // this.breakpoint = this.getBreakpoint(this.innerWidth);
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

  getBreakpoint(width){
    if(width >= 1200){
      return '-xl';
    } else if(width >=992){
      return '-lg';
    } else if(width >=768){
      return '-md';
    } else if(width >=576){
      return '-sm';
    } else {
      return '-xs';
    }
  }
}
