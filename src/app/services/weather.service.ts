import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { apiDetails, weatherJson } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private APIDETAILS = apiDetails;
  private WEATHERJSON = weatherJson;

  constructor(private _http: HttpClient) { }

  getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSubject = new Subject<string>();
    this._http.get(
      `${this.APIDETAILS.url}/weather?q=${city}&units=${metric}&APPID=${this.APIDETAILS.id}`)
      .subscribe((data) => {
        dataSubject.next(data['weather'][0].main);
      }, (err) => {
        console.log(err);
      });
    return dataSubject;
  }

  getCityWeatherIconByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSubject = new Subject<string>();
    this._http.get(
      `${this.APIDETAILS.url}/weather?q=${city}&units=${metric}&APPID=${this.APIDETAILS.id}`)
      .subscribe((data) => {
        const date = new Date();
        const sunrise = new Date(data['sys'].sunrise * 1000); // Convert a Unix timestamp to time
        const sunset = new Date(data['sys'].sunset * 1000);
        let weatherIconID: string;
        const icon = this.WEATHERJSON[data['weather'][0].id].icon;

        /* Get suitable icon for weather */
        if (date.getHours() >= sunrise.getHours() && date.getHours() < sunset.getHours()) {
          weatherIconID = `wi wi-day-${icon}`;
        } else if (date.getHours() >= sunset.getHours()  || date.getHours() < sunrise.getHours()) {
          weatherIconID = `wi wi-night-${icon}`;
        }
        dataSubject.next(weatherIconID);
      }, (err) => {
        console.log(err);
      });
    return dataSubject;
  }

  getCurrentTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this._http.get(
      `${this.APIDETAILS.url}/weather?q=${city}&units=${metric}&APPID=${this.APIDETAILS.id}`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp)));
      });
    return dataSubject;
  }


  getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this._http.get(
      `${this.APIDETAILS.url}/weather?q=${city}&units=${metric}&APPID=${this.APIDETAILS.id}`)
      .subscribe((weather: any) => {
        dataSubject.next(weather.main.humidity);
      });
    return dataSubject;
  }


  getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    this._http.get(
      `${this.APIDETAILS.url}/weather?q=${city}&units=${metric}&APPID=${this.APIDETAILS.id}`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Math.round(weather.wind.speed)));
      });
    return dataSubject;
  }


  getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    let max: number;
    this._http.get(
      `${this.APIDETAILS.url}/forecast?q=${city}&units=${metric}&APPID=${this.APIDETAILS.id}`)
      .subscribe((weather: any) => {
        max = weather.list[0].main.temp;
        weather.list.forEach((value) => {
          if (max < value.main.temp) {
            max = value.main.temp;
          }
        });
        dataSubject.next(Math.round(max));
      });
    return dataSubject;
  }

  getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    let min: number;
    this._http.get(
      `${this.APIDETAILS.url}/forecast?q=${city}&units=${metric}&APPID=${this.APIDETAILS.id}`)
      .subscribe((weather: any) => {
        min = weather.list[0].main.temp;
        weather.list.forEach((value) => {
          if (min > value.main.temp) {
            min = value.main.temp;
          }
        });
        dataSubject.next(Math.round(min));
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
