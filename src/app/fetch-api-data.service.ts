import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://gathering-of-films.herokuapp.com/';

// Get Authorization token
const token = localStorage.getItem('token');

// Get username
const username = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})

// FetchApiDataService or.. UserRegistrationServie ???
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
   * Calls API endpoint to: register a new user
   * @param userDetails {any}
   * @returns a new user object in JSON format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Calls API endpoint to: log in a user
   * @param userDetails {any}
   * @returns user's data in JSON format
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Calls API endpoint to: get data on all movies
   * @returns array of all movies in JSON format
   */
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', { 
      headers: new HttpHeaders({ 
        Authorization: 'Bearer ' + token
      })
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Calls API endpoint to: get data on single movie
   * @param title {any}
   * @returns a single movie in JSON format
   */
  getSingleMovie(title: any): Observable<any> {
    return this.http.get(apiUrl + `movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
  .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls API endpoint to: get data about a specific director
   * @param name {any}
   * @returns a director's data in JSON format
   */
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/directors/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls API endpoint to: get data about genre
   * @param name {any}
   * @returns a genre's data in JSON format
   */
  getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/genres/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
   );
  }

  /**
   * Calls API endpoint to: get data about a single user
   * @returns user's data in JSON format
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls API endpoint to: get data about a user's favourite movies
   * @returns user's favourite movies in JSON format
   */
   getFavouriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    // Get the Fav Movies Id from users object
    // Then look for each id in the movies list either from API or inbuilt array
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * adds a movie to the user's favourite movies list
   * @param movieID {string}
   * @returns user's updated list of favourite movies in JSON format
   */
  addFavouriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log('MovieID:' + movieID)
    return this.http.put(apiUrl + `users/${username}/movies/${movieID}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls API endpoint to: delete a movie from a user's list of favourite movies
   * @param movieID {string}
   * @returns user's updated list of favourite movies in JSON format
   */
  removeFavouriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls API endpoint to: edit a user's data
   * @param updateDetails {any}
   * @returns user's updated data in JSON format
   */
  editUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, updateDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls API endpoint to: delete the current user;s account from the database
   * @returns A message that the user profile was deleted
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Function that handles errors
  private handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
        console.error('Some error occurred:', error.error.message);
      } else {
        console.error(
          `Error Status code ${error.status}, ` +
          `Error body is: ${error.error}`
        );
      }
      return throwError(
      'Something bad happened; please try again later.');
    }
  }