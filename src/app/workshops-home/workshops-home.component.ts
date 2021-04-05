import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-workshops-home',
  templateUrl: './workshops-home.component.html',
  styleUrls: ['./workshops-home.component.scss']
})
export class WorkshopsHomeComponent implements OnInit {
  workshops$; 

  @Input() 
  postLimit = 0;

  constructor(private srs: ScullyRoutesService) { }


  ngOnInit() {
    this.workshops$ = this.srs.available$.pipe(
      map(routeList => {
        return routeList.filter((route: ScullyRoute) =>
          route.route.startsWith(`/workshops/`),
        )
        .reverse()
      }),
      map(workshops => workshops.slice(0, this.postLimit ? this.postLimit : workshops.length))
    );
  }

}
