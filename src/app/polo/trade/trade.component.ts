import { Component, OnInit, OnDestroy } from '@angular/core';
import { PoloService } from '../services/polo.service';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'polo-trade',
  templateUrl: 'trade.component.html'
})

export class PoloTradeComponent implements OnInit, OnDestroy {
  public poloData: any = [];
  public poloPrevData: any = [];
  public btcList: Array<any> = [];
  public xmrList: Array<any> = [];
  public ethList: Array<any> = [];
  public usdtList: Array<any> = [];

  public rows: Array<any> = [];
  public btcRows: Array<any> = [];
  public xmrRows: Array<any> = [];
  public ethRows: Array<any> = [];
  public usdtRows: Array<any> = [];

  public columns: Array<any> = [];
  public page: number = 1;
  public itemsPerPage: number = 25;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;
  public btcLength: number = 0;
  public xmrLength: number = 0;
  public ethLength: number = 0;
  public usdtLength: number = 0;
  private intervalId: any;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered']
  };

  public intervalTime = 20; // Second

  constructor(private poloService: PoloService) {
  }

  public ngOnInit() {
    // this.getPoloData();
    this.getTradeInfo();
    this.setIntervalCall();
  }

  public setIntervalCall() {
    this.intervalId = setInterval(() => {
      this.getTradeInfo();
    }, this.intervalTime * 1000);
  }

  public getTradeInfo(): any {
    this.poloService.getPoloData('returnTicker').then(data => {
      Object.keys(data).forEach(key => {
        let item = data[key];
        item['code'] = key;
        item['percentChange'] = Math.round(item['percentChange'] * 10000) / 100 + ' %';
        item['quoteVolume'] = Number(item['quoteVolume']).toLocaleString("es-ES", { minimumFractionDigits: 2 });
        this.poloData.push(item);
        if (key.indexOf('BTC_') > -1) {
          this.btcList.push(item);
        } else if (key.indexOf('XMR_') > -1) {
          this.xmrList.push(item);
        } else if (key.indexOf('ETH_') > -1) {
          this.ethList.push(item);
        } else if (key.indexOf('USDT_') > -1) {
          this.usdtList.push(item);
        }

      });
      this.initTable();
    });
  }

  public initTable() {
    this.length = this.poloData.length;
    this.columns = [
      { title: 'Name', name: 'code', sort: 'asc' },
      {
        title: '24H High',
        name: 'high24hr'
      },
      { title: '24H Low', name: 'low24hr' },
      { title: 'Changed', name: 'percentChange' },
      { title: 'Voloume', name: 'quoteVolume' }
    ];

    this.onChangeTable(this.config, this.btcList, 'BTC');
    this.onChangeTable(this.config, this.xmrList, 'XMR');
    this.onChangeTable(this.config, this.ethList, 'ETH');
    this.onChangeTable(this.config, this.usdtList, 'USDT');
    //Update sorting
    this.config.sorting = { columns: this.columns };
  }

  public getPoloData() {
    this.poloService.getDataFromTable('kevin_returnTicker').then(data => {
      this.poloData = data;
      this.length = this.poloData.length;
      this.columns = [
        { title: 'Name', name: 'code' },
        {
          title: '24H High',
          name: 'high24hr'
        },
        { title: '24H Low', name: 'low24hr' },
        { title: 'Changed', name: 'percentChange' },
        { title: 'Voloume', name: 'quoteVolume', sort: 'asc' }
      ];

      this.onChangeTable(this.config);
    });
  }

  public changePage(page: any, data: Array<any> = this.poloData): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      console.log('Not');

      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      console.log('!columnName');

      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any,
    data: any = [],
    type: string = 'BTC',
    page: any = { page: this.page, itemsPerPage: this.itemsPerPage }
  ): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    if (type === 'BTC') {
      this.btcRows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.btcLength = sortedData.length;
    } else if (type === 'XMR') {
      this.xmrRows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.xmrLength = sortedData.length;
    } else if (type === 'ETH') {
      this.ethRows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.ethLength = sortedData.length;
    } else if (type === 'USDT') {
      this.usdtRows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      this.usdtLength = sortedData.length;
    }
  }

  public onCellClick(data: any): any {
    console.log(data);
  }
  public ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
