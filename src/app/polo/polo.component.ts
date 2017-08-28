import { Component, OnInit } from '@angular/core';
import { PoloService } from './services/polo.service';

@Component({
  selector: 'app-polo',
  templateUrl: './polo.component.html'
})
export class PoloComponent implements OnInit {
  public coins: any;
  public btcList: Array<any> = [];
  public xmrList: Array<any> = [];
  public ethList: Array<any> = [];
  public usdtList: Array<any> = [];
  public userCoin: Array<any> = [];
  constructor(private poloService: PoloService) { }

  public ngOnInit() {
    this.poloService.getUserCoins().then(data => {
      this.coins = data;
      this.coins.forEach(element => {
        let code = element.tab;
        switch (code) {
          case 'BTC':
            this.addUserCoin(element);
            this.btcList.push(element);
            break;
          case 'XMR':
            this.addUserCoin(element);
            this.xmrList.push(element);
            break;
          case 'ETH':
            this.addUserCoin(element);
            this.ethList.push(element);
            break;
          case 'USDT':
            this.addUserCoin(element);
            this.usdtList.push(element);
            break;
          default:
            break;
        }
      });
    });
  }

  public addUserCoin(coin: any) {
    if (coin.has == 2) {
      this.userCoin.push(coin.code);
    }
  }

  public toogle(code: string, val: any) {
    let coinIdx = this.userCoin.indexOf(code);
    if (val.checked && coinIdx === -1) {
      this.userCoin.push(code);
    } else if (!val.checked && coinIdx > -1) {
      this.userCoin.splice(coinIdx, 1);
    }
  }

  public update() {
    this.poloService.updateUserCoins(this.userCoin);
  }

}
