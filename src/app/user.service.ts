import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  /* Function : Registering a user */
  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const newUser = { login, password, birthYear };
    return this.http.post<UserModel>('https://ponyracer.ninja-squad.com/api/users', newUser);
  }
}
