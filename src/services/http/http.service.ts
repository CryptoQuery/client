import { Injectable } from '@angular/core';
import {StorageService} from '../storage/storage.service';
import axios from 'axios';

@Injectable()
export class HttpService {

  request: any;

  constructor(private storage: StorageService) {
    this.request = axios.create();
    this.getAuthToken().then((result: any) => {
      if (result && 'auth' in result) {
        this.request.defaults.headers.common['Authorization'] = `Bearer ${result.auth}`;
      }
    });
  }

  /* Authorization */
  //CHECK: getAuthToken
  private getAuthToken() {
    return this.storage.get('Auth');
  }

  //CHECK: checkLoginStatus
  checkLoginStatus() {
    return new Promise((resolve, reject) => {
      this.getAuthToken().then((result: any) => {
        if (result && 'auth' in result) {
          this.request.defaults.headers.common['Authorization'] = `Bearer ${result.auth}`;
          resolve(true);
        }
        resolve(false);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  //CHECK: updateAuth <token>
  updateAuth(token: string) {
    return new Promise((resolve, reject) => {
      this.storage.set('Auth', {auth: token}).then(() => {
        this.request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        resolve();
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  //CHECK: clearAuth
  clearAuth() {
    return new Promise((resolve, reject) => {
      this.storage.set('Auth', {}).then(() => {
        return this.storage.set('User', {});
      }).then((result: any) => {
        if ('Authorization' in this.request.defaults.headers.common) {
          delete this.request.defaults.headers.common['Authorization'];
        }
        resolve();
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  /* Articles */
  // CHECK: post
  post(url: string, query: any) {
    return new Promise((resolve, reject) => {
      this.request.post(url, query).then((result: any) => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          throw new Error('response error');
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /* Settings */
  // CHECK: get
  get(url: string) {
    return new Promise((resolve, reject) => {
      this.request.get(url).then((result: any) => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          throw new Error('response error');
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

  //CHECK: patch
  patch(url, query: any) {
    return new Promise((resolve, reject) => {
      this.request.patch(url, query).then((result: any) => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          throw new Error('response error');
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

}
