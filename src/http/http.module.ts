import { NgModule } from '@angular/core';
import { HttpProgressService } from './services/http-progress.service';
import { BrowserXhr } from '@angular/http';
import { BrowserXhr as ProgressiveBrowserXhr } from './services/browser-xhr.service';
import {HttpService} from "./services/http.service";

@NgModule({
    declarations: [],
    exports: [],
    imports: [],
    providers: [
        HttpProgressService,
        HttpService,
        {
            provide: BrowserXhr,
            useFactory: (httpProgress: HttpProgressService) => {
                return new ProgressiveBrowserXhr(httpProgress);
            },
            deps: [HttpProgressService]
        }],
    bootstrap: []
})
export class HttpModule { }
