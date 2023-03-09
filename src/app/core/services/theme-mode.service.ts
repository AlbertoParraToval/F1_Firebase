import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeModeService {

  darkMode = false;

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.toggleDarkMode(prefersDark.matches);
  }

  toggleDarkMode(value: boolean = null) {
    if (value !== null) {
      this.darkMode = value;
    } else {
      this.darkMode = !this.darkMode;
    }
    document.body.classList.toggle('dark', this.darkMode);
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }
}