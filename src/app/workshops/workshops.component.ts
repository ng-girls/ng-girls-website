import { environment } from './../../environments/environment';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, ROUTES } from '@angular/router';
import { ScullyRoutesService, ScullyRoute, TransferStateService, isScullyGenerated } from '@scullyio/ng-lib';
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
  isScullyGenerated = isScullyGenerated();
  hasState = this.sts.stateHasKey('workshopsRoutes')
  events$ = isScullyGenerated() && this.sts.stateHasKey('workshopsRoutes')
  ? this.sts.getState<any>('workshopsRoutes').pipe(
    map(this.pageFilter.getPages('workshops', false, 'foobar')),
    map(this.pageFilter.filterBy('published'))
)
  : this.sts.useScullyTransferState(
    'workshopsRoutes',
    this.srs.available$.pipe(
      map(this.pageFilter.getPages('workshops', false, 'foobar')),
      map(this.pageFilter.filterBy('published'))
  ));

  constructor(
    private srs: ScullyRoutesService, 
    private sts: TransferStateService,
    getDevice: GetDeviceService,
    private pageFilter: PageFilterService,
     private cdref: ChangeDetectorRef
     ) {
      console.log('=== state workshop ===');
      console.log(this.isScullyGenerated );
      console.log(this.hasState );
      this.device = getDevice.getDevice();
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  ngOnInit() {
    console.log('on init workshop compoenten');
    console.log(this.srs.getCurrent())
    this.workshop$ = this.sts.useScullyTransferState(
      'workshopRoutes',
      this.srs.getCurrent().pipe(
        map(this.pageFilter.getStage(DEFAULTS.homeLogo, this.device))
    ));
  }
}
