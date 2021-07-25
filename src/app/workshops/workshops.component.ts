import { environment } from './../../environments/environment';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { ScullyRoutesService, ScullyRoute, TransferStateService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DEFAULTS } from '../defaults.consts';
import { GetDeviceService } from '../service/get-device/get-device.service';
import { PageFilterService } from '../service/page-filter/page-filter.service';

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
  device: any;
  environment: any;
  heroDescription: String;

  constructor(private router: Router, private route: ActivatedRoute, private srs: ScullyRoutesService, private sts: TransferStateService,
    getDevice: GetDeviceService,
    private pageFilter: PageFilterService,
     private cdref: ChangeDetectorRef
     ) {
      this.device = getDevice.getDevice();
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  ngOnInit() {
    this.heroDescription = '';
    // {{workshop.date}}<span>, {{workshop.city}}</span><span>, {{workshop.country}}</span>
    this.workshop$ = this.sts.useScullyTransferState(
      'workshopRoutes',
      this.srs.getCurrent().pipe(
        map(this.pageFilter.getStage(DEFAULTS.homeLogo, this.device))
    ));
    // loading demo static content
    // console.log(document.getElementsByTagName('scully-content'))
    // if(environment.production === false && !window.scullyContent){
    //   const content = document.getElementsByTagName('scully-content');
    //   if(content && content[0]){
    // //     const id = content[0].attributes[0].name;
    // //     window['scullyContent'] = {
    // //       'html': environment.workshopHTML.replace(/ikn\-c37/ig, id.replace('_ngcontent-', '')),
    // //       'cssId': id
    // //     }
    //   }
    // }
  }
}
