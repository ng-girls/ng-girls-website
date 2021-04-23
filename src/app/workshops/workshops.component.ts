import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { ScullyRoutesService, ScullyRoute, TransferStateService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

declare var ng: any;

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class WorkshopsComponent implements OnInit {
  rootPath: string = '../../../../';
  homeLogo = this.rootPath + 'assets/theme/logo-vertical/logo-vertical.webp';
  workshop$;
  innerWidth: any;
  breakpointSuffix: string = '';
  private breakpoint: string = '-xl';

   @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.getBreakpoint();
  }


  constructor(private router: Router, private route: ActivatedRoute, private srs: ScullyRoutesService, private sts: TransferStateService) {
    this.getBreakpoint();
    this.workshop$ = this.sts.useScullyTransferState(
      'workshopRoutes',
      (this.srs.getCurrent() as Observable<ScullyRoute>)
    );
  }

  openLink(link: string) {
    link = link.indexOf("http") > -1 ? link : `http://${link}`;
    window.open(link, "_blank");
  }
  ngOnInit() {
    this.getBreakpoint();
  }
  getBreakpoint(){
    const width = window.innerWidth;
    if(!width){
      return;
    }
    let bpOld = this.breakpointSuffix;
    let bpNew;
    if(width >= 1200){
      bpNew =
      bpNew = '-xl';
    } else if(width >=992){
      bpNew = '-lg';
    } else if(width >=768){
      bpNew = '-md';
    } else if(width >=576){
      bpNew = '-sm';
    } else {
      bpNew = '-xs';
    }
    if(bpNew !== bpOld){
      this.breakpointSuffix = bpNew;
      this.breakpoint = bpNew;
    } else {
      console.log('else');
    }
  }

}
