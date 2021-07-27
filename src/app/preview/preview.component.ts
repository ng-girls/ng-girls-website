import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoutesService,  TransferStateService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';
import { PageFilterService } from '../service/page-filter/page-filter.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  items$;

  @Input() itemsLimit = 0;
  @Input() title = '';
  @Input() slug = '';
  @Input() reverse = false;

  constructor(
    private srs: ScullyRoutesService, 
    private sts: TransferStateService, 
    private pageFilter: PageFilterService
  ) { }


  ngOnInit() {
    if(this.slug === ''){
      this.srs.getCurrent().subscribe(routeList => {
        this.slug = routeList.route.replace('/', '');
        this.items$ = this.getPages(this.slug);
        return routeList;
      })
    } else {
      this.items$ = this.getPages(this.slug);
    }
  }
  getPages(slug){
    const filter = slug === 'blog' ? 'lastLimit' : 'published';
    return this.sts.useScullyTransferState(
      `${slug}Routes`,
      this.srs.available$.pipe(
        map(this.pageFilter.getPages(slug, this.reverse)),
        map(this.pageFilter.filterBy(filter, this.itemsLimit))
      )
    );
  }
}
