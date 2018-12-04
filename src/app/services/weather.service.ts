import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { apiDetails, weatherJson } from '../../environments/environment';
import { DailyWeather } from '../interface/daily-weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private APIDETAILS = apiDetails;
  private WEATHERJSON = weatherJson;
  private dailyWeather: DailyWeather = {
    main: '',
    icon: '',
    humidity: 0,
    wind: 0,
    temperature: {
      max: 0,
      min: 0,
      current: 0
    }
  };

  constructor(private _http: HttpClient) { }

  getWeatherCity(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSubject = new Subject<string>();
    this._http.get(
      `${this.APIDETAILS.url}/weather?q=${city}&units=${metric}&APPID=${this.APIDETAILS.id}`)
      .subscribe((data) => {
        // main weather
        this.dailyWeather.main = data['weather'][0].main;
        // set weather Icon
        const date = new Date();
        const sunrise = new Date(data['sys'].sunrise * 1000); // Convert a Unix timestamp to time
        const sunset = new Date(data['sys'].sunset * 1000);
        const icon = this.WEATHERJSON[data['weather'][0].id].icon;

        /* Get suitable icon for weather */
        if (date.getHours() >= sunrise.getHours() && date.getHours() < sunset.getHours()) {
          this.dailyWeather.icon = `wi wi-day-${icon}`;
        } else if (date.getHours() >= sunset.getHours()  || date.getHours() < sunrise.getHours()) {
          this.dailyWeather.icon = `wi wi-night-${icon}`;
        }
        // get current temperature
        this.dailyWeather.temperature.current = Math.round(Number(data['main'].temp));
        // get current humidity
        this.dailyWeather.humidity = Math.round(Number(data['main'].humidity));
        // get current wind speed
        this.dailyWeather.wind = Math.round(Number(data['wind'].speed));
        // get max temperature
        this.dailyWeather.temperature.max = Math.round(Number(data['main'].temp_max));
        // get min temperature
        this.dailyWeather.temperature.min = Math.round(Number(data['main'].temp_min));
        dataSubject.next(this.dailyWeather as any);
      }, (err) => {
        console.log(err);
      });
    return dataSubject;
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>>  {
    const dataSubject = new Subject<Array<any>>();
    this._http.get(
      `${this.APIDETAILS.url}/forecast?q=${city}&units=${metric}&APPID=${this.APIDETAILS.id}`)
      .subscribe((weather: any) => {
        dataSubject.next(weather.list);
      });
    return dataSubject;
  }
}
