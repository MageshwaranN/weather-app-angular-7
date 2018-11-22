import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';
import { NgSwitchDefault } from '@angular/common';


@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit, OnDestroy, OnChanges {

  @Input() city: string;

  private cityWeatherSubscription: Subscription;
  private cityWeatherIconSubscription: Subscription;
  private cityTemperatureSubscription: Subscription;
  private cityMinimumTemperatureSubscription: Subscription;
  private cityMaximumTemperatureSubscription: Subscription;
  private cityHumiditySubscription: Subscription;
  private cityWindSubscription: Subscription;

  public cityWeather: string;
  public cityWeatherIcon: string;
  public cityTemperature: number;
  public cityMinimumTemperature: number;
  public cityMaximumTemperature: number;
  public cityHumidity: number;
  public cityWind: number;

  constructor(private _weatherSvc: WeatherService) { }

  ngOnInit() {
    this.cityWeatherSubscription = this._weatherSvc.getCityWeatherByName(this.city)
      .subscribe((state) => {
        this.cityWeather = state;
      });
    this.cityWeatherIconSubscription = this._weatherSvc.getCityWeatherIconByName(this.city)
      .subscribe((icon) => {
        this.cityWeatherIcon = icon;
      });
    this.cityTemperatureSubscription = this._weatherSvc.getCurrentTemp(this.city)
    .subscribe((temperature) => {
      this.cityTemperature = temperature;
    });
    this.cityMinimumTemperatureSubscription = this._weatherSvc.getMinTemp(this.city)
    .subscribe((minTemperature) => {
      this.cityMinimumTemperature = minTemperature;
    });
    this.cityMaximumTemperatureSubscription = this._weatherSvc.getMaxTemp(this.city)
    .subscribe((maxTemperature) => {
      this.cityMaximumTemperature = maxTemperature;
    });
    this.cityHumiditySubscription = this._weatherSvc.getCurrentHum(this.city)
      .subscribe((humidity) => {
        this.cityHumidity = humidity;
      });
    this.cityWindSubscription = this._weatherSvc.getCurrentWind(this.city)
    .subscribe((windspeed) => {
      this.cityWind = windspeed;
    });
  }

  ngOnChanges() { }

  ngOnDestroy() {
    this.cityWeatherSubscription.unsubscribe();
    this.cityWeatherIconSubscription.unsubscribe();
    this.cityTemperatureSubscription.unsubscribe();
    this.cityMinimumTemperatureSubscription.unsubscribe();
    this.cityMaximumTemperatureSubscription.unsubscribe();
    this.cityHumiditySubscription.unsubscribe();
    this.cityWindSubscription.unsubscribe();
  }

}
