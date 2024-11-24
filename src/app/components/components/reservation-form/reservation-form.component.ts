import {Component} from '@angular/core';
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatFormField,
    MatInput,
    FormsModule,
    MatButton
  ],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss'
})
export class ReservationFormComponent {
  reservation = {name: '', phone: ''};

  confirmReservation() {
    console.log('Reserva confirmada:', this.reservation);
  }

}
