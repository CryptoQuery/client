import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-notification-snackbar',
  templateUrl: './notification-snackbar.component.html',
  styleUrls: ['./notification-snackbar.component.scss']
})
export class NotificationSnackbarComponent {

  message: string;
  type: string;
  typeClass: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    if ('message' in data) { this.message = data.message; }
    if ('type' in data) { this.type = data.type; }
    this.typeClass = (_.toLower(data.type) === 'error' ? 'message-type-error' : 'message-type-success');
  }

}
