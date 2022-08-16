import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';

const routes: Routes = [
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
