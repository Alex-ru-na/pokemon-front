import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private route: Router
  ) {}

  error = '';

  form = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    nick: ['', Validators.required],
    team: '',
    password: ['', Validators.required],
    passwordConfirmation: '',
  });

  ngOnInit(): void {}

  validateEmail(email: string) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  }

  validateForm(form: any) {
    if (!form.value['password']) {
      this.error = `The password is required`;
      return false;
    }

    if (form.value['password'] != this.form.value['passwordConfirmation']) {
      this.error = `The passwords don't match`;
      return false;
    }

    if (!form.value['name']) {
      this.error = 'Name required';
      return false;
    }

    if (!form.value['nick']) {
      this.error = 'Nick name required';
      return false;
    }

    if (!form.value['team']) {
      this.error = 'Team color required';
      return false;
    }

    if (!form.value['email']) {
      this.error = 'Email required';
      return false;
    }

    if (!this.validateEmail(form.value['email'])) {
      this.error = 'Invalid email';
      return false;
    }

    this.error = '';
    return true;
  }

  saveUser(event: Event) {
    event.preventDefault();

    if (!this.validateForm(this.form)) {
      return;
    }

    let body = {
      name: this.form.value['name'],
      email: this.form.value['email'],
      nick: this.form.value['nick'],
      team: this.form.value['team'],
      password: this.form.value['password'],
    };

    this.usersService.createUser(body).subscribe({
      next: (data) => {
        this.route.navigate(['/login']);
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }
}
