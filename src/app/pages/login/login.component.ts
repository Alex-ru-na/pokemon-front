import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  public error: string = '';
  // variables
  public email: string = '';
  public password: string = '';

  fetchLogin() {
    console.log({ user: this.email, pwd: this.password });
    this.usersService.login(this.email, this.password).subscribe({
      next: (data) => {
        console.log({ data });
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }
}
