import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WorkshopsComponent} from './workshops.component';

const routes: Routes = [
  {
    path: ':workshopId',
    component: WorkshopsComponent,
  },
  {
    path: '**',
    component: WorkshopsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkshopsRoutingModule {}

