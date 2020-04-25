import { Component } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationError, Event, Router } from '@angular/router';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  selectedPath = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.initializeApp();
    this.router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.selectedPath = routerEvent.url;
    } else if (routerEvent instanceof NavigationEnd) {
      if (routerEvent.urlAfterRedirects) {
        this.selectedPath = routerEvent.urlAfterRedirects;
      } else {
        this.selectedPath = routerEvent.url;
      }
    } else if (routerEvent instanceof NavigationError) {
      this.selectedPath = '';
      this.navigationErrorHandler(routerEvent.error);
    }
  }



  async navigationErrorHandler(err) {
    console.warn('navigationErrorHandler');
    if (!this.apiService.isLoggedIn() && this.router.url !== 'login') {
      await this.router.navigateByUrl('login');
    } else if (!this.router.url || this.router.url === '/') {
      await this.router.navigateByUrl('home');
    }

    let msg = '';
    if (err && err.statusMessage) {
      msg = err.statusMessage;
    } else if (err && err.error) {
      if (err.error.statusMessage && err.error.statusMessage === 'User not logged in') {
        return;
      }
      msg = err.error.statusMessage ? err.error.statusMessage : 'An error occurred while browsing.';
    } else {
      if (typeof err === 'string') {
        msg = err;
      } else {
        msg = 'An error occurred while browsing.';
      }
    }

    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: err.status ? `Status: ${err.status}` : '',
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
