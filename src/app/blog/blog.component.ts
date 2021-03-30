import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router, ROUTES} from '@angular/router';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class BlogComponent implements OnInit {
  ngOnInit() {}

  article$;

  constructor(private router: Router, private route: ActivatedRoute, private srs: ScullyRoutesService) {
    this.article$ = (this.srs.getCurrent() as Observable<ScullyRoute>);
  }
}
