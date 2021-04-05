import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-workshop-preview',
  templateUrl: './workshop-preview.component.html',
  styleUrls: ['./workshop-preview.component.scss']
})
export class WorkshopPreviewComponent implements OnInit {
  
  @Input()
  workshop;

  constructor() { }

  ngOnInit(): void {
  }

}
