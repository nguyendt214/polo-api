/**
 * @author Kevin Black <ndotrong@pentalog.fr>
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoloComponent } from './polo.component';
import { PoloTradeComponent } from './trade/trade.component';
import { PriceComponent } from './price/price.component';

const routes: Routes = [
  { path: 'home', component: PoloComponent },
  { path: 'price', component: PriceComponent },
  { path: 'user/trading', component: PoloTradeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: Boolean(history.pushState) === false })],
  exports: [RouterModule]
})
export class PoloRoutingModule { }
