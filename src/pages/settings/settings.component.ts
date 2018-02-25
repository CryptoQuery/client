import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import Topics from '../../json/topics.json';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  title = 'Settings';
  quality: number;
  complexity: number;
  defaultTopics = Topics;
  currentTopic: string;
  topics = [];

  constructor() {}

  ngOnInit() {
    this.quality = 3;
    this.complexity = 5;
  }

  addTopic(event: MatChipInputEvent) {
    let value = event.value;
    let index = this.topics.indexOf(value.trim());
    // Add our fruit
    if (index < 0) {
      this.topics.push(value.trim());
    }
  }

  removeTopic(topic: string) {
    let index = this.topics.indexOf(topic);
    if (index >= 0) {
      this.topics.splice(index, 1);
    }
  }

  saveSettings() {
    console.log('Settings Saved');
  }

}
