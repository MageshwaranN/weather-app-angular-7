import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit, OnDestroy, OnChanges {

  @Input() city: string;

  private cityDailyWeatherSubscription: Subscription;

  public cityWeather: string;
  public cityWeatherIcon: string;
  public cityTemperature: number;
  public cityMinimumTemperature: number;
  public cityMaximumTemperature: number;
  public cityHumidity: number;
  public cityWind: number;

  constructor(private _weatherSvc: WeatherService) { }

  ngOnInit() {
    this.cityDailyWeatherSubscription = this._weatherSvc.getWeatherCity(this.city)
      .subscribe((dailyWeather: any) => {
        this.cityWeather = dailyWeather.main;
        this.cityWeatherIcon =  dailyWeather.icon;
        this.cityTemperature =  dailyWeather.temperature.current;
        this.cityMinimumTemperature =  dailyWeather.temperature.min;
        this.cityMaximumTemperature =  dailyWeather.temperature.max;
        this.cityHumidity =  dailyWeather.humidity;
        this.cityWind =  dailyWeather.wind;
      });
  }

  ngOnChanges() { }

  ngOnDestroy() {
    this.cityDailyWeatherSubscription.unsubscribe();
  }

}
