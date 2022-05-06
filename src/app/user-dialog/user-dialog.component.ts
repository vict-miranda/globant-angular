import { Component, OnInit, Inject  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IUser } from '../interfaces/user.interface'

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: IUser) {}

  ngOnInit() {
  }

  cancelar() {
    this.dialogRef.close();
  }

}
