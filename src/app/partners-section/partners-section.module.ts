import { TitleModule } from './../title/title.module';
import { ButtonModule } from './../button/button.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersSectionComponent } from './partners-section.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        TitleModule
    ],
    declarations: [
        PartnersSectionComponent
    ],
    exports: [
        PartnersSectionComponent
    ]
})
export class PartnersSectionModule { }