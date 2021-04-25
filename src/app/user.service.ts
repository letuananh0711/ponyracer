import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(loginVal: string, passwordVal: string, birthYearVal: number): Observable<UserModel> {
    const params = { login: loginVal, password: passwordVal, birthYear: birthYearVal };
    return this.http.post<UserModel>('https://ponyracer.ninja-squad.com/api/users', params);
  }

  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http.post<UserModel>('https://ponyracer.ninja-squad.com/api/users/authentication', credentials);
  }
}
