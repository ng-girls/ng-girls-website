import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocComponent } from './coc/coc.component';
import { FaqComponent } from './faq/faq.component';
import { EventComponent } from './event/event.component';
import { EventResolver } from 'src/app/event.resolver';

const routes: Routes = [
  { path: 'faq', component: FaqComponent },
  { path: 'coc', component: CocComponent },
  {
    path: 'event/:eventId',
    resolve: { events: EventResolver }, // Resolve events before activating the route
    children: [
      { path: '', component: EventComponent, data: { animation: 'event' } },
    ]
  },
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
  exports: [RouterModule],
  providers: [EventResolver] // Provide the resolver
})
export class AppRoutingModule {
}
