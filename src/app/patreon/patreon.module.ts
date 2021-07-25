import { TitleModule } from './../_shared/title/title.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatreonComponent } from './patreon.component';

@NgModule({
    imports: [
        CommonModule,
        TitleModule
    ],
    declarations: [
        PatreonComponent
    ],
    exports: [
        PatreonComponent
    ]
})
export class PatreonModule { }