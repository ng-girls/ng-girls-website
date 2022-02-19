import { Component,  Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button class="btn" *ngIf="type !== 'anchor'"(click)="openLink(link, type)" >
    {{label}} 
    </button>
    <a href="{{anchor}}"  pageScroll [pageScrollOffset]="100"  *ngIf="anchor">
        <button class="btn">
          {{label}} 
        </button>
    </a>
   
  `,
  styles: [`
    .btn {
        color: #fff !important;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-transform: uppercase;
        border: 0;
        background: #4352ff !important;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        border: none;
        outline: none;
        color: inherit;
        background-color: transparent;
        font-size: 1em;
        line-height: 1em;
        text-align: center;
        text-decoration: none;
        z-index: 1;
        font-weight: 500;
        margin: 0 3px 10px;
        font-weight: 500;
        padding: 0.85em 1.1em;
        border-radius: 0.2em;
      }`
    ],
})
export class ButtonComponent {
  @Input() link: any;
  @Input() mail: any;
  @Input() type: any = 'link';
  @Input() anchor: any;
  @Input() label: any;
  @Input() rel: any = 'noopener';
  constructor() { }

  openLink(link: string, type?: string) {
    switch(type){
      case 'mail':
        window.open('mailto:'+ link, '_self');break;
      default: 
      link = link.indexOf("http") > -1 ? link : `http://${link}`;
      window.open(link, "_blank");
    }
  }

}
