import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(private usersService: UsersService, private route: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.route.navigate(['/dashboard']);
    }
  }

  public error: string = '';

  // variables
  public email: string = '';
  public password: string = '';
  public user: any = {};

  fetchLogin() {
    this.usersService.login(this.email, this.password).subscribe({
      next: (data) => {
        this.user = data.user;
        this.error = '';
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user.name);
        this.route.navigate(['/dashboard']);
      },
      error: (error) => {
        if (error.statusText == 'Unauthorized') {
          this.error = 'password or email is not correct';
          return;
        }

        console.log({ error });
      },
    });
  }
}
