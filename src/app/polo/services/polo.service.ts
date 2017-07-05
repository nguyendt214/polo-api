import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PoloService {

  constructor(private http: Http) { }

  public getAllData(): Promise<any> {
    let url = `kevin-api/_data`;
    return this.http.get(url)
      .map((res: Response) => { return res.json(); })
      .toPromise();
  }
}
