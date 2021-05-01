import {Component, OnInit, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogPersonComponent} from '../dialog-person/dialog-person.component';

@Component({
  selector: 'app-team-section',
  templateUrl: './team-section.component.html',
  styleUrls: ['./team-section.component.scss']
})
export class TeamSectionComponent implements OnInit {
  @Input()   image;

 
  @Input() device;
  @Input() team;
  @Input() title: string;
  @Input() showPopups = false;
  mobileHeight = 6/2*250 + 200;
  ua = navigator.userAgent;
  isMobile = false;
  height = 700;

  constructor(public dialog: MatDialog) {
  }
  
  ngOnInit(): void {
    this.image.alt = this.image.alt ? this.image.alt : 'eclipse';
    if(this.device.isMobile){
      this.isMobile = true;
      this.height = this.mobileHeight;
    }
  }

  openDialog(person): void {
    if (!this.showPopups) return;
    const dialogRef = this.dialog.open(DialogPersonComponent, {
      data: person,
      autoFocus: false
    });
  }


}
