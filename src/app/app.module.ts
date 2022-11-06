import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { EventComponent } from './event/event.component';
import { MatButtonModule } from '@angular/material/button';
import { AboutComponent } from './about/about.component';
import { MatIconModule } from '@angular/material/icon';
import { BeAPartComponent } from './be-a-part/be-a-part.component';
import { CommunityComponent } from './community/community.component';
import { TeamComponent } from './team/team.component';
import { FooterComponent } from './footer/footer.component';
import { SeeYouComponent } from './see-you/see-you.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    EventComponent,
    AboutComponent,
    BeAPartComponent,
    CommunityComponent,
    TeamComponent,
    FooterComponent,
    SeeYouComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    ScrollingModule,
    CdkScrollableModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
