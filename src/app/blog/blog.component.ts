import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router, ROUTES} from '@angular/router';
import { ScullyRoutesService, ScullyRoute, TransferStateService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { GetDeviceService } from '../service/get-device/get-device.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated

})
export class BlogComponent implements OnInit {
  device: any;
  ngOnInit() {}

  article$;

  constructor(private router: Router, private route: ActivatedRoute, private srs: ScullyRoutesService, private sts: TransferStateService, getDevice: GetDeviceService) {
    this.device = getDevice.getDevice();
    this.article$ = this.sts.useScullyTransferState(
      'blogRoutes',
      (this.srs.getCurrent() as Observable<ScullyRoute>)
    );
  }
}
