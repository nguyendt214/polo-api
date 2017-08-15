import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions, BrowserXhr } from '@angular/http';

import { AppComponent } from './app.component';
import { PoloModule } from './polo/polo.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdCheckboxModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { BrowserXhr as ProgressiveBrowserXhr, HttpProgressService, HttpService } from '@nordnet/http';

export function httpServiceFactory(backend: XHRBackend, options: RequestOptions) {
  return new HttpService(backend, options, 'http://www.thoichannguyen.com/poloniex/');
}

// we provide ProgressiveBrowserXhr instead of BrowserXhr
// to access to loading progress of AJAX requests
export function browserXhrFactory(httpProgress: HttpProgressService) {
  return new ProgressiveBrowserXhr(httpProgress);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PoloModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdCheckboxModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [
    HttpProgressService,
    {
      provide: BrowserXhr,
      useFactory: browserXhrFactory,
      deps: [HttpProgressService]
    },
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
