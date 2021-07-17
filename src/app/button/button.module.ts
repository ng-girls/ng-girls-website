import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';

@NgModule({
    imports: [
        CommonModule,
        NgxPageScrollModule
    ],
    declarations: [
        ButtonComponent
    ],
    exports: [
        ButtonComponent
    ]
})
export class ButtonModule { }