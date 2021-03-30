import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

declare var ng: any;

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class WorkshopsComponent implements OnInit {
  ngOnInit() { }

  workshop$;

  constructor(private router: Router, private route: ActivatedRoute, private srs: ScullyRoutesService) {
    this.workshop$ = (this.srs.getCurrent() as Observable<ScullyRoute>);
  }

  openLink(link: string) {
    link = link.indexOf("http") > -1 ? link : `http://${link}`;
    window.open(link, "_blank");
  }

}
