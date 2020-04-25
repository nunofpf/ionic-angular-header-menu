import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  currentUser: User | null;
  redirectUrl: string;

  constructor() { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(userName: string, password: string): void {
    this.currentUser = {
      id: 1,
      userName: ('{userName}')
    };
  }

  logout(): void {
    this.currentUser = null;
  }
}
