import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WorkshopsComponent} from './workshops.component';
import { WorkshopsHomeComponent } from '../workshops-home/workshops-home.component';


const routes: Routes = [
  {
    path: '',
    component: WorkshopsHomeComponent
  },
  {
    path: ':workshopId',
    component: WorkshopsComponent,
  },
  {
    path: '**',
    component: WorkshopsHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkshopsRoutingModule {}

