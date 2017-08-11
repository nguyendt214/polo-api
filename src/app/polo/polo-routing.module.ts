/**
 * @author Kevin Black <ndotrong@pentalog.fr>
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoloComponent } from './polo.component';

const routes: Routes = [
  { path: 'home', component: PoloComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: Boolean(history.pushState) === false })],
  exports: [RouterModule]
})
export class PoloRoutingModule { }
