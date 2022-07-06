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
   * @param userDetails 
   * @returns a user object in JSON format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * 
   * @param userDetails 
   * @returns user data in JSON format
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * gets data on all movies
   * @returns JSON format array of all movies
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
   * gets data on single movie
   * @param title 
   * @returns JSON object holding movie data
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
   * gets data on director
   * @param name 
   * @returns JSON object holding director data
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
   * gets data on genre
   * @param name 
   * @returns JSON object holding genre data
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
   * Gets data on single user
   * @returns JSON object holding data on requested user
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
   * gets data on users favourite movies
   * @returns JSON list holding user's favourite movies
   */
   getFavouriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${username}/movies`, {
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
   * @param movieID 
   * @returns JSON object holding updated user data
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
   * delete a movie from the users favourite movie list
   * @param movieID 
   * @returns JSON object holding updated user data
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
   * allows user to update their user data
   * @param updateDetails 
   * @returns JSON object holding updated user data
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
   * allows user to delete account / deregister
   * @returns A message that the user profile was successfully deleted
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

  /**
   * extracts response data from HTTP response
   * @param res 
   * @returns response or empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

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