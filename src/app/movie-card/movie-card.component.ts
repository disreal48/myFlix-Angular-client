import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DescriptionCardComponent } from '../description-card/description-card.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
    this.getMovies();
    this.checkFavorites();
  }

  checkFavorites(): void {
    this.movies.forEach((movie: any) => {
      // console.log(movie);
      const isFavorite = this.favoriteMovies.find(
        (favorite: any) => favorite._id === movie._id
      );
      if (isFavorite) {
        movie.Favorite = true;
      }
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.checkFavorites();
      // console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      // console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  setFavorite(movie: any): void {
    const isAlreadyFavorite = this.favoriteMovies.find(
      (favorite: any) => favorite._id === movie._id
    );
    if (isAlreadyFavorite) {
      this.snackBar.open('Not successfull', 'Movie is already in favorites', {
        duration: 2000,
      });
    } else {
      this.fetchApiData.addFavoriteMovies(movie).subscribe((resp: any) => {
        movie.Favorite = true;
        this.getFavoriteMovies();
        this.snackBar.open('Success', 'Movie added to favorites', {
          duration: 2000,
        });
      });
    }
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
