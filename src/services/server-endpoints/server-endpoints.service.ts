import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable()
export class ServerEndpointsService {

  constructor(private http: HttpService) {}

  /* Authenticate */
  //CHECK: Authenticate <email> <password>
  authenticate(query) {
    return this.http.post('/api/Authenticate', {
      email: query.email,
      password: query.password
    });
  }

  /* Articles */
  //CHECK: getArticlesByTopics <topics> <limit> <offset>
  getArticlesByTopics(query: any) {
    return this.http.post('/api/Articles/GetArticlesByTopics', {
      topics: query.topics,
      limit: query.limit,
      offset: query.offset
    });
  }

  //CHECK: getArticleById <id>
  getArticleById(id: string) {
    return this.http.get(`/api/Articles/${id}`);
  }

  /* User */
  //CHECK: getUserById <id>
  getUserById(id: string) {
    return this.http.get(`/api/Users/GetUserById/${id}`);
  }

  //CHECK: createUser <email> <password> <topics>
  createUser(query: any) {
    return this.http.post('/api/Users/CreateUser', {
      email: query.email,
      password: query.password,
      topics: query.topics
    });
  }

  //CHECK: updateUser <email>
  updateUserEmail(id: string, query: any) {
    return this.http.patch(`/api/Users/UpdateEmail/${id}`, {
      email: query.email
    });
  }

  //CHECK: updateUserSettings <id>, <topics>
  updateUserSettings(id: string, query: any) {
    return this.http.patch(`/api/Users/UpdateUserSettings/${id}`, {
      topics: query.topics
    });
  }

  //CHECK: updateAuthorization <token>
  updateAuthorization(token: string) {
    return this.http.updateAuth(token);
  }

  //CHECK: clearAuthorization
  clearAuthorization() {
    return this.http.clearAuth();
  }

  checkLoginStatus() {
    return this.http.checkLoginStatus();
  }

}
