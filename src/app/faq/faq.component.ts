import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqImage = '../../../../assets/backgrounds/djangogirls.jpg';
  constructor() { }

  ngOnInit(): void {
  }

}
