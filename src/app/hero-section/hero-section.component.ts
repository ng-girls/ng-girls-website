import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  template: `
    <div id="masthead" class="site-header" role="banner">
      <div>
          <app-bg-image [image]="image"></app-bg-image>
          <mat-icon class="logo logo-light" [svgIcon]="'logo_vertical'"></mat-icon>
      </div>
    </div>
  `,
  styles: [`
  .site-header {
    background-color: #fafafa;
    position: relative;
    display: block;
  }
  .mat-icon{
    width: 305px;
    height: 325px;
    position: absolute;
    top: 100px;
    left: 40%;
  }
  @media (max-width: 768px){
    .mat-icon{
      transform: scale(0.5);
      left: 10%
    }
  }
  
  `]
})
export class HeroSectionComponent implements OnInit {
  @Input()  image;
  @Input()  imageBg;
  @Input()  isObservable = true;
  @Input()  logo;
  alt = '';

  constructor(
    private cdref: ChangeDetectorRef
  ) { 
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();    
     }
  ngOnInit(): void {
  }

}
