import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../interface/weather';


@Component({
  selector: 'app-weather-detailed-card',
  templateUrl: './weather-detailed-card.component.html',
  styleUrls: ['./weather-detailed-card.component.scss']
})
export class WeatherDetailedCardComponent implements OnInit, OnDestroy {

  private cityForecastSubscription: Subscription;

  public city: string;
  public today: string;
  public daysWeather: Weather[] = [];

  constructor(private _activeRouter: ActivatedRoute, private _weatherSvc: WeatherService) { }

  ngOnInit() {
    this._activeRouter.paramMap.subscribe((route: any) => {
      this.city = route.params.city;
      const weatherObj = [];
      const dates = [];
      this.cityForecastSubscription = this._weatherSvc.getForecast(this.city)
        .subscribe((forecasts) => {
          forecasts.forEach((forecast, index) => {
            const datesplit = forecast.dt_txt.split(' ');
            dates.push(datesplit[0]);
            weatherObj.push({
              date: datesplit[0],
              hours: datesplit[1],
              state: forecast.weather[0].main,
              temperature: Math.round(forecast.main.temp)
            });
          });
          const uniqueDates = dates.filter((v, i, a) => a.indexOf(v) === i);
          uniqueDates.forEach((date) => {
            const reqObj = [];
            weatherObj.forEach((obj) => {
              if (date === obj.date) {
                reqObj.push({
                  hours: obj.hours,
                  state: obj.state,
                  temperature: obj.temperature
                });
              }
            });
            this.daysWeather.push({
              date: date,
              climate: reqObj
            });
          });
        });
    });
  }

  ngOnDestroy() {
    this.cityForecastSubscription.unsubscribe();
  }
}
