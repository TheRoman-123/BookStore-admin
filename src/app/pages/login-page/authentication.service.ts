import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {HttpClient} from "@angular/common/http";
import {Constants} from "../../common-services/Constants";
import {LoginRequest} from "./login-page.component";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  serverUrl: string = Constants.serverUrl + '/auth'

  constructor(
    private http: HttpClient
  ) { }


  login(value: LoginRequest) {
    const url = this.serverUrl + '/authenticate';

    const requestBody = {
      emailOrUsername: value?.username,
      password: value?.password
    };

    return this.http.post(url, requestBody)
      .pipe(
        map(data => data as { accessToken: string })
      );
  }

  isAuthenticated(): boolean {
    const tokenOrNull = localStorage.getItem('token');

    if (tokenOrNull) {
      let decodedToken: { role: string } = jwt_decode(tokenOrNull);
      return decodedToken['role'] === 'ADMIN';
    }

    return false;
  }
}
