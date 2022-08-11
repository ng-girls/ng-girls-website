import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './hero/hero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { MatCardModule } from '@angular/material/card';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { HeaderComponent } from './header/header.component';
import { EventComponent } from './event/event.component';
import { MatButtonModule } from '@angular/material/button';
import { AboutComponent } from './about/about.component';
import { MatIconModule } from '@angular/material/icon';
import { BeAPartComponent } from './be-a-part/be-a-part.component';
import { CommunityComponent } from './community/community.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    AnnouncementsComponent,
    PlaceholderComponent,
    HeaderComponent,
    EventComponent,
    AboutComponent,
    BeAPartComponent,
    CommunityComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
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
export class AppModule { }
