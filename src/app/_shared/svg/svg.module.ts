import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SVGComponent } from './svg.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,

    ],
    declarations: [
        SVGComponent
    ],
    exports: [
        SVGComponent
    ]
})
export class SVGModule { }