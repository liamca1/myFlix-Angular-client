import { Component, Inject, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  Username = localStorage.getItem('user');
  user: any = {};

  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }

  editUserProfile(): void {
    this.fetchApiData.editUser(this.userData).subscribe((resp) => {
      this.dialogRef.close();
      localStorage.setItem('user', resp.Username);
      this.snackBar.open('Your profile has been updated successfully.', 'OK', {
        duration: 2000,
        verticalPosition: 'top'
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
