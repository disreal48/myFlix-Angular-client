import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  localUser: any = {};

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public matListModule: MatListModule
  ) {}

  ngOnInit(): void {
    this.getLocalUser();
    console.log(this.localUser.Username);
  }

  getLocalUser(): void {
    this.localUser = JSON.parse(localStorage.getItem('user') || '{}');
  }

  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result));
        console.log(result);
        this.snackBar.open('Success', 'User Details Updated', {
          duration: 2000,
        });
      },
      (result) => {
        // console.log(result);

        this.snackBar.open('Success', 'User Details Updated', {
          duration: 2000,
        });
      }
    );
  }
}
