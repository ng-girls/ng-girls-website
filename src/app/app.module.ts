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
import { AboutNgGirlsComponent } from './about-ng-girls/about-ng-girls.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    AnnouncementsComponent,
    PlaceholderComponent,
    HeaderComponent,
    EventComponent,
    AboutNgGirlsComponent
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
