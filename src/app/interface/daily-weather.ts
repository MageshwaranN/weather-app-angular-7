export interface DailyWeather {
  main: string;
  icon: string;
  humidity: number;
  wind: number;
  temperature: Temperature;
}

export interface Temperature {
  current: number;
  min: number;
  max: number;
}
