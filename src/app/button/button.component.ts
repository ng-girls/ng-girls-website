import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
  <button class="btn" *ngIf="link" (click)="openLink(link)">
   {{label}}
  </button>
  <a href="{{anchor}}"  pageScroll [pageScrollOffset]="100"  *ngIf="anchor">
        <button class="btn">
          {{label}} 
        </button>
    </a>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() link: any;
  @Input() anchor: any;
  @Input() label: any;
  constructor() { }

  ngOnInit(): void {
  }
  openLink(link: string) {
    link = link.indexOf("http") > -1 ? link : `http://${link}`;
    window.open(link, "_blank");
  }

}
