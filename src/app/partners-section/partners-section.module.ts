import { TitleModule } from './../_shared/title/title.module';
import { ButtonModule } from './../_shared/button/button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersSectionComponent } from './partners-section.component';
import { LogoModule } from '../_shared/logo/logo.module';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TitleModule,
        LogoModule
    ],
    declarations: [
        PartnersSectionComponent
    ],
    exports: [
        PartnersSectionComponent
    ]
})
export class PartnersSectionModule { }