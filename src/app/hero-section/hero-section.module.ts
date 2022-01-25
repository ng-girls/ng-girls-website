import { SVGModule } from './../_shared/svg/svg.module';
import { MatIconModule } from '@angular/material/icon';
import { BgImageModule } from './../bg-image/bg-image.module';
import { LogoComponent } from './../logo/logo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './hero-section.component';

@NgModule({
    imports: [
        CommonModule,
        BgImageModule,
        MatIconModule,
        SVGModule
    ],
    declarations: [
        HeroSectionComponent,
        LogoComponent,
    ],
    exports: [
        HeroSectionComponent
    ]
})
export class HeroSectionModule { }