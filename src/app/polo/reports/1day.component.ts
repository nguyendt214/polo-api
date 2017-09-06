import { Component, OnInit, ViewChild } from '@angular/core';
import { PoloService } from '../services/polo.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { MenuItem } from 'primeng/primeng';
import { CacheService, CacheStoragesEnum } from 'ng2-cache/ng2-cache';
@Component({
  selector: 'app-polo-report-60m',
  templateUrl: './1day.component.html'
})
export class PoloReport1DayComponent implements OnInit {
  private cacheExist: boolean = this._cacheService.exists('cache_1day');
  public coins: Array<any> = this.cacheExist ? this._cacheService.get('cache_1day') : [];
  public btcList: Array<any> = [];
  public xmrList: Array<any> = [];
  public ethList: Array<any> = [];
  public usdtList: Array<any> = [];
  public btcListOrigin;
  public xmrListOrigin;
  public ethListOrigin;
  public usdtListOrigin;

  public userCoin: Array<any> = [];
  public cols: any;
  public btcKey: string = '';
  public objectKeys = Object.keys;
  constructor(private poloService: PoloService, private _cacheService: CacheService) { }

  public ngOnInit() {
    if (!this.cacheExist) {
      this.callApiGetData();
    }
    // change storage (returns new instance of service with needed storage)
    this._cacheService.useStorage(CacheStoragesEnum.LOCAL_STORAGE);
    this.initData();
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'high24hr', header: 'Cao' },
      { field: 'low24hr', header: 'Thấp' },
      { field: 'last', header: 'Price' },
      { field: 'percentChange', header: 'Changed' },
      { field: 'quoteVolume', header: 'Volumn' },
      { field: 'created_at', header: 'Date' }
    ];
  }

  public initData() {
    let list = this.poloService.groupBy(this.coins, 'code');
    Object.keys(list).forEach(key => {
      let item = list[key];
      if (key.indexOf('BTC_') > -1) {
        this.btcList[key] = item;
      } else if (key.indexOf('XMR_') > -1) {
        this.xmrList[key] = item;
      } else if (key.indexOf('ETH_') > -1) {
        this.ethList[key] = item;
      } else if (key.indexOf('USDT_') > -1) {
        this.usdtList[key] = item;
      }
    });
    this.btcListOrigin = this.btcList;
    this.xmrListOrigin = this.xmrList;
    this.ethListOrigin = this.ethList;
    this.usdtListOrigin = this.usdtList;

  }

  public callApiGetData() {
    this.coins = [];
    this.poloService.getDataFromTable('kevin_returnTicker_1day').then(data => {
      this.coins = data;
      // put some data to cache for 20 minutes (maxAge - in seconds)
      this._cacheService.set('cache_1day', data, { maxAge: 300 * 60 });
    });
  }
  public lastData() {
    this.callApiGetData();
  }

  public searchBtc() {
    if (!this.btcKey) {
      this.btcList = this.btcListOrigin;
      return;
    }
    let temp: Array<any> = [];
    for (let index in this.btcListOrigin) {
      if (index.indexOf(this.btcKey.toLocaleUpperCase()) > -1) {
        temp[index] = this.btcListOrigin[index];
      }
    }
    this.btcList = temp;
  }
}
