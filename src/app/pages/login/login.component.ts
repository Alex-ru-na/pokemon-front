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

  ngOnInit(): void {}

  public error: string = '';

  // variables
  public email: string = 'algo@gmail.com';
  public password: string = '1234';
  public user: any = {};

  fetchLogin() {
    console.log({ user: this.email, pwd: this.password });

    this.usersService.login(this.email, this.password).subscribe({
      next: (data) => {
        this.user = data.user;
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user.name);
        this.route.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }
}
