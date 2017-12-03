import { Component, OnInit } from '@angular/core';
import Article from '../../json/article.json';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  title = 'Article';
  article = Article;
  constructor() {}

  ngOnInit() {}

}
