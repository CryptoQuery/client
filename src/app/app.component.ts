import {Component, OnDestroy} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {LoginDialogComponent} from '../components/login-dialog/login-dialog.component';
import {SignupDialogComponent} from '../components/signup-dialog/signup-dialog.component';
import {ServerEndpointsService} from '../services/server-endpoints/server-endpoints.service';
import {Router} from '@angular/router';
import {StorageService} from '../services/storage/storage.service';
import {NotificationService} from '../services/notification/notification.service';
import * as _ from 'lodash';

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
              private notificationService: NotificationService,
              private snackBar: MatSnackBar) {
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
      this.displayNotification({
        type: 'Success',
        message: 'Successfully logged out'
      });
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
      this.snackBar.open(body.message, _.startCase(body.type), {
        duration: 2000
      });
    } else {
      this.snackBar.open(body.message, _.startCase(body.type), {
        duration: 2000
      });
    }
  }
}
