import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationError, Event, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Page, pagesArray } from 'src/app/interfaces/page.interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    selectedPath = '';

    get isLoggedIn(): boolean {
        return this.apiService.isLoggedIn();
    }

    get page(): Page {
        return this.selectedPath ? pagesArray().find(page => page.url === this.selectedPath) : null;
    }

    constructor(
        private router: Router,
        private apiService: ApiService
    ) {
        this.router.events.subscribe((routerEvent: Event) => {
            this.checkRouterEvent(routerEvent);
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
        }
    }

    logout() {
        this.apiService.logout();
        this.router.navigateByUrl('login');
    }
}

