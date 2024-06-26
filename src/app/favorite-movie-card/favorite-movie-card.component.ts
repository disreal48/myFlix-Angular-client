import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorite-movie-card',
  templateUrl: './favorite-movie-card.component.html',
  styleUrls: ['./favorite-movie-card.component.scss'],
})
export class FavoriteMovieCardComponent {
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      // console.log(this.movies);
      return this.favoriteMovies;
    });
  }

  removeFavorite(movie: any): void {
    this.fetchApiData.deleteFavoriteMovies(movie).subscribe((resp: any) => {
      movie.Favorite = false;
      this.getFavoriteMovies();
      this.snackBar.open('Success', 'Movie removed from favorites', {
        duration: 2000,
      });
      return this.favoriteMovies;
    });
  }
}
