import { NgModule } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './auth.routing';
import { LoginComponent } from './components/login/login.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import { environment } from '../../../environments/environment';
import { FilesModule } from '../files/files.module';

Amplify.configure(environment.congito);

@NgModule({
  declarations: [LoginComponent],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    AmplifyAuthenticatorModule,
    FilesModule,
  ],
  providers: [],
})
export class AuthModule {}
