import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
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

  constructor(private srs: ScullyRoutesService) { }


  ngOnInit() {
    
    this.posts$ = this.srs.available$.pipe(
      map(routeList => {
        return routeList.filter((route: ScullyRoute) =>
          route.route.startsWith(`/blog/`),
        )
        .reverse()
      }),
      map(posts => posts.slice(0, this.postLimit ? this.postLimit : posts.length))
    );
  }

}
