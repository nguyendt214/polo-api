import { Http, XHRBackend, Request, Response, RequestOptionsArgs, RequestOptions, BrowserXhr as ChoreBrowserXhr } from '@angular/http';
import { Subject } from 'rxjs';
import { Observable } from "rxjs/Observable";
import { IDownloadedFile, ICustomErrorConfig, IConfig } from './services/http.service';

export declare class HttpModule {}

export type IDownloadedFile = IDownloadedFile;
export type ICustomErrorConfig = ICustomErrorConfig;
export type IConfig = IConfig;

export declare class HttpService extends Http {
    constructor(_backend: XHRBackend, _defaultOptions: RequestOptions, baseUrl?: string);
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;
    head(url: string, options?: RequestOptionsArgs): Observable<Response>;
    options(url: string, options?: RequestOptionsArgs): Observable<Response>;
    persistHeader(key: string, value: string | string[]): void;
    removeHeader(key: string): void;
    download(url: string, options?: RequestOptionsArgs, acceptType?: string): Observable<IDownloadedFile>;
    getDownloadFilename(res: Response): string;
    getCurrentRequestOptions(): RequestOptions;
    setCustomErrorConfig(value: ICustomErrorConfig);
}

export declare class BrowserXhr extends ChoreBrowserXhr {
    constructor(httpProgress: HttpProgressService);
}

export declare class HttpProgressService {
    constructor();
    loadingChange: Subject<boolean>;
    progressChange: Subject<number>;
    setEnableLoading(value: boolean);
    setProgress(state: string, progress?: number);
}