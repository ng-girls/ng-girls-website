import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CocComponent} from './coc.component';


const routes: Routes = [
  {
    path: ':slug',
    component: CocComponent,
  },
  {
    path: '**',
    component: CocComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CocRoutingModule {}