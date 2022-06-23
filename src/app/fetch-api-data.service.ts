import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://gathering-of-films.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // User Registration Endpoint: Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
 // User Login Endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

 // Get All Movies Endpoint:
  public getAllMovies(): Observable<any> {
    console.log();
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    );
  }

 // Get Single [1] Movie Endpoint:
  public getOneMovie(title: any): Observable<any> {
    console.log();
    return this.http.get(apiUrl + `movies/${title}`).pipe(
      catchError(this.handleError)
    );
  }

 // Get Director Endpoint:
  public getDirector(name: any): Observable<any> {
    console.log();
    return this.http.get(apiUrl + `directors/${name}`).pipe(
      catchError(this.handleError)
    );
  }

 // Get Genre Endpoint:
  public getGenre(name: any): Observable<any> {
    console.log();
    return this.http.get(apiUrl + `genres/${name}`).pipe(
      catchError(this.handleError)
   );
  }

 // Get User Endpoint:
  public getUser(username: any): Observable<any> {
    console.log();
    return this.http.get(apiUrl + `users/:${username}`).pipe(
      catchError(this.handleError)
    );
  }

 // Get Favorite Movies for a User:
  public getFavoriteMovies(username: any, movies: any): Observable<any> {
    console.log();
    return this.http.get(apiUrl + `users/:${username}/movies/`).pipe(
      catchError(this.handleError)
    );
  }

 // Add a Movie to Favorite Movies:
  public addFavoriteMovie(movieID: string): Observable<any> {
    console.log();
    return this.http.get(apiUrl + `users/${username}/movies/${movieID}`).pipe(
      catchError(this.handleError)
    );
  }

 // Edit a User:
 public editUser(username: any): Observable<any> {
  console.log(username);
  return this.http.put(apiUrl + `users/${username}`).pipe(
  catchError(this.handleError)
  );
}

 // Delete a User:
 public deleteUser(username: any): Observable<any> {
  console.log(username);
  return this.http.delete(apiUrl + `users/${username}`).pipe(
  catchError(this.handleError)
  );
}

 // Delete a Movie from the Favorite Movies:
 public deleteMovie(username: any, movies: any): Observable<any> {
  console.log(username, movies);
  return this.http.delete(apiUrl + `users/${username}/movies/`)
 }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}