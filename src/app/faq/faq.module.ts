import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { HeroSectionModule } from '../hero-section/hero-section.module';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    ScullyLibModule,
    HeroSectionModule
  ],
})
export class FaqModule { }
