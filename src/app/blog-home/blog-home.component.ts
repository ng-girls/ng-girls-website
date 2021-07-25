import { PageFilterService } from './../service/page-filter/page-filter.service';
import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoutesService,  TransferStateService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit {
  posts$; 

  @Input() 
  postLimit = 0;

  constructor(private srs: ScullyRoutesService, private sts: TransferStateService, private pageFilter: PageFilterService) { }


  ngOnInit() {
    this.posts$ = this.sts.useScullyTransferState(
      'blogRoutes',
      this.srs.available$.pipe(
        map(this.pageFilter.getPages('blog', true)),
        map(this.pageFilter.filterBy('lastLimit', this.postLimit))
      )
    );
   
  }
}
