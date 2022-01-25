import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  baseroute: boolean;
  sizeLogo =  {width: '185px', height: '61px', scale: {d:'0.7',m: '0.6'} };
  route: string;
  isHome: boolean = false;
  baseUrl : string = '';
  navLinks = [
    { name: 'HOME', link: '#home', scroll: true },
    { name: 'ABOUT', link: '#about', scroll: true },
    { name: 'BE A PART', link: '#description', scroll: true },
    { name: 'TEAM', link: '#team', scroll: true },
    { name: 'PARTNERS', link: '#partners', scroll: true },
    { name: 'FAQ', link: './faq', scroll: false },
    { name: 'BLOG', link: './blog', scroll: false}
    // { name: 'HOME', link: './' },
    // { name: 'ABOUT', link: './#about' },
    // { name: 'BE A PART', link: './#description' },
    // { name: 'TEAM', link: './#team' },
    // { name: 'PARTNERS', link: './#partners' },
    // { name: 'FAQ', link: './faq' },
    // { name: 'BLOG', link: './blog'}
  ];

  constructor(location: Location, router: Router) {
    router.events.subscribe(val => {
      if (location.path() == "") {
        this.isHome = true;
        this.baseUrl = './';
      } else {
        this.isHome = false;
        this.baseUrl = '';
      }
    });
  }
  getLink(){
    return this.isHome === true ? '#home' : '/';
  }
  
  ngOnInit(): void {
  }
  

}
