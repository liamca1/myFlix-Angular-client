import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  // 1. movie variable is declared as an array.
  //    this is where the movies returned from the API will be kept.
  user: any = {};
  Username = localStorage.getItem('user');
  movies: any[] = [];
  currentUser: any = null;
  currentFavs: any = null;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public rouet: Router
  ) {}

  // 3. After implementing the function getMovies(), it's then called in the ngOnInit() lifecycle hook. ngOnInit() is called when Angular is done creating the component.
  ngOnInit(): void {
    this.getMovies();
    this.getCurrentUser();
  }

  // 2. this getMovies function is both implemented and then used to fetch the movies from the FetchApiDataService with the help of getAllMovies().
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser().subscribe((res: any) => {
      console.log(res);
      const currentUser = res.Username;
      console.log(currentUser);
      this.currentFavs = res.FavouriteMovies;
      console.log(this.currentFavs);
    });
  }

  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px',
      panelClass: 'synopsis-custom',
    });
  }

  addToUserFavourites(id: string, Title: string): void {
    console.log(id);
    const token = localStorage.getItem('token');
    console.log(token);
    this.fetchApiData.addFavouriteMovie(id).subscribe((res: any) => {
      this.snackBar.open(
        `${Title} has been added to your favourite movies.`,
        'OK',
        {
          duration: 4000,
          verticalPosition: 'top',
        }
      );
      console.log(res);
      this.ngOnInit();
    });
    return this.getCurrentUser();
  }

  // Check if a movie is already in favorite list of user
  isFavorite(MovieID: string): boolean {
    return this.currentFavs.some((movie: any) => movie._id === MovieID);
  }

  // Remove a favorite movie from the user's list of favorite movies
  removeFavoriteMovies(movieID: string, title: string): void {
    this.fetchApiData.removeFavouriteMovie(movieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favourites!`,
        'OK',
        {
          duration: 3000,
        }
      );
      this.ngOnInit();
    });
    return this.getCurrentUser();
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
      panelClass: 'genre-custom',
    });
  }

  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px',
      panelClass: 'director-custom',
    });
  }
}