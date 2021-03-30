import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { WorkshopsRoutingModule } from './workshops-routing.module';
import { WorkshopsComponent } from './workshops.component';
import { PatreonModule } from '../patreon/patreon.module';
import { HeroSectionModule } from '../hero-section/hero-section.module';
import { TeamSectionModule } from '../team-section/team-section.module';
import { PartnersSectionModule } from '../partners-section/partners-section.module';

@NgModule({
  declarations: [WorkshopsComponent],
  imports: [
    CommonModule,
    WorkshopsRoutingModule,
    ScullyLibModule,
    PatreonModule,
    HeroSectionModule,
    PartnersSectionModule,
    TeamSectionModule
  ],
})
export class WorkshopsModule { }
