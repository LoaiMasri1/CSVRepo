import {Component, OnInit} from '@angular/core';

import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  public router: Router;
  public formFields = {
    signUp: {
      email: {
        order: 1
      },
      username: {
        order: 2
      },
      password: {
        order: 3
      },
      confirm_password: {
        order: 4
      },
    },
  }

  constructor(_router: Router) {
    this.router = _router;
  }

  async ngOnInit() {
  }

}
