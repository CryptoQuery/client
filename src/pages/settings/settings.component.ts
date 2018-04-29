import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import * as Topics from '../../json/topics.json';
import * as _ from 'lodash';
import {StorageService} from '../../services/storage/storage.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  title = 'Settings';
  defaultTopics = Topics;
  topics: any = [];
  navigation: any;
  constructor(private storage: StorageService,
              private router: Router,
              private notificationService: NotificationService) {
    this.navigation = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get all user topics in local storage
        this.storage.get('Topics').then((localTopics: any) => {
          this.topics = (_.isArray(localTopics) ? localTopics : [
            'Bitcoin',
            'Ethereum',
            'Other Coins',
            'Blockchain',
            'CryptoCurrency',
            'ICOs'
          ]);
        });
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.navigation) {
      this.navigation.unsubscribe();
    }
  }

  addTopic(event: MatChipInputEvent) {
    let value = event.value;
    // Get index of topics
    let index = _.indexOf(this.topics, value.trim());
    // Add topic to topics
    if (index < 0) {
      this.topics.push(value.trim());
    }
  }

  removeTopic(topic: string) {
    // Get topic index
    let index = _.indexOf(this.topics, topic);
    // Remove topic
    if (index >= 0) {
      this.topics.splice(index, 1);
    }
  }

  saveSettings() {
    this.storage.set('Topics', this.topics).then(() => {
      console.log('Settings Saved');
    }).catch(() => {
      this.notificationService.sendNotification({
        type: 'error',
        message: 'Error: Unable to save settings'
      });
    });
  }

}
