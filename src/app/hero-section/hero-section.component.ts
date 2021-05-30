import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  @Input()  image;
  @Input()  imageBg;
  @Input()  isObservable = true;
  @Input()  logo;
  alt = '';
//     private _data$ = new BehaviorSubject<any>({} as any);
//   @Input() public set data(val: any){ console.log('sd'); this._data$.next(val); }
// public get data(): any {  console.log('gd'); const x = this._data$.getValue(); console.log(x);  return x; }

  constructor(
    private cdref: ChangeDetectorRef
  ) { 
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();    
     }
  ngOnInit(): void {
    // if(this.isObservable === false){
      this.image.src = this.image.src;
      this.image.alt = this.image.alt ? this.image.alt : 'eclipse';
      this.image['responsive'] = true;
    // } 
    
    this.logo.alt = this.logo.alt ? this.logo.alt : 'logo';
  }

}
