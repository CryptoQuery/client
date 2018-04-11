import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import * as Topics from '../../json/topics.json';
import * as _ from 'lodash';
import {StorageService} from '../../services/storage/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  title = 'Settings';
  defaultTopics = Topics;
  topics: any;

  constructor(private storage: StorageService) {}

  ngOnInit() {
    // Get all user topics in local storage
    this.storage.get('topics').then((value: any) => {
      if (Array.isArray(value)) {
        this.topics = value;
      }
    }).catch((error) => {
      console.log(error);
    });
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
    this.storage.set('topics', this.topics).then((result) => {
      console.log('Settings Saved');
    }).catch((error) => {
      console.log(error);
    });
  }

}
