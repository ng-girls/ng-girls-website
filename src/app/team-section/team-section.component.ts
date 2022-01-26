import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import {DialogPersonComponent} from '../dialog-person/dialog-person.component';

@Component({
  selector: 'app-team-section',
  templateUrl: './team-section.component.html',
  styleUrls: ['./team-section.component.scss']
})
export class TeamSectionComponent{
  @Input() image;
  @Input() team;
  @Input() title: string;
  @Input() showPopups = false;
  team$;

  constructor(public dialog: MatDialog) {
    console.log('constructro team section')
  }
  
  openDialog(person): void {
    if (!this.showPopups) return;
    const dialogRef = this.dialog.open(DialogPersonComponent, {
      data: person,
      autoFocus: false
    });
  }
}
