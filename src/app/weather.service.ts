import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '7c6c9eba55msh197323aeda2e661p19feb6jsn98c9e2d64630';
  private apiHost = 'open-weather13.p.rapidapi.com'
  private apiUrl = 'https://open-weather13.p.rapidapi.com/city/';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': this.apiHost
    });

       return this.http.get(`${this.apiUrl}${city}/ES`, { headers });
  }
}