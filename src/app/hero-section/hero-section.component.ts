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
  // @Input()  data;
  @Input()  imageBg;
  @Input()  isObservable = true;
  @Input()  logo;
  alt = '';
    private _data$ = new BehaviorSubject<any>({} as any);
  @Input() public set data(val: any){ this._data$.next(val); }
public get data(): any {  this.alt="observable bg image";  return this._data$.getValue(); }

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
