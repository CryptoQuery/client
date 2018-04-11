import { Component, OnInit } from '@angular/core';
import * as Articles from '../../json/articles.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Home Page';
  articles: any = Articles;
  constructor() {}

  ngOnInit() {}

}
