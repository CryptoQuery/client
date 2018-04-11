import { Component, OnInit } from '@angular/core';
import * as Articles from '../../json/articles.json';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  title = 'Article';
  articles = Articles;
  article: any;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.article = _.filter(this.articles, ['article_id', params['id']])[0];
    });
  }

  ngOnInit() {}

}
