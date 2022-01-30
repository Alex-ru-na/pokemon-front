import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  constructor(private routeActivated: ActivatedRoute, private route: Router) {}

  userLogged: any = {};

  ngOnInit(): void {
    this.routeActivated.queryParams.subscribe((user) => {
      this.userLogged = user;
    });
  }
}
