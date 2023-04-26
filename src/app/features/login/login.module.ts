import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../shared/material/material.module";
import {LoginComponent} from "./components/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginRoutingModule} from "./login.routing";
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ]
})
export class LoginModule {
}
