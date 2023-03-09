import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  ngOnInit() {}

  // Fecha de la próxima carrera
  nextRaceDate: Date = new Date("Mar 19, 2023 18:00:00 GMT+02:00");

  // Variables para almacenar el tiempo restante
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor() {
    // Actualizar el tiempo restante cada segundo
    setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  // Función para actualizar el tiempo restante
  updateCountdown() {
    // Fecha actual
    const now = new Date();

    // Diferencia entre la fecha actual y la fecha de la próxima carrera
    const diff = this.nextRaceDate.getTime() - now.getTime();

    // Cálculo del tiempo restante
    this.days = Math.floor(diff / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((diff % (1000 * 60)) / 1000);
  }
}
