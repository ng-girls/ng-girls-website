import {Component, OnInit, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogPersonComponent} from '../dialog-person/dialog-person.component';

@Component({
  selector: 'app-team-section',
  templateUrl: './team-section.component.html',
  styleUrls: ['./team-section.component.scss']
})
export class TeamSectionComponent implements OnInit {

  @Input() team;
  @Input() title: string;
  @Input() showPopups = false;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(person): void {
    if (!this.showPopups) return;
    const dialogRef = this.dialog.open(DialogPersonComponent, {
      data: person,
      autoFocus: false
    });
  }


}
