import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { CocComponent } from './coc/coc.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'workshops', loadChildren: () => import('./workshops/workshops.module').then(m => m.WorkshopsModule) },
  // test
  // { path: 'krakow',   redirectTo: '/workshops/krakow', pathMatch: 'full' },
  { path: 'faq', component: FaqComponent },
  { path: 'coc', component: CocComponent },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
