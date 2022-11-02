import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL='http://localhost:3000/auth';

  constructor(private httpClient: HttpClient) { }

  login(user: User) {
    return this.httpClient.post<User>(`${this.baseURL}/login`, user);
  }
}
