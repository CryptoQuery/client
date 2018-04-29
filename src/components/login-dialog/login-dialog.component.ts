import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServerEndpointsService} from '../../services/server-endpoints/server-endpoints.service';
import {StorageService} from '../../services/storage/storage.service';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  hide = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              public matDialog: MatDialogRef<LoginDialogComponent>,
              private serverEndpoints: ServerEndpointsService,
              private storage: StorageService,
              private notificationService: NotificationService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  userLogin() {
    this.isLoading = true;
    this.serverEndpoints.authenticate({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).then((result: any) => {
      // Update local storage
      return this.serverEndpoints.updateAuthorization(result.token).then(() => {
        return this.storage.set('User', {
          id: result.id,
          email: result.email
        }).then(() => {
          return this.storage.set('Topics', result.topics);
        });
      });
    }).then((result: any) => {
      this.isLoading = false;
      this.notificationService.sendNotification({
        type: 'success',
        message: 'Successfully logged in!'
      });
      this.matDialog.close(true);
    }).catch((error: any) => {
      this.isLoading = false;
      this.notificationService.sendNotification({
        type: 'error',
        message: 'Error logging in!'
      });
    });
  }

}
