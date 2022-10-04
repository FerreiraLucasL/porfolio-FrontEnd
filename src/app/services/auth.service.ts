import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../model/jwt-dto';
import { LoginUsuario } from '../model/login-usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = 'https://portfoliolucasferreira.web.app/auth/';
  constructor(private httpClient: HttpClient) {   }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authUrl+'login', loginUsuario) 
  }
}
