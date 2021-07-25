import { ButtonModule } from './button/button.module';
// import { ResponsivePipe } from './pipes/responsive.pipe';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ScullyLibModule} from '@scullyio/ng-lib';
import {HomeComponent} from './home/home.component';
import {TopNavigationComponent} from './top-navigation/top-navigation.component';
import {FooterComponent} from './footer/footer.component';
import {PatreonModule} from './patreon/patreon.module';
import {HeroSectionModule} from './hero-section/hero-section.module';
import {TeamSectionModule} from './team-section/team-section.module';
import {PartnersSectionModule} from './partners-section/partners-section.module';
import {AboutSectionComponent} from './about-section/about-section.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FaqComponent } from './faq/faq.component';
// import { CocComponent } from './coc/coc.component';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { WorkshopsHomeComponent } from './workshops-home/workshops-home.component';



// Material
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import { DialogPersonComponent } from './dialog-person/dialog-person.component';
// import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
// import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { PostPreviewComponent } from './post-preview/post-preview.component'
import { WorkshopPreviewComponent } from './workshop-preview/workshop-preview.component'

import { NgxPageScrollModule } from 'ngx-page-scroll';
// import { ButtonComponent } from './button/button.component';
// import { LogoComponent } from './logo/logo.component';
// import { BgImageComponent } from './bg-image/bg-image.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavigationComponent,
    FooterComponent,
    AboutSectionComponent,
    DialogPersonComponent,
    BlogHomeComponent,
    PostPreviewComponent,
    WorkshopsHomeComponent,
    WorkshopPreviewComponent,
    // ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule,
    PatreonModule,
    HeroSectionModule,
    TeamSectionModule,
    PartnersSectionModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    // FormsModule,
    MatDialogModule,
    // MatFormFieldModule,
    MatCardModule,
    NgxPageScrollModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
