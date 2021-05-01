import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { ScullyRoutesService, ScullyRoute, TransferStateService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
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
  rootPath: string = '../../../../';
  homeLogo = this.rootPath + 'assets/theme/logo-vertical/logo-vertical.webp';
  workshop$;
  device: any;
  teamBg = this.rootPath + '../../../../assets/backgrounds/djangogirls/djangogirls.webp';
  
  


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
  }
}
