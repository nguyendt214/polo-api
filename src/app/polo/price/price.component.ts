import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'polo-price',
  templateUrl: './price.component.html'
})

export class PriceComponent implements OnInit {
  public list: Array<any> = [];
  constructor() { }

  ngOnInit() {
    this.list = [{
      currency: 'bitcoin',
      base: 'USD',
      secondary: ''
    }, {
      currency: 'ethereum',
      base: 'USD',
      secondary: 'BTC'
    }, {
      currency: 'ripple',
      base: 'USD',
      secondary: 'BTC'
    }, {
      currency: 'bitcoin-cash',
      base: 'USD',
      secondary: 'BTC'
    }, {
      currency: 'litecoin',
      base: 'USD',
      secondary: 'BTC'
    }, {
      currency: 'nem',
      base: 'USD',
      secondary: 'BTC'
    }, {
      currency: 'dash',
      base: 'USD',
      secondary: 'BTC'
    }, {
      currency: 'ethereum-classic',
      base: 'USD',
      secondary: 'BTC'
    }, {
      currency: 'zcash',
      base: 'USD',
      secondary: 'BTC'
    }, {
      currency: 'digibyte',
      base: 'USD',
      secondary: 'BTC'
    }, {
      currency: 'bitcoindark',
      base: 'USD',
      secondary: 'BTC'
    }, {
      currency: 'firstcoin',
      base: 'USD',
      secondary: 'BTC'
    }, {
      currency: 'blackcoin',
      base: 'USD',
      secondary: 'BTC'
    }, {
      currency: 'dogecoin',
      base: 'USD',
      secondary: 'BTC'
    }];
  }
}
