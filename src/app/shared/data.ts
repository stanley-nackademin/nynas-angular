export interface WeatherData {
  time: string;
  description: string;
  temperature: string;
  wind: string;
}

export interface UpdatableTable {
  updateWeather(data: Array<WeatherData>);
  updateTrain(data: Array<any>);
}