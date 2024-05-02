import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../weather.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  standalone: true,
  imports:[MatFormField,CommonModule,ReactiveFormsModule],
  styleUrl: './weather-dashboard.component.css'
})
export class WeatherDashboardComponent implements OnInit{
  public clima: any = {};
  weatherForm: FormGroup;
  city = new FormControl('',[Validators.required]);
  weatherData: any [] = [];
  lastRequest: any;

constructor (private serviceGet: WeatherService, private formBuilder: FormBuilder, 
  private localStorageService: LocalStorageService){
  this.weatherForm = formBuilder.group({
    city: this.city
  })
}

ngOnInit(): void {
  //this.weatherData = this.localStorageService.getAllCities();
  this.lastRequest = this.localStorageService.getLastRequest();
}

getData() {
  const cityValue: string = this.weatherForm.get('city')?.value || '';
  this.serviceGet.getWeather(cityValue).subscribe(data => {
    const weatherData = {
      city: data.name,
      main: data.weather[0].main,
      description: data.weather[0].description,
      temperature: data.main.temp,
      humidity: data.main.humidity
      };
      this.weatherData.push(weatherData);
      this.localStorageService.addCity(weatherData);
      console.log(this.weatherData);
  },
  (error: any) => {
    console.error('Error al obtener los datos meteorológicos:', error);
  }
);
}


addData() {
  const cityValue: string = this.weatherForm.get('city')?.value || '';
  const city = { name: cityValue };
  this.weatherData.push(city);
  this.localStorageService.addCity(city);
  this.weatherForm.reset();
}

updateData(index: number, updatedCity: any) {
  this.weatherData[index] = updatedCity;
  this.localStorageService.updateCity(index, updatedCity);
}

deleteData(index: number) {
  this.weatherData.splice(index, 1);
  this.localStorageService.deleteCity(index);
}

}
