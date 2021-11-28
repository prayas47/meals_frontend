import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from 'src/shared/services/auth.service';
import { EncrDecrService } from 'src/shared/security/encript.service';
import { TokenStorageService } from 'src/shared/services/token.service';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers:[AuthService,EncrDecrService,TokenStorageService]
})
export class AuthModule { }
