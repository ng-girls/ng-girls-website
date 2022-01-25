import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BlogComponent} from './blog.component';
import { PreviewComponent } from '../preview/preview.component';

const routes: Routes = [
  {
    path: '',
    component: PreviewComponent
  },
  {
    path: ':slug',
    component: BlogComponent,
  },
  {
    path: '**',
    component: PreviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}

