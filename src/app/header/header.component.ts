import { Component, OnInit } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private scroll: ViewportRuler){
    this.scroll.change().subscribe(e=>console.log(e))
  }

  ngOnInit(): void {
  }

  logScroll() {

    console.log(this.scroll.getViewportScrollPosition());
  }

}
