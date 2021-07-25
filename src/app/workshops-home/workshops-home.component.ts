import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute, ScullyRoutesService, TransferStateService } from '@scullyio/ng-lib';

import { map } from 'rxjs/operators';
import { PageFilterService } from '../service/page-filter/page-filter.service';

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

  constructor(private srs: ScullyRoutesService, private sts: TransferStateService, private pageFilter: PageFilterService) { }
  ngOnInit() {
    this.events$ = this.sts.useScullyTransferState(
      'workshopRoutes',
      this.srs.available$.pipe(
        map(this.pageFilter.getPages('workshops')),
        map(this.pageFilter.filterBy('published'))
      )
    );
  }
}
