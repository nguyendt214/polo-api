import { Injectable } from '@angular/core';
import { BrowserXhr as ChoreBrowserXhr } from '@angular/http';
import { HttpProgressService } from './http-progress.service';

@Injectable()
export class BrowserXhr extends ChoreBrowserXhr {

    constructor(private httpProgress: HttpProgressService) {
        super();
    }

    public build(): any {
        let xhr: XMLHttpRequest = super.build();
        xhr.onloadstart = () => {
            this.httpProgress.setProgress(HttpProgressService.STATES.START);
        };
        xhr.onprogress = (event: ProgressEvent) => {
            // Make sure the total is not set to Zero to avoid divided by zero error.
            // This will make sure the progress calculation is accurate.
            if (event.lengthComputable === true && event.total > 0) {
                let progress = Math.round(event.loaded / event.total * 100);
                this.httpProgress.setProgress(HttpProgressService.STATES.PROGRESS, progress);
            }
        };
        xhr.onloadend = (event: ProgressEvent) => {
            this.httpProgress.setProgress(HttpProgressService.STATES.END);
        };
        return <any>(xhr);
    };
}
