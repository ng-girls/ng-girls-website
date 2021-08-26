import { ButtonModule } from './../_shared/button/button.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { WorkshopsRoutingModule } from './workshops-routing.module';
import { WorkshopsComponent } from './workshops.component';
import { PatreonModule } from '../patreon/patreon.module';
import { HeroSectionModule } from '../hero-section/hero-section.module';
import { TeamSectionModule } from '../team-section/team-section.module';
import { PartnersSectionModule } from '../partners-section/partners-section.module';
import { LetModule, ViewportPrioModule } from '@rx-angular/template';

@NgModule({
  declarations: [WorkshopsComponent],
  imports: [
    CommonModule,
    WorkshopsRoutingModule,
    ScullyLibModule,
    PatreonModule,
    HeroSectionModule,
    PartnersSectionModule,
    TeamSectionModule,
    ButtonModule,
    LetModule, 
    ViewportPrioModule,
    
  ],
})
export class WorkshopsModule { }
