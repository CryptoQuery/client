import { Injectable } from '@angular/core';
import * as q from 'q';

@Injectable()
export class StorageService {

  constructor() { }

  get(key: string) {
    return q.Promise((resolve, reject) => {
      let value: any;
      try {
        value = JSON.parse(window.localStorage.getItem(key));
      } catch (error) {
        reject('Error: unable to get values from local storage');
      }
      resolve(value);
    });
  }

  set(key: string, value = {}) {
    return q.Promise((resolve, reject) => {
      if (!key) { reject('Error: unable to add values to local storage'); }
      window.localStorage.setItem(key, JSON.stringify(value));
      resolve(value);
    });
  }

}
