import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthGuard} from "./common-services/auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginPageComponent },
  { path: 'welcome', canActivate: [AuthGuard], loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'authors', canActivate: [AuthGuard], loadChildren: () => import('./pages/author/author.module').then(m => m.AuthorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
