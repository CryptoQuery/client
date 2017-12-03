import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  title = 'Settings';
  quality: number;
  constructor() {}

  ngOnInit() {
    this.quality = 3;
  }

  saveSettings() {
    console.log('Settings Saved');
  }

}
