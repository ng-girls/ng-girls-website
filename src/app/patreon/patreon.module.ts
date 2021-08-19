import { LogoModule } from './../_shared/logo/logo.module';
import { NgModule } from '@angular/core';
import { PatreonComponent } from './patreon.component';

@NgModule({
    imports: [
        LogoModule
    ],
    declarations: [
        PatreonComponent
    ],
    exports: [
        PatreonComponent
    ]
})
export class PatreonModule { }