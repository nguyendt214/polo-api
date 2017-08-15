import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


/**
 * @ngModule HttpModule
 *
 * Provide information regarding the XHR request.
 * You can access lifecycle & progress of the request (this respect the RFC https://www.w3.org/TR/progress-events/)
 *
 * Note that you need to use `http.service` OR override default `BrowserXHR` with `browser-xhr` defined in
 * this module
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
export class HttpProgressService {
  private progress: number = 0;
  private onLoading: boolean = false;
  private numberOfRequests = 0;
  private enableLoading: boolean = true;

  public loadingChange: Subject<boolean> = new Subject<boolean>();
  public progressChange: Subject<number> = new Subject<number>();

  static STATES: any = {
    START: 'loadstart',
    PROGRESS: 'progress',
    END: 'loadend'
  };

  constructor() { }

  /**
   * Update the progression of the HTTP request
   * @param state
   * @param progress
   */
  public setProgress(state: string, progress?: number): void {
    switch (state) {
      case HttpProgressService.STATES.START:
        this.updateLoading(true);
        this.updateProgress(0);
        this.numberOfRequests++;
        break;
      case HttpProgressService.STATES.PROGRESS:
        this.updateProgress(progress);
        break;
      case HttpProgressService.STATES.END:
        this.numberOfRequests--;
        if (this.numberOfRequests === 0) {
          this.updateLoading(false);
          this.updateProgress(100);
        }
      default:
        break;
    }
  }

  public setEnableLoading(value: boolean) {
    this.enableLoading = value;
  }

  private updateLoading(value: boolean) {
    if (this.enableLoading) {
      this.onLoading = value;
      this.loadingChange.next(this.onLoading);
    }
  }

  private updateProgress(value: number) {
    this.progress = value;
    this.progressChange.next(this.progress);
  }
}
