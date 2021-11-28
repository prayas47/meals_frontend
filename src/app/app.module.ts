import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CartService } from 'src/shared/services/cart.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { authInterceptorProviders } from '../shared/services/auth.interceptor'
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../shared/guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [CartService,authInterceptorProviders,AuthGuard],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
