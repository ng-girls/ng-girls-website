import { Observable } from 'rxjs';
import {Component, OnInit, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogPersonComponent} from '../dialog-person/dialog-person.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-team-section',
  templateUrl: './team-section.component.html',
  styleUrls: ['./team-section.component.scss']
})
export class TeamSectionComponent implements OnInit {
  @Input() image;
  @Input() team;
  @Input() mobileHeight;
  @Input() title: string;
  @Input() showPopups = false;
  // mobileHeight = 700; //6/2*250 + 200;
  height = 700;
  device: any;
  team$;
  

  constructor(public dialog: MatDialog) {
  }
  
  ngOnInit(): void {
    // this.team$ = this.team.pipe(
    //     map(routeList => {
    //       // this.team$ = routeList.mentors;
    //       // this.teamLength$ = routeList.mentors.length;
    //       console.log(routeList)
    //       return routeList;
    //     })
    //   // (this.srs.getCurrent() as Observable<ScullyRoute>)
    // );
    this.mobileHeight = this.team ? this.team.length / 2*250 + 200 : 700;
    this.image.alt = this.image.alt ? this.image.alt : 'eclipse';
    this.device = this.image.device;
    if(this.device.isMobile){
      this.height = this.mobileHeight;
    }
    this.image['mobileHeight'] = this.mobileHeight;
  }

  openDialog(person): void {
    if (!this.showPopups) return;
    const dialogRef = this.dialog.open(DialogPersonComponent, {
      data: person,
      autoFocus: false
    });
  }


}
