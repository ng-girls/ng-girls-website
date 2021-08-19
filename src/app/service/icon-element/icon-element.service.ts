import { Injectable } from '@angular/core';
// TODO: geht das kleiner
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS } from './icon-element.consts';

@Injectable({
  providedIn: 'root'
})
export class IconElementService {
  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
  }

  public initIcon(icon: ICONS): void {
    this.iconRegistry.addSvgIcon(icon,
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `../../../assets/svg/${icon}.svg`));
  }
}
