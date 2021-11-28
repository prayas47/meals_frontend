import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { authInterceptorProviders } from '../shared/services/auth.interceptor'
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../shared/guard/auth.guard';
import { SharedModule } from 'src/shared/shared.module';
import { NgHttpLoaderModule } from 'ng-http-loader';

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
    ToastrModule.forRoot(),
    SharedModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [authInterceptorProviders,AuthGuard],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
