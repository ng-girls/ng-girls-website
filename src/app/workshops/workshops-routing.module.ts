import { PreviewComponent } from '../preview/preview.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WorkshopsComponent} from './workshops.component';


const routes: Routes = [
  {
    path: '',
    component: PreviewComponent
  },
  {
    path: ':workshopId',
    component: WorkshopsComponent,
  },
  {
    path: '**',
    component: PreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkshopsRoutingModule {}

