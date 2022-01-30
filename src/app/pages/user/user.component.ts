import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent implements OnInit {
  @Input() 'user': any;
  constructor() {
    this.user = {};
  }

  ngOnInit(): void {}

  logout() {
    localStorage.setItem('token', '');
  }
}
