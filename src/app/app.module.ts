import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Ng2WeatherIconsModule } from 'ng2-weather-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherSummaryCardComponent } from './components/weather-summary-card/weather-summary-card.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WeatherDetailedCardComponent } from './components/weather-detailed-card/weather-detailed-card.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherSummaryCardComponent,
    PageNotFoundComponent,
    WeatherDetailedCardComponent,
    WeatherCardComponent
  ],
  imports: [
    BrowserModule,
    Ng2WeatherIconsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
