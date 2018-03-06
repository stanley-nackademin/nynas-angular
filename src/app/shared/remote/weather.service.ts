import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UpdatableTable, WeatherData } from '../data';

const WEATHER_URL: string = 'https://api.openweathermap.org/data/2.5/forecast?q=nynashamn&units=metric&lang=se&appid=25fcb5ba7d564b1fc9bab65a004efa5e';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  refresh(table: UpdatableTable) {
    this.http.get(WEATHER_URL).subscribe(data => {
      var weatherResponse = this.parseWeather(data);
      table.updateWeather(weatherResponse);
    });
  }

  parseWeather(data: any): Array<WeatherData> {
    var weatherData = new Array<WeatherData>();
    var weatherList = data.list;

    for (let index = 0; index < 7; index++) {
      var time = weatherList[index].dt_txt;
      time = new Date(time).getHours() + ":00";
      if (time.length < 5) {
        time = 0 + time;
      }

      var wind = weatherList[index].wind.speed.toFixed(1);

      var temp = weatherList[index].main.temp.toFixed(1);

      var desc = weatherList[index].weather[0].description;
      desc = desc[0].toUpperCase() + desc.substr(1);

      weatherData.push({
        time: time,
        description: desc,
        temperature: temp,
        wind: wind
      });
    }

    return weatherData;
  }
}
