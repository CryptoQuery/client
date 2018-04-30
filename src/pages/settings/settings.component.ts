import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import * as Topics from '../../json/topics.json';
import * as _ from 'lodash';
import {StorageService} from '../../services/storage/storage.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {ServerEndpointsService} from '../../services/server-endpoints/server-endpoints.service';

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
              private notificationService: NotificationService,
              private serverEndpoints: ServerEndpointsService) {
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
    this.storage.get('User').then((result: any) => {
      if (result && 'id' in result) {
        return this.serverEndpoints.updateUserTopics(result.id, {
          topics: this.topics
        });
      } else {
        return Promise.resolve({ topics: this.topics });
      }
    }).then((result: any) => {
      if ('topics' in result) {
        return this.storage.set('Topics', result.topics);
      } else {
        throw new Error('Unable to save user settings');
      }
    }).then(() => {
      this.notificationService.sendNotification({
        type: 'success',
        message: 'Successfully saved settings!'
      });
    }).catch(() => {
      this.notificationService.sendNotification({
        type: 'error',
        message: 'Unable to save settings'
      });
    });
  }

}
