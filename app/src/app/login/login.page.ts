import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  login() {
    this.apiService.login('aUserName', 'aPassword');
    this.router.navigateByUrl('/home');
  }
}
