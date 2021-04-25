import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSectionComponent } from './team-section.component';
import { LogoComponent } from '../logo/logo.component';
import { ResponsivePipe } from '../pipes/responsive.pipe';
import { BgImageComponent } from '../bg-image/bg-image.component';
import { BgImageModule } from '../bg-image/bg-image.module';

@NgModule({
    imports: [
        CommonModule,
        BgImageModule
    ],
    declarations: [
        TeamSectionComponent,
        // LogoComponent,
        // BgImageComponent,
        // ResponsivePipe
    ],
    exports: [
        TeamSectionComponent
    ]
})
export class TeamSectionModule { }