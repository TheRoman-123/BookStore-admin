import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../pages/login-page/authentication.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).isAuthenticated();
};
