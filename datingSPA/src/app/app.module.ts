import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from "./services/auth/auth.service";
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from "./interceptors/error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
