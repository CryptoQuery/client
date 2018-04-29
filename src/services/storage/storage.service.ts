import { Injectable } from '@angular/core';
import * as q from 'q';

@Injectable()
export class StorageService {

  constructor() {}

  get(key: string) {
    return new Promise((resolve, reject) => {
      let value: any;
      try {
        value = JSON.parse(window.localStorage.getItem(key));
      } catch (error) {
        reject('Error: Unable to get values from local storage.');
      }
      resolve(value);
    });
  }

  set(key: string, value = {}) {
    return new Promise((resolve, reject) => {
      if (!key) { reject('Error: unable to add values to local storage'); }
      window.localStorage.setItem(key, JSON.stringify(value));
      resolve(value);
    });
  }

  clear() {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.clear();
      } catch (error) {
        reject('Error: Unable to clear values from local storage.');
      }
      resolve();
    });
  }

}
