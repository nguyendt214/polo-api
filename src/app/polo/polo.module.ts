import { NgModule } from '@angular/core';
import { PoloComponent } from './polo.component';
import { PoloService } from './services/polo.service';
import { PoloRoutingModule } from './polo-routing.module';
import {
  MdButtonModule,
  MdCardModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdCheckboxModule,
  MdTabsModule,
  MdPaginatorModule,
  MdTableModule
} from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChecklistModule } from 'angular-checklist';
import { PoloTradeComponent } from './trade/trade.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import { PriceComponent } from './price/price.component';
import { PoloReportComponent } from './reports/reports.component';
@NgModule({
  imports: [
    PoloRoutingModule,
    MdCheckboxModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdCheckboxModule,
    MdTabsModule,
    ChecklistModule,
    Ng2TableModule,
    PaginationModule.forRoot()
  ],
  exports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdCheckboxModule,
    MdTabsModule,
    ChecklistModule,
    Ng2TableModule
  ],
  declarations: [
    PoloComponent,
    PoloTradeComponent,
    PriceComponent,
    PoloReportComponent
  ],
  providers: [PoloService],
})
export class PoloModule { }
