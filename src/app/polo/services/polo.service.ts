import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PoloService {
  private baseURL: string = 'http://www.thoichannguyen.com/poloniex/';
  constructor(private http: Http) { }

  public getPoloData(command: string): Promise<any> {
    let url = this.baseURL + 'kcoins/index/polo?command=' + command;
    return this.http.get(url)
      .map((res: Response) => { return res.json(); })
      .toPromise();
  }

  public getDataFromTable(tableName: string): Promise<any> {
    let url = this.baseURL + 'kcoins/index/data?name=' + tableName;
    return this.http.get(url)
      .map((res: Response) => { return res.json(); })
      .toPromise();
  }
}
