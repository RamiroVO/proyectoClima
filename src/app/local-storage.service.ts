import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private localStorageKey = 'weatherData';
  private lastRequestKey = 'lastRequest';

  constructor() {}

  getAllCities(): any[] {
    const storedData = localStorage.getItem(this.localStorageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  addCity(city: any): void {
    const cities = this.getAllCities();
    cities.push(city);
    localStorage.setItem(this.localStorageKey, JSON.stringify(cities));
  }

  updateCity(index: number, updatedCity: any): void {
    const cities = this.getAllCities();
    cities[index] = updatedCity;
    localStorage.setItem(this.localStorageKey, JSON.stringify(cities));
  }

  deleteCity(index: number): void {
    const cities = this.getAllCities();
    cities.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(cities));
  }

  getLastRequest(): any {
    const lastRequestData = localStorage.getItem(this.lastRequestKey);
    return lastRequestData ? JSON.parse(lastRequestData) : null;
  }

  setLastRequest(request: any): void {
    localStorage.setItem(this.lastRequestKey, JSON.stringify(request));
  }

  clear(): void{
    localStorage.clear();
  }
}