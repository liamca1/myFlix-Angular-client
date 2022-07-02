import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule
  ) { }

  ngOnInit(): void {
  }

  /**
   * routes user to the movies page
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * routes user to profile page
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * user log out
   * clears local storage
   * navigates to the welcome screen
   */
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('You have been logged out', 'Ok', {
      duration: 2000,
      verticalPosition: 'top'
    });
    this.router.navigate(['welcome']);
  }

}
