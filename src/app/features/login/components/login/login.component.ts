import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private readonly _fb: FormBuilder,
              private _router: Router,
              private readonly snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    // Here you would typically make a login API call and handle the response accordingly
    // For the sake of simplicity, we will just navigate to the home page after 2 seconds
    setTimeout(() => {
      this._router.navigate(['/files'])
      this.isLoading = false;
    }, 2000);
  }

  showSnackbar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }


}
