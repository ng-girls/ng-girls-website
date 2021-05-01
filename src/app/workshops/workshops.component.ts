import { environment } from './../../environments/environment';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { ScullyRoutesService, ScullyRoute, TransferStateService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
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
  device: any;
  environment: any;

  constructor(private router: Router, private route: ActivatedRoute, private srs: ScullyRoutesService, private sts: TransferStateService,
    getDevice: GetDeviceService) {
      this.device = getDevice.getDevice();
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
        // loading demo static content
        if(environment.production === false){
          const id = document.getElementsByTagName('scully-content')[0].attributes[0].name;
          window['scullyContent'] = {
            'html': environment.workshopHTML.replace(/aes\-c37/, id.replace('_ngcontent-', '')),
            'cssId': id
        }
      }
  }
}
