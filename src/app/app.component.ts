import { Component, OnInit } from '@angular/core';
import { ViewportRuler, CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-girls-website';
  top = true;

  constructor(private scroll: ScrollDispatcher, private viewport: ViewportRuler){

  }

  ngOnInit() {
    this.scroll.scrolled()
      .subscribe(()=>{
        const yPos = this.viewport.getViewportScrollPosition().top;
        this.top = yPos < 16;

        console.log(this.top)
      })
  }
}
