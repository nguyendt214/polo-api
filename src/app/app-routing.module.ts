import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'homde', pathMatch: 'full' },
  // otherwise redirect to home
  { path: '**', redirectTo: '/home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: Boolean(history.pushState) === false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
