/**
 * @author Kevin Black <ndotrong@pentalog.fr>
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoloComponent } from './polo.component';
import { PoloTradeComponent } from './trade/trade.component';
import { PriceComponent } from './price/price.component';
import { PoloReportComponent } from './reports/reports.component';
import { PoloReport30mComponent } from './reports/30m.component';
import { PoloReport60mComponent } from './reports/60m.component';
import { PoloReport1DayComponent } from './reports/1day.component';

const routes: Routes = [
  { path: 'home', component: PoloComponent },
  { path: 'price', component: PriceComponent },
  { path: 'user/trading', component: PoloTradeComponent },
  { path: 'reports', component: PoloReportComponent },
  { path: '30m', component: PoloReport30mComponent },
  { path: '1h', component: PoloReport60mComponent },
  { path: '1day', component: PoloReport1DayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: Boolean(history.pushState) === false })],
  exports: [RouterModule]
})
export class PoloRoutingModule { }
