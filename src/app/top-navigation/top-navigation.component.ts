import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

  navLinks = [
    { name: 'HOME', link: './' },
    { name: 'ABOUT', link: './#about' },
    { name: 'BE A PART', link: './#description' },
    { name: 'TEAM', link: './#team' },
    { name: 'PARTNERS', link: './#partners' },
    { name: 'FAQ', link: './faq' },
    { name: 'BLOG', link: './blog'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
