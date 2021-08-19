// import { CommonModule } from '@angular/common';
import { ResponsivePipe } from './../pipes/responsive.pipe';
import { BgImageComponent } from './bg-image.component';
import { NgModule } from '@angular/core';
@NgModule({
    imports: [
        // CommonModule
        
    ], 
    declarations: [
        BgImageComponent,
        ResponsivePipe,
    ],
    exports: [
        BgImageComponent,
        ResponsivePipe,
    ]
})
export class BgImageModule { }