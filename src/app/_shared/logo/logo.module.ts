import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo.component';
import { TitleModule } from '../title/title.module';

@NgModule({
    imports: [
        CommonModule,
        TitleModule,

    ],
    declarations: [
        LogoComponent
    ],
    exports: [
        LogoComponent
    ]
})
export class LogoModule { }