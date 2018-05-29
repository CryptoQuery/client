import { Component, OnInit } from '@angular/core';
import * as Articles from '../../json/articles.json';
import {ActivatedRoute, Router} from '@angular/router';
import {ServerEndpointsService} from '../../services/server-endpoints/server-endpoints.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  title = 'Article';
  article: any;
  isLoading = false;
  articleId: string;

  constructor(private routeActive: ActivatedRoute,
              private router: Router,
              private serverEndpoints: ServerEndpointsService) {
    this.routeActive.params.subscribe((params: any) => {
      this.articleId = params['id'];
    });
  }

  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    this.isLoading = true;
    this.serverEndpoints.getArticleById(this.articleId).then((result: any) => {
      this.isLoading = false;
      this.article = _.isObject(result) ? result : {};
    }).catch((error: any) => {
      this.isLoading = false;
      this.router.navigate(['/error']);
    });
  }

}
