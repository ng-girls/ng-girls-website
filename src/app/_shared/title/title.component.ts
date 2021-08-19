import { Component,  Input } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
  <h2 class="section-title {{type}}" *ngIf="range == 2">{{label}}</h2>
  <h3 class="sub-title {{type}}" *ngIf="range == 3">{{label}}</h3>
  `,
  styles: [`
  .section-title {
    font-size: 80px;
    font-weight: 400;
    margin-top: 40px;
    margin-bottom: 60px;
    line-height: normal;
  }
  @media (max-width: 768px){
    .section-title {
      margin: auto;
      margin-bottom: 30px;
      font-size: 50px;
    }
  }
  .section-title.dark{
    color: #fff;
    padding-top: 40px;
    padding-bottom: 80px;
    margin-bottom: 10px;
    margin-top: 0px;
  }
  @media (max-width: 768px){
    .section-title.dark{
      margin: auto;
      padding-bottom: 40px;
    }
  }
  .section-title.yellow{
    font-size: 50px;
    color: #7b1fa2;
    margin: 40px 10px;
  }
  @media (max-width: 768px){
    .section-title.yellow{
      font-size: 45px;
    }
  }
  .sub-title{
    font-size: 30px;
    text-align: center;
  }
      `
    ],
})
export class TitleComponent {
  @Input() label: any;
  @Input() range: any = 2;
  @Input() type: any = 'light';
  constructor() {

   }
}
