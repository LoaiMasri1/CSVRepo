import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
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

  constructor() {
  }

  async ngOnInit() {
  }

}
