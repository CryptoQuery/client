import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ErrorStateMatcher, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatProgressBarModule, MatSelectModule, MatSliderModule, MatToolbarModule, ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/* Directives */
import {HttpService} from '../services/http/http.service';

/* Components */
import { ArticleListItemComponent } from '../components/article-list-item/article-list-item.component';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';

/* Pages */
import { AppComponent } from './app.component';
import { HomeComponent } from '../pages/home/home.component';
import { ErrorComponent } from '../pages/error/error.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { ArticleComponent } from '../pages/article/article.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    SettingsComponent,
    ArticleComponent,
    ArticleListItemComponent,
    LoginDialogComponent
  ],
  entryComponents: [
    LoginDialogComponent
  ],
  providers: [
    HttpService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    [
      MatButtonModule,
      MatCheckboxModule,
      MatToolbarModule,
      MatListModule,
      MatIconModule,
      MatDialogModule,
      MatInputModule,
      MatProgressBarModule,
      MatMenuModule,
      MatCardModule,
      MatSliderModule,
      MatChipsModule,
      MatSelectModule
    ],
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'article/:id',
        component: ArticleComponent
      },
      {
        path: 'error',
        component: ErrorComponent
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/error'
      }
    ])
  ]
})
export class AppModule { }
