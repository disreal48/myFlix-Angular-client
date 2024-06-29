import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';

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

  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorCardComponent, {
      width: '400px',
      data: { movie },
    });
  }

  openGenreDialog(movie: any): void {
    this.dialog.open(GenreCardComponent, {
      width: '400px',
      data: { movie },
    });
  }

  openDescriptionDialog(movie: any): void {
    this.dialog.open(DescriptionCardComponent, {
      width: '400px',
      data: { movie },
    });
  }
}
