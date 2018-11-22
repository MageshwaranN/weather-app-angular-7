import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-summary-card',
  templateUrl: './weather-summary-card.component.html',
  styleUrls: ['./weather-summary-card.component.scss']
})
export class WeatherSummaryCardComponent implements OnInit {

  @Input() title = 'Weather Update';
  public cities = [
    'Amsterdam',
    'London',
    'Berlin',
    'Paris',
    'Budapest'
  ];

  constructor() { }

  ngOnInit() {
  }

}
