import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { DeleteProfileComponent } from '../delete-profile/delete-profile.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  user: any = {};
  username: any = localStorage.getItem('user');
  movies: any[] = [];
  favouriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavouriteMovies();
  }

  /**
   * Calls API endpoint to: get the user's data
   * @function getUser
   * @returns user's data in JSON format
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }
  
  /**
   * Calls API endpoint to: get a user's list of favourite movies
   * @function getFavouriteMovies
   */
  getFavouriteMovies(): void {
    this.fetchApiData.getFavouriteMovies().subscribe((resp: any) => {
      this.favouriteMovies = resp;
      console.log(this.favouriteMovies);
      return this.favouriteMovies;
    });
  }

  /**
   * opens the EditProfileComponent so that a user can edit their data
   * @param username 
   * @param email 
   * @param birth 
   * @param password 
   */
  openEditDialog(username: string, email: string, birth: string, password: string): void {
    this.dialog.open(EditProfileComponent, {
      data: {
        Username: username,
        Email: email,
        Birth: birth,
        Password: password
      },
      width: '500px',
      panelClass: 'edit-custom'
    });
  }

  /**
   * Opens DeleteProfileComponent so that a user can remove their profile/data from the database
   * @param username 
   * @param email 
   */
  openDeleteDialog(username: string, email: string): void {
    this.dialog.open(DeleteProfileComponent, {
      data: {
        Username: username,
        Email: email,
      },
      width: '500px',
      panelClass: 'delete-custom'
    });
  }

}