import { ResponsivePipe } from './../pipes/responsive.pipe';
import { BgImageComponent } from './../bg-image/bg-image.component';
import { LogoComponent } from './../logo/logo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './hero-section.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HeroSectionComponent,
        LogoComponent,
        BgImageComponent,
        ResponsivePipe
    ],
    exports: [
        HeroSectionComponent
    ]
})
export class HeroSectionModule { }