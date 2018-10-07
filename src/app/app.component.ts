import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountServiceService} from './servers/account/account-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  title = 'Unlimited Space';
  constructor(private authService: AccountServiceService) {
  }

  ngOnInit() {
    this.authListenerSubs = this.authService.
                            getAuthStatusListener().
                            subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.authService.autoAuthUser();
  }

  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
