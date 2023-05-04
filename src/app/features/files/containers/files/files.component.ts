import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FilesService} from "../../files.service";
import {Amplify} from "aws-amplify";
import {environment} from "../../../../../environments/environment";
import {Router} from "@angular/router";
import {CognitoService} from "../../../../shared/services/cognito.service";
import {Subscription} from "rxjs";
import {AuthenticatorService} from "@aws-amplify/ui-angular";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, OnDestroy {
  @Input() user: any;
  @Input() signOut: any;
  isLoading: boolean = false;
  authenticatedUserName!: string;
  subscription = new Array<Subscription>();
  isFileUploaded: boolean = false;

  constructor(private readonly _fileService: FilesService,
              private readonly authenticator: AuthenticatorService,
              private readonly _router: Router) {
  }

  ngOnInit() {
    Amplify.configure(environment.congito);
    this.authenticatedUserName = this.user.username || "Guest";
    console.log(this.user);
  }


  ngOnDestroy() {
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  onIsLoadingChange(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  onFileUploaded(fileUploaded: boolean) {
    this.isFileUploaded = fileUploaded;
  }
}
