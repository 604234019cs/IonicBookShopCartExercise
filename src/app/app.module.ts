import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BookListPage } from '../pages/book-list/book-list';
import { BookDetailPage } from '../pages/book-detail/book-detail';
import { BookRestProvider } from '../providers/book-rest/book-rest';
import { HttpClientModule } from '@angular/common/http';
import { BookCategoryPage } from '../pages/book-category/book-category';
import { CartPage } from '../pages/cart/cart';
import { TopsellerPage } from '../pages/topseller/topseller';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookListPage,
    BookDetailPage,
    BookCategoryPage,
    CartPage,
    TopsellerPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BookListPage,
    BookDetailPage,
    BookCategoryPage,
    CartPage,
    TopsellerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BookRestProvider
  ]
})
export class AppModule {}
