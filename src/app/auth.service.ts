import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL='http://localhost:3000/auth';
  isAuthenticated = false;

  constructor(private httpClient: HttpClient) { }

  login(user: User) {
    this.isAuthenticated = true;
    return this.httpClient.post<User>(`${this.baseURL}/login`, user);
  }

  logout() {
    this.isAuthenticated = false;
    return this.httpClient.get(`${this.baseURL}/logout`);
  }
}
