import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from '../components/login-dialog/login-dialog.component';
import {SignupDialogComponent} from '../components/signup-dialog/signup-dialog.component';
import {ServerEndpointsService} from '../services/server-endpoints/server-endpoints.service';
import {Router} from '@angular/router';
import {StorageService} from '../services/storage/storage.service';
import {NotificationService} from '../services/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'CryptoQuery';
  userLoggedIn: boolean;
  notification: any;
  constructor(public dialog: MatDialog,
              private serverEndpoints: ServerEndpointsService,
              private router: Router,
              private storage: StorageService,
              private notificationService: NotificationService) {
    // Subscribe to notification service
    this.notification = notificationService.getNotification().subscribe((body: any) => this.displayNotification(body));
    // Check if user is logged in
    this.serverEndpoints.checkLoginStatus().then((loggedIn: boolean) => {
      this.userLoggedIn = loggedIn;
    }).catch((error: any) => {
      this.userLoggedIn = false;
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.notification.unsubscribe();
  }

  openSignUp() {
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userLoggedIn = true;
        const url = this.router.url.split('?')[0];
        if (url === '/home') {
          this.router.navigate([url], { queryParams: { page: 0 } });
        } else {
          this.router.navigate([url]);
        }
      }
    });
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userLoggedIn = result;
        const url = this.router.url.split('?')[0];
        if (url === '/home') {
          this.router.navigate([url], { queryParams: { page: 0 } });
        } else {
          this.router.navigate([url]);
        }
      }
    });
  }

  signOut() {
    this.serverEndpoints.clearAuthorization().then(() => {
      this.userLoggedIn = false;
      const url = this.router.url.split('?')[0];
      if (url === '/home') {
        this.router.navigate([url], { queryParams: { page: 0 } });
      } else {
        this.router.navigate([url]);
      }
    }).catch((error: any) => {
      this.displayNotification({
        type: 'error',
        message: 'Unable to sign out!'
      });
    });
  }

  displayNotification(body: any) {
    if (body.type === 'error') {
      console.log('error', body.message);
    } else {
      console.log('message', body.message);
    }
  }
}
