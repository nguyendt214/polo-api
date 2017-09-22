import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import * as _ from 'lodash';

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

  public getUserCoins(): Promise<any> {
    let url = this.baseURL + 'kcoins/index/getUserCoin';
    return this.http.get(url)
      .map((res: Response) => { return res.json(); })
      .toPromise();
  }

  /**
   * Group list item by key
   */

  public groupBy(list: Array<any>, key: string) {
    let groups = [];
    list = this.sortBy(list, 'created_at');
    for (let i: number = 0; i < list.length; i++) {
      let groupName = list[i][key];
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(list[i]);
    }
    return groups;
  }

  /**
   * Group list item by key
   */

  public groupByKey(list: Array<any>, key: string) {
    let groups = [];
    for (let i: number = 0; i < list.length; i++) {
      let groupName = list[i][key];
      let item = list[i];
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      // console.log(item['n']);
      // console.log(moment.unix(item['ts']).format("MM/DD/YYYY"));
      groups[groupName].push(item);
    }
    return groups;
  }

  /**
   * Order list by key
   */
  public sortBy(list: Array<any>, key: string) {
    return list.sort((a, b) => {
      let aDate = moment(a[key], 'YYYY-MM-DD HH:mm:ssZ');
      let bDate = moment(b[key], 'YYYY-MM-DD HH:mm:ssZ');
      return aDate > bDate ? -1 : 1;
    });
  }

  public updateUserCoins(coins: any) {
    let url = this.baseURL + 'kcoins/index/updateUserCoins?coins=' + coins.toString();
    this.http.get(url).toPromise();
  }

  public removeDuplicateDate(list: Array<any>) {
    let after = [];
    Object.keys(list).forEach((key, value) => {
      let item: Array<any> = list[key];
      let preItem = { ts: 0 };
      let preTime;
      item.filter(val => {
        if (!after[key]) {
          after[key] = [];
        }
        preTime = preItem.ts ? moment.unix(preItem.ts).format('MM/DD/YYYY').toString() : '';
        preItem = val;
        let currentTime = moment.unix(val['ts']).format('MM/DD/YYYY').toString();
        if (preTime !== currentTime) {
          console.log(preItem['vol24h'] - val['vol24h']);

          val['up'] = (preItem['vol24h'] - val['vol24h'] > 0 ) ? 1 : 0;
          after[key].push(val);
        }
      });
    });
    console.log(after);

    return after;
  }
}
