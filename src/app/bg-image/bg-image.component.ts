import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bg-image',
  templateUrl: './bg-image.component.html',
  styleUrls: ['./bg-image.component.scss']
})
export class BgImageComponent implements OnInit {
  @Input()   image: string;
  @Input()   imageHeight: string = '700';
  @Input()   imageAlt: string;

  constructor() { }

  ngOnInit(): void {
  }

}
