import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth/auth.service';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './interceptors/error.interceptor';

import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MembersComponent } from './members/member-list/members.component';
import { MessagesComponent } from './messages/messages.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { appRoutes } from './routes';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberPageComponent } from './members/member-page/member-page.component';
import { MemberGalleryComponent } from './members/member-gallery/member-gallery.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberGalleryEditComponent } from './members/member-gallery-edit/member-gallery-edit.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MembersComponent,
    MessagesComponent,
    FavouritesComponent,
    MemberCardComponent,
    MemberPageComponent,
    MemberGalleryComponent,
    MemberEditComponent,
    MemberGalleryEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbNavModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('tok'),
        whitelistedDomains: [environment.domain],
        blacklistedRoutes: [environment.authApiBaseUrl]
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
