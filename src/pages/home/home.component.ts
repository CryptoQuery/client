import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerEndpointsService} from '../../services/server-endpoints/server-endpoints.service';
import {StorageService} from '../../services/storage/storage.service';
import * as _ from 'lodash';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Home Page';
  articles: any;
  navigation: any;
  querySubscribe: any;
  page: number;
  limit = 10;
  isLoading = false;

  constructor(private serverEndpoints: ServerEndpointsService,
              private storage: StorageService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private notificationService: NotificationService) {
    this.querySubscribe = this.activeRoute.queryParams.subscribe((queryParam: any) => {
      this.page = Number(queryParam['page']) || 0;
    });
    this.navigation = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getArticles();
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.navigation) {
      this.navigation.unsubscribe();
    }
    if (this.querySubscribe) {
      this.querySubscribe.unsubscribe();
    }
  }

  nextPage() {
    this.router.navigate(['/home'], { queryParams: { page: this.page + 1 }});
  }

  previousPage() {
    if (this.page > 0) {
      this.router.navigate(['/home'], {queryParams: {page: this.page - 1}});
    }
  }

  getArticles() {
    // Get topics
    this.isLoading = true;
    this.storage.get('Topics').then((localTopics: any = []) => {
      let topics = (_.isArray(localTopics) ? localTopics : [
        'Bitcoin',
        'Ethereum',
        'Other Coins',
        'Blockchain',
        'CryptoCurrency',
        'ICOs'
      ]);
      return this.serverEndpoints.getArticlesByTopics({
        topics: topics,
        limit: this.limit,
        offset: this.page * this.limit
      });
    }).then((result: any) => {
      this.isLoading = false;
      this.articles = _.isArray(result) ? result : [];
      if (_.isEmpty(this.articles)) {
        this.notificationService.sendNotification({
          type: 'error',
          message: 'No articles found!'
        });
      }
    }).catch((error: any) => {
      this.isLoading = false;
      this.notificationService.sendNotification({
        type: 'error',
        message: 'Unable to retrieve articles!'
      });
      this.router.navigate(['/error']);
    });
  }

}
