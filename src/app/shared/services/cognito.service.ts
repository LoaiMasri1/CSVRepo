import {Injectable} from '@angular/core';
import {Amplify, Auth} from "aws-amplify";
import {environment} from "../../../environments/environment";
import {Observable, from, catchError, of} from "rxjs";


Amplify.configure(environment.congito);

export interface ICognitoUser {
  username: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() {
  }

  signUp(user: ICognitoUser): Observable<any> {
    return from(Auth.signUp({
      username: user.username,
      password: user.password,
      attributes: {
        email: user.email,
      }
    }));
  }

  signIn(username: string, password: string): Observable<any> {
    return from(Auth.signIn(username, password));
  }

  getAuthenticatedUser(): Observable<any> {
    return from(Auth.currentAuthenticatedUser())
      .pipe(
        catchError(error => {
          return of(null);
        })
      )
  }

  signOut(): Observable<any> {
    return from(Auth.signOut());
  }

  verifyUser(username: string, code: string): Observable<any> {
    return from(Auth.confirmSignUp(username, code));
  }
}
