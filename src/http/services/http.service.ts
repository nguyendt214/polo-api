import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptionsArgs, Response, ResponseContentType, RequestOptions, ConnectionBackend, Headers, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
/**
 * @ngModule HttpModule
 *
 * Override NG2 basic method adding them redirection in case of non-logged users
 * Add headers for JSON
 *
 * `HttpService` is available as an injectable class, with methods to perform http requests. Calling
 * `request` returns an `Observable` which will emit a single Response when a response is received.
 *
 * `HttpService` extends `Http`.
 *
 * ## Example
 *
 * ### Example configuration
 *
 * ```typescript
 * import { HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
 * import { HttpModule as HttpInterceptorModule, HttpService } from '@nordnet/http';
 * import { environment } from '../environments/environment';
 *
 * @NgModule({
 * declarations: [],
 * imports: [
 *   HttpModule,
 *   DurationModule,
 *   HttpInterceptorModule
 * ],
 * providers: [
 *   // We are telling Angular to provide an instance of
 *   // HttpService whenever someone injects Http
 *   {
 *     provide: Http,
 *     useFactory: (backend: XHRBackend, options: RequestOptions) => {
 *       return new HttpService(backend, options, environment.baseUrl);
 *     },
 *     deps: [XHRBackend, RequestOptions]
 *   }
 * ]});
 * export class MyModule { }
 * ```
 *
 *
 * ### Usage
 *
 * ```typescript
 * // This will make a call to environments.baseUrl + 'users'.
 * http.get('users').subscribe((res:Response) => this.user = res.json());
 * ```
 *
 * ## State
 * @stable
 *
 */
@Injectable()
export class HttpService extends Http {

  private baseUrl: string = null;
  private headers: Headers = new Headers();
  private requestOption: RequestOptions;
  private customErrorsConfig: ICustomErrorConfig;
  constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, baseUrl?: string) {
    super(_backend, _defaultOptions);
    if (baseUrl == null) {
      baseUrl = '/';
    } else if (!baseUrl.endsWith('/')) {
      baseUrl = `${baseUrl}/`;
    }
    this.baseUrl = baseUrl;
  }

  public getCurrentRequestOptions(): RequestOptions {
    return this.requestOption;
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(this.baseUrl + url, options));
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.requestOption = new RequestOptions({ method: RequestMethod.Get, url: url });
    return this.intercept(super.request(this.baseUrl + url, this.getRequestOptionArgs(options)));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.requestOption = new RequestOptions({ method: RequestMethod.Post, url: url });
    return this.intercept(super.request(this.baseUrl + url, this.getRequestOptionArgs(options, body)))
      .map(this.customResponseStatusHandle());
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.requestOption = new RequestOptions({ method: RequestMethod.Put, url: url });
    return this.intercept(super.request(this.baseUrl + url, this.getRequestOptionArgs(options, body)))
      .map(this.customResponseStatusHandle());
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.requestOption = new RequestOptions({ method: RequestMethod.Delete, url: url });
    return this.intercept(super.request(this.baseUrl + url, this.getRequestOptionArgs(options)))
      .map(this.customResponseStatusHandle());
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.requestOption = new RequestOptions({ method: RequestMethod.Patch, url: url });
    return this.intercept(super.request(this.baseUrl + url, this.getRequestOptionArgs(options, body)))
      .map(this.customResponseStatusHandle());
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.requestOption = new RequestOptions({ method: RequestMethod.Head, url: url });
    return super.head(this.baseUrl + url, options);
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.requestOption = new RequestOptions({ method: RequestMethod.Options, url: url });
    return super.options(this.baseUrl + url, options);
  }

  public persistHeader(key: string, value: string | string[]): void {
    // use `set` instead of `append` to prevent a rare case where multiple Authorization headers are added
    // if you want multiple value, please use string array as value
    this.headers.set(key, value);
  }

  public removeHeader(key: string): void {
    this.headers.delete(key);
  }

  public download(url: string, options?: RequestOptionsArgs, acceptType?: string): Observable<IDownloadedFile> {
    if (!options) {
      options = new RequestOptions({
        headers: new Headers({ 'Accept': acceptType || 'application/pdf' }),
        responseType: ResponseContentType.ArrayBuffer
      });
    }
    return this.get(url, options).map(response => {
      return {
        response: response,
        data: new Blob([response.arrayBuffer()], { type: acceptType }),
        filename: this.getDownloadFilename(response)
      };
    });
  }

  // extract filename from Content-Disposition: attachment; filename=abc.def; modification-date="xyz";
  public getDownloadFilename(res: Response): string {
    let contentDisposition = res.headers.get('content-disposition') || '';
    return contentDisposition.split(';').map(pair => pair.replace(/\s*filename="?([^"]+)"?|.+/, '$1')).join('').trim();
  }

  public setCustomErrorConfig(value: ICustomErrorConfig) {
    this.customErrorsConfig = value;
  }

  /**
   * Add Header to the request.
   *
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private getRequestOptionArgs(options?: RequestOptionsArgs, body?: string): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (body != null) {
      options.body = body;
    }
    options.method = this.requestOption.method;
    // Manage the headers
    // there are 2 ways to provide headers for request
    // first locally, by adding header to the function  (get, post, ... (see 'option' field)
    // the second one is to persist the headers.
    // That way the header will be taken into account except if you
    // Delete it
    // Provide on function the same header name
    // Merge the headers provided with the headers commonly persisted
    if (options.headers == null || options.headers.keys().length === 0) {
      options.headers = this.headers;
    } else if (this.headers.keys().length) {
      this.mergeHeaders(options.headers);
    }

    return options;
  }

  /**
   * Extends the globals headers with the locally-defined headers.
   * Please note that local take the stage.
   *
   * @param headers
   */
  private mergeHeaders(headers: Headers): void {
    this.headers.forEach((values: string[], name: string) => {
      if (headers.get(name) == null) {
        headers.append(name, values[0]);
      }
    });
  }

  /**
   * Intercept the Http Response. 
   *
   * @param observable
   * @returns {Observable<R>}
   */
  private intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch((err: any) => {
      return Observable.throw(err);
    });
  }

  private customResponseStatusHandle() {
    return (res: Response) => {
      let config = this.configLookup(this.customErrorsConfig, res.status);
      if (config && config.ignoreRequestUrls.indexOf(this.requestOption.url) === -1) {
        throw new Response(new ResponseOptions({ status: res.status, statusText: config.errorMessage }));
      }
      return res;
    };
  }

  private configLookup(customErrors: ICustomErrorConfig, statusCode: number): IConfig {
    return customErrors.config.filter(config => config.statusCode === statusCode)[0];
  }
}

export type IDownloadedFile = {
  response: Response,
  data: Blob,
  filename: string
};

export type ICustomErrorConfig = {
  config: IConfig[]
};

export type IConfig = {
  statusCode: number,
  errorMessage: string,
  ignoreRequestUrls: string[]
};
