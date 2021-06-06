import { environment } from './../../environments/environment';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { ScullyRoutesService, ScullyRoute, TransferStateService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DEFAULTS } from '../defaults.consts';
import { GetDeviceService } from '../service/get-device/get-device.service';

declare var ng: any;

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class WorkshopsComponent implements OnInit {
  DEFAULTS = DEFAULTS;
  workshop$;
  team$;
  teamLength$;
  device: any;
  environment: any;
  image$;
  xxx;

  constructor(private router: Router, private route: ActivatedRoute, private srs: ScullyRoutesService, private sts: TransferStateService,
    getDevice: GetDeviceService,
     private cdref: ChangeDetectorRef
     ) {
      this.device = getDevice.getDevice();
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();    
  }
  openLink(link: string) {
    link = link.indexOf("http") > -1 ? link : `http://${link}`;
    window.open(link, "_blank");
  }
  ngOnInit() {
    // this.workshop$ = this.srs.getCurrent().pipe(
    //     map(routeList => {
    //       console.log(routeList)
    //       return {
    //         src: routeList.image,
    //         alt: 'logo', 
    //         device: this.device
    //       }
    //     }));
      // (this.srs.getCurrent() as Observable<ScullyRoute>)
    // ));
    this.workshop$ = this.sts.useScullyTransferState(
      'workshopRoutes',
      this.srs.getCurrent().pipe(
        map(routeList => {
          console.log(routeList)
          return {
            src: routeList.image,
            alt: 'logo', 
            device: this.device
          }
        })
      // (this.srs.getCurrent() as Observable<ScullyRoute>)
    ));
    this.teamLength$ = this.sts.useScullyTransferState(
      'workshopRoutes',
      this.srs.getCurrent().pipe(
        map(routeList => {
          let len = 700;
          if(this.device.isMobile == true){
            len = routeList.mentors ? Math.ceil(routeList.mentors.length / 2)*250 + 200 : 700;
          }
          return len;
        })
      // (this.srs.getCurrent() as Observable<ScullyRoute>)
    ));
    // loading demo static content
    if(environment.production === false && !window.scullyContent){
      const id = document.getElementsByTagName('scully-content')[0].attributes[0].name;
      window['scullyContent'] = {
        'html': environment.workshopHTML.replace(/ikn\-c37/ig, id.replace('_ngcontent-', '')),
        'cssId': id
      }
    }
  }
}
