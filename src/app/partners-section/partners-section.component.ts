import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-partners-section',
  templateUrl: './partners-section.component.html',
  styleUrls: ['./partners-section.component.scss']
})
export class PartnersSectionComponent implements OnInit {


  @Input()
  partners;

  @Input()
  sponsorsCallMail = 'hello@ng-girls.org';

  @Input()
  hosts;
  items = [];

  djangos = [{
    link: 'https://djangogirls.org/', 
    logo: 'django-girls-200.webp',
    title: 'DjangoGirls'
  }]

  constructor() {
  }
  ngOnInit() {
    // ...
    if(this.hosts) this.items.push({ title: 'Hosted by', items: this.hosts})
    if(this.partners) this.items.push({ title: 'With support of', items: this.partners})
    if(this.djangos) this.items.push({ description: 'ngGirls is inspired by Django Girls and makes use of its resources', items: this.djangos, mail: { link: this.sponsorsCallMail, label: 'BECOME A SPONSOR'}})
  }


}
