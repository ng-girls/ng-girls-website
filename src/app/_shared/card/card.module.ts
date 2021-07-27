import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        RouterModule
    ],
    declarations: [
       CardComponent
    ],
    exports: [
        CardComponent
    ]
})
export class CardModule { }