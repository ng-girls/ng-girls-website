import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSectionComponent } from './team-section.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TeamSectionComponent,
    ],
    exports: [
        TeamSectionComponent
    ]
})
export class TeamSectionModule { }