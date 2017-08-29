import { Component, OnInit, ViewChild } from '@angular/core';
import { PoloService } from '../services/polo.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-polo-report-60m',
  templateUrl: './reports.component.html'
})
export class PoloReport1DayComponent implements OnInit {
  public coins: any;
  public btcList: Array<any> = [];
  public xmrList: Array<any> = [];
  public ethList: Array<any> = [];
  public usdtList: Array<any> = [];
  public userCoin: Array<any> = [];

  constructor(private poloService: PoloService) { }

  public ngOnInit() {
    this.poloService.getDataFromTable('kevin_returnTicker_1day').then(data => {
      this.coins = data;
      let list = this.poloService.groupBy(data, 'code');
      Object.keys(list).forEach(key => {
        let item = list[key];
        if (key.indexOf('BTC_') > -1) {
          this.btcList.push(item);
        } else if (key.indexOf('XMR_') > -1) {
          this.xmrList[key] = item;
        } else if (key.indexOf('ETH_') > -1) {
          this.ethList[key] = item;
        } else if (key.indexOf('USDT_') > -1) {
          this.usdtList[key] = item;
        }
      });
    });
  }

}
