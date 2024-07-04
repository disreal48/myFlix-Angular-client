import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moviedb48-03600596b84d.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
/**
 * Service for making API calls to the server.
 */
export class FetchApiDataService {
  /**
   * Constructs a new instance of the FetchApiDataService class.
   * @param http - The HttpClient module used for making HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Extracts the response data from the API response.
   * @param res - The API response object.
   * @returns The extracted response data.
   */
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  /**
   * Makes an API call to register a new user.
   * @param userDetails - The user details to be registered.
   * @returns An observable of the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to log in a user.
   * @param userDetails - The user details for login.
   * @returns An observable of the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get all movies.
   * @returns An observable of the API response.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get a single movie by title.
   * @param title - The title of the movie to retrieve.
   * @returns An observable of the API response.
   */
  getOneMovies(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get movies by director.
   * @returns An observable of the API response.
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get movies by genre.
   * @returns An observable of the API response.
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves the current user from local storage.
   * @returns The current user object.
   */
  getUser(): any {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  /**
   * Makes an API call to edit the user details.
   * @param userDetails - The updated user details.
   * @returns An observable of the API response.
   */
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .put(apiUrl + 'users/' + user.Username, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to delete the user.
   * @returns An observable of the API response.
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get the user's favorite movies.
   * @returns An observable of the API response.
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .get(apiUrl + 'users/' + user.Username + '/movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to add a movie to the user's favorite movies.
   * @param movie - The movie to add to favorites.
   * @returns An observable of the API response.
   */
  addFavoriteMovies(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie);
    console.log('in fetch api service_id: ', movie._id);
    return this.http
      .post(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to remove a movie from the user's favorite movies.
   * @param movie - The movie to remove from favorites.
   * @returns An observable of the API response.
   */
  deleteFavoriteMovies(movie: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie._id);
    return this.http
      .delete(apiUrl + 'users/' + user.Username + '/movies/' + movie._id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Handles HTTP errors and logs them to the console.
   * @param error - The HTTP error response.
   * @returns An error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
