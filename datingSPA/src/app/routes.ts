import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent} from './home/home.component';
import { MembersComponent } from './members/member-list/members.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MessagesComponent } from './messages/messages.component';

import { AuthGuard } from './guards/auth.guard';
import { MemberPageComponent } from './members/member-page/member-page.component';
import { MembersResolver } from './resolvers/members.resolver';
import { MemberResolver } from './resolvers/member.resolver';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditGuard } from './guards/member-edit.guard';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MembersComponent, resolve: { users: MembersResolver } },
      {
        path: 'members/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [MemberEditGuard],
      },
      { path: 'members/:username', component: MemberPageComponent, resolve: { user: MemberResolver } },
      { path: 'favourites', component: FavouritesComponent },
      { path: 'messages', component: MessagesComponent },
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
