import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilesService, MyFile} from "../../files.service";
import {Amplify} from "aws-amplify";
import {environment} from "../../../../../environments/environment";
import { Router} from "@angular/router";
import {CognitoService} from "../../../../shared/services/cognito.service";
import {Subscription} from "rxjs";
import {AuthenticatorService} from "@aws-amplify/ui-angular";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  files: MyFile[] = [];
  authenticatedUserName: string | null="visitor"
  subscription = new Array<Subscription>();

  constructor(private readonly _fileService: FilesService,
              private readonly authenticator:AuthenticatorService,
              private readonly _router: Router) {
  }

  ngOnInit() {
    Amplify.configure(environment.congito);
    // this.subscription.push(this._cognitoService.getAuthenticatedUser().subscribe(
    //   {
    //     next: (user) => this.authenticatedUserName = user.username,
    //     error: error => console.error(error),
    //   }
    // ));

  }

  uploadFile(file: File): void {
    this.isLoading = true;
    this._fileService.saveFile(file).subscribe(
      {
        next: () => this.files,
        error: error => console.error(error),
        complete: () => this.isLoading = false
      }
    );
  }

  signOut(): void {
    this.authenticator.signOut();
    this._router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}
