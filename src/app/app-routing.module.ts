import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocComponent } from './coc/coc.component';
import { FaqComponent } from './faq/faq.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  { path: 'faq', component: FaqComponent },
  { path: 'coc', component: CocComponent },
  { path: 'event/:eventId', component: EventComponent, data: { animation: 'event' } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'disabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 200]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
