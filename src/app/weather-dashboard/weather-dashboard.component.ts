import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../weather.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  standalone: true,
  imports:[MatFormField,CommonModule,ReactiveFormsModule],
  styleUrl: './weather-dashboard.component.css'
})
export class WeatherDashboardComponent {
  public clima: any = {};
  weatherForm: FormGroup;
  city = new FormControl('',[Validators.required]);

constructor (private serviceGet: WeatherService, private formBuilder: FormBuilder){
  this.weatherForm = formBuilder.group({
    city: this.city
  })
}
getData() {
  const cityValue: string = this.city.value || ''; // Obtener el valor del FormControl y convertirlo a una cadena de texto
  this.serviceGet.getWeather(cityValue).subscribe(data => {
    this.clima = data;
  })
}
}
