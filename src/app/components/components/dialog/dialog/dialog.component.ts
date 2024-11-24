import {Component, Inject, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {EventCard} from "../../../../app.component";
import {EventCardService} from "../../event-cards/services/event-card.service";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatDialogClose,
    NgIf
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  confirmationForm: FormGroup;
  timer: number = 30; // Exemplo de temporizador para a reserva
  intervalId: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventCardService,
    private fb: FormBuilder
  ) {
    // Criação do formulário
    this.confirmationForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]]
    });

    // Inicia o temporizador
    this.startTimer();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmReservation(): void {
    if (this.confirmationForm.valid) {
      const event = this.data.event; // Recupera o evento do modal
      this.eventService.reserveSlot(event); // Atualiza os slots
      this.dialogRef.close(this.confirmationForm.value); // Fecha o modal e envia os dados do formulário
    }
  }


  startTimer(): void {
    this.intervalId = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.intervalId); // Para o temporizador
        this.dialogRef.close(); // Fecha o diálogo ao expirar o tempo
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Garante que o temporizador será limpo ao destruir o componente
  }


  // Função para reservar um slot
  reserveSlot(event: EventCard) {
    console.log("clicando")
    this.eventService.reserveSlot(event);
  }


}
