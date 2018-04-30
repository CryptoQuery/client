import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ErrorStateMatcher,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatSliderModule, MatSnackBarModule,
  MatToolbarModule,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

/* Services */
import {HttpService} from '../services/http/http.service';
import {StorageService} from '../services/storage/storage.service';
import {ServerEndpointsService} from '../services/server-endpoints/server-endpoints.service';
import {NotificationService} from '../services/notification/notification.service';

/* Components */
import { ArticleListItemComponent } from '../components/article-list-item/article-list-item.component';
import { LoginDialogComponent } from '../components/login-dialog/login-dialog.component';
import {SignupDialogComponent} from '../components/signup-dialog/signup-dialog.component';

/* Pipes */
import { DateFormatPipe } from '../pipes/date-format/date-format.pipe';

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
    LoginDialogComponent,
    SignupDialogComponent,
    DateFormatPipe
  ],
  entryComponents: [
    LoginDialogComponent,
    SignupDialogComponent
  ],
  providers: [
    HttpService,
    StorageService,
    ServerEndpointsService,
    NotificationService,
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
      MatProgressSpinnerModule,
      MatMenuModule,
      MatCardModule,
      MatSliderModule,
      MatChipsModule,
      MatSelectModule,
      MatPaginatorModule,
      MatSnackBarModule
    ],
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent,
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'settings',
        component: SettingsComponent,
        runGuardsAndResolvers: 'always'
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
    ], {onSameUrlNavigation: 'reload'})
  ]
})
export class AppModule { }
