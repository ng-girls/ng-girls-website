import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-partners-section',
  templateUrl: './partners-section.component.html',
  styleUrls: ['./partners-section.component.scss']
})
export class PartnersSectionComponent implements OnInit {

  @Input()
  isDjangoLabelVisible = false;

  @Input()
  partners;

  @Input()
  sponsorsCallMail = 'hello@ng-girls.org';

  @Input()
  hosts;

  constructor() { }

  ngOnInit(): void {
  }

}
