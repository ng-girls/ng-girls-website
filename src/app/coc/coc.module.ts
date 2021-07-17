import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { CocRoutingModule } from './coc-routing.module';
import { CocComponent } from './coc.component';
import { HeroSectionModule } from '../hero-section/hero-section.module';

@NgModule({
  declarations: [CocComponent],
  imports: [
    CommonModule,
    CocRoutingModule,
    ScullyLibModule,
    HeroSectionModule
  ],
})
export class CocModule { }
