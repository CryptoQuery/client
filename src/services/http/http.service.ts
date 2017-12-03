import { Injectable } from '@angular/core';
import axios from 'axios';
import * as querystring from 'querystring';

@Injectable()
export class HttpService {

  constructor() {}

  /* Articles */
  // CHECK: post
  post(url: string, query: any) {
    return axios.post(url, query).then(function (result) {
      if (result.data.response.status === true) {
        return result.data.data;
      } else {
        throw new Error('response error');
      }
    });
  }

  /* Settings */
  // CHECK: getUserSettings
  get(url: string, query = '') {
    return axios.get(url + (query !== '' ? '/' + querystring.stringify(query) : '')).then(function (result) {
      if (result.data.response.status === true) {
        return result.data.data;
      } else {
        throw new Error('response error');
      }
    });
  }

}
