import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersSectionComponent } from './partners-section.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PartnersSectionComponent
    ],
    exports: [
        PartnersSectionComponent
    ]
})
export class PartnersSectionModule { }