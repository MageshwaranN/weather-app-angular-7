import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  WeatherSummaryCardComponent,
  PageNotFoundComponent,
  WeatherDetailedCardComponent
 } from './components';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/summary',
    pathMatch: 'full'
  },
  {
    path: 'summary',
    component: WeatherSummaryCardComponent
  },
  {
    path: 'detailed/:city',
    component: WeatherDetailedCardComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
