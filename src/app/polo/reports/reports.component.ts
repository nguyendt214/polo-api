import { Component, OnInit, ViewChild } from '@angular/core';
import { PoloService } from '../services/polo.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { CacheService, CacheStoragesEnum } from 'ng2-cache/ng2-cache';
import * as _ from 'lodash';

@Component({
  selector: 'app-polo-report',
  templateUrl: './reports.component.html'
})
export class PoloReportComponent implements OnInit {
  public btcList: Array<any> = [];
  public xmrList: Array<any> = [];
  public ethList: Array<any> = [];
  public usdtList: Array<any> = [];
  public userCoin: Array<any> = [];
  private cacheExist: boolean = this._cacheService.exists('cache_kevin_wordcoinindex_1day');
  public coins: Array<any> = this.cacheExist ? this._cacheService.get('cache_kevin_wordcoinindex_1day') : [];
  public allCoins: Array<any> = [];
  public objectKeys = Object.keys;

  constructor(private poloService: PoloService, private _cacheService: CacheService) { }

  public ngOnInit() {
    if (!this.cacheExist) {
      this.callApiGetData();
    }
    // change storage (returns new instance of service with needed storage)
    this._cacheService.useStorage(CacheStoragesEnum.LOCAL_STORAGE);
    this.initData();
  }

  public initData() {
    this.coins.forEach(coin => {
      this.allCoins = this.allCoins.concat(JSON.parse(coin['data']));
    });
    this.allCoins = this.poloService.removeDuplicateDate(this.poloService.groupByKey(this.allCoins, 'lb'));
  }

  public callApiGetData() {
    this.poloService.getDataFromTable('kevin_wordcoinindex_1day').then(data => {
      this.coins = data;
      // put some data to cache for 20 minutes (maxAge - in seconds)
      this._cacheService.set('cache_kevin_wordcoinindex_1day', data, { maxAge: 300 * 60 });
    });
  }
  public lastData() {
    this.callApiGetData();
  }

}
