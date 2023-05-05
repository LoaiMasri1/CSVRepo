import { UserRole } from './../../../auth/models/enum/role.enum';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit, OnDestroy {
  @Input() user: any;
  @Input() signOut: any;
  isLoading: boolean = false;
  authenticatedUserName!: string;
  subscription = new Array<Subscription>();
  isFileUploaded: boolean = false;
  userRole: UserRole = UserRole.READ;

  constructor(private readonly _router: Router) {}

  async ngOnInit() {
    Amplify.configure(environment.congito);
    
    this.authenticatedUserName = this.user.username || 'Guest';
    this.saveToken();
    this.userRole = JSON.parse(localStorage.getItem('payload') || '{}')[
      'custom:role'
    ] as UserRole;
  }

  onSignOut() {
    this.signOut();
    localStorage.removeItem('access_token');
    localStorage.removeItem('payload');
    this._router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

  onIsLoadingChange(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  onFileUploaded(fileUploaded: boolean) {
    this.isFileUploaded = fileUploaded;
  }

  saveToken() {
    const result = {
      access_token: this.user?.signInUserSession.idToken.jwtToken,
      payload: this.user?.signInUserSession.idToken.payload,
    };
    localStorage.setItem('access_token', result.access_token);
    localStorage.setItem('payload', JSON.stringify(result.payload));
  }
}
