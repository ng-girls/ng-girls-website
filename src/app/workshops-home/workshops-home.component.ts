import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute, ScullyRoutesService, TransferStateService } from '@scullyio/ng-lib';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-workshops-home',
  templateUrl: './workshops-home.component.html',
  styleUrls: ['./workshops-home.component.scss']
})
export class WorkshopsHomeComponent implements OnInit {
  events$: Observable<ScullyRoute[]>;
  eventsLength = 0;
  @Input() 
  postLimit = 0;
  @Input() 
  title = '';
  length = 0;

  constructor(private srs: ScullyRoutesService, private sts: TransferStateService) { }



  ngOnInit() {
    this.events$ = this.sts.useScullyTransferState(
      'workshopRoutes',
      this.srs.available$.pipe(
      map(routeList => {
        console.log('routeList2');
        console.log(routeList);
        return routeList.filter((route: ScullyRoute) =>
          route.route.startsWith(`/workshops/`),
        );
      }),
      map(workshops => workshops.filter(workshop => { 
        console.log('workshop2');
        console.log(workshop);
        this.eventsLength = workshop.archived == false ? this.eventsLength + 1 : this.eventsLength;
        return workshop.archived == false;
      } ))
    )
    );
    

    // console.log(this.workshops$.length)
  }

}
