import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  template: `
    <div id="masthead" class="site-header" role="banner">
      <div>
          <app-bg-image [image]="image"></app-bg-image>
          <app-logo [logo]="logo">
          <ng-content></ng-content>
      </app-logo>
          
      </div>
    </div>
  `,
  styles: [`
  .site-header {
    background-color: #fafafa;
    position: relative;
    display: block;
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
