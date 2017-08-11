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
  public list: Array<any> = [2];
  constructor(private poloService: PoloService) { }

  public ngOnInit() {
    this.poloService.getDataFromTable('kevin_coin').then(data => {
      this.coins = data;
      this.coins.forEach(element => {
        let code = element.tab;
        switch (code) {
          case 'BTC':
            this.btcList.push(element);
            break;
          case 'XMR':
            this.xmrList.push(element);
            break;
          case 'ETH':
            this.ethList.push(element);
            break;
          case 'USDT':
            this.usdtList.push(element);
            break;
          default:
            break;
        }
      });
    });
  }

}
