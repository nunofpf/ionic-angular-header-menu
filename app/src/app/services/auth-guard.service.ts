import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private apiService: ApiService) { }

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.apiService.isLoggedIn();
    if (!isLoggedIn) {
      throw {
        error: {
          statusMessage: 'User not logged in'
        }
      };
    }
    return true;
  }
}
