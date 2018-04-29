import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServerEndpointsService} from '../../services/server-endpoints/server-endpoints.service';
import {StorageService} from '../../services/storage/storage.service';
import * as _ from 'lodash';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss']
})
export class SignupDialogComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;
  hide = true;
  hideVerify = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              public matDialog: MatDialogRef<SignupDialogComponent>,
              private serverEndpoints: ServerEndpointsService,
              private storage: StorageService,
              private notificationService: NotificationService) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      verifyPassword: ['', [Validators.required, Validators.minLength(5)]]
    }, {
      validator: this.matchFields('password', 'verifyPassword')
    });
  }

  matchFields(passwordKey: string, verifyPasswordKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let verifyPasswordInput = group.controls[verifyPasswordKey];
      if (passwordInput.value !== verifyPasswordInput.value) {
        return verifyPasswordInput.setErrors({notEquivalent: true});
      } else {
        return verifyPasswordInput.setErrors(null);
      }
    };
  }

  userSignup() {
    this.isLoading = true;
    this.storage.get('Topics').then((localTopics: any) => {
      let topics = (_.isArray(localTopics) ? localTopics : [
        'Bitcoin',
        'Ethereum',
        'Other Coins',
        'Blockchain',
        'CryptoCurrency',
        'ICOs'
      ]);
      this.serverEndpoints.createUser({
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        topics: topics
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
          message: 'Successfully signed up!'
        });
        this.matDialog.close(true);
      }).catch((error: any) => {
        this.isLoading = false;
        this.notificationService.sendNotification({
          type: 'error',
          message: 'Error signing up!'
        });
      });
    });
  }

}
