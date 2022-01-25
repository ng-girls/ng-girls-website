import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-person',
  templateUrl: './dialog-person.component.html',
  styleUrls: ['./dialog-person.component.scss']
})
export class DialogPersonComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogPersonComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log('onointi')
    console.log(this.data)
    this.data.photo = this.data.photo.indexOf('assets/') === -1 ? `assets/people/${this.data.photo}` : this.data.photo;
  }

}
