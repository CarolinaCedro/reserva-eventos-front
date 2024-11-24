import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule, MatCardTitle} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./components/components/dialog/dialog/dialog.component";
import {BehaviorSubject} from "rxjs";
import {EventCardService} from "./components/components/event-cards/services/event-card.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {StompService} from "./components/components/websocket/stomp.service";


export interface EventCard {
  id: string;
  nome: string;
  date: Date;
  vagasDisponiveis: number;
  isBeingReserved: boolean;
}




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, MatCardTitle, HttpClientModule, MatLabel, NgForOf, NgIf, MatIconModule, MatCardModule, MatListModule, NgClass, MatLineModule, MatButton, ReactiveFormsModule, MatFormField, MatInput],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit,OnDestroy {

  totalUsersOnline = 0;
  maxConcurrentUsers = 10;
  availableSlots = 10;
  events: EventCard[] = [];
  queue: { sessionId: string; timer: number }[] = [];

  readonly dialog = inject(MatDialog);

  events$ = new BehaviorSubject<EventCard[]>([]);

  items: any[] = [];



  selectedEvent: any = null; // Evento selecionado pelo usuário
  confirmationForm: FormGroup;
  timer = 30; // Timer de 30 segundos para confirmação de reserva
  intervalId: any; // Interval para o contador

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private stompService: StompService,
              private eventService: EventCardService
  ) {
    // Inicializando o formulário de confirmação
    this.confirmationForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]]
    });
  }

  ngOnInit(): void {

    this.stompService.connect(
      'http://localhost:8080/socket',
      '/statusProcessor',
      (message: any) => this.onMessage(message)
    );



    // Busca os eventos do backend
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });

    // Preenche a fila fictícia
    this.populateQueue();
  }

  start() {
    this.http.put('http://localhost:8080/api', {})
      .subscribe(response => console.log(response));
  }

  onMessage(message: any): void {
    this.items.push(message.body);
  }

  populateQueue() {
    for (let i = 1; i <= 15; i++) {
      this.queue.push({sessionId: `User${i}`, timer: 30});
    }
  }

  reserveSlot(event: EventCard) {

  }


  // Simula o número de usuários online
  simulateUsersOnline() {
    setTimeout(() => {
      this.totalUsersOnline = Math.floor(Math.random() * 20) + 1; // Número aleatório de 1 a 20
    }, 3000);
  }

  // Preenche a fila com sessões fictícias


  // Método para reservar um evento
  reserveEvent(event: any) {
    if (event.availableSlots > 0) {
      this.selectedEvent = event;
      this.startTimer();
    } else {
      alert('Este evento está sem vagas disponíveis.');
    }
  }

  // reserveSlot(event: EventCard) {
  //   console.log("clicando")
  //   this.eventService.reserveSlot(event);
  // }


  openDialog(event: EventCard): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {event} // Passa o evento completo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dados da reserva:', result);
        // Atualizar a lista de eventos aqui, se necessário
      }
    });
  }


  // Confirma a reserva
  confirmReservation() {
    if (this.confirmationForm.valid) {
      const formData = this.confirmationForm.value;

      // Reduz o número de vagas disponíveis no evento
      this.selectedEvent.availableSlots--;
      this.availableSlots--;
      alert(`Reserva confirmada para ${formData.name} no evento "${this.selectedEvent.name}"`);
      this.resetConfirmation();
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  // Cancela a reserva
  cancelReservation() {
    alert('Reserva cancelada.');
    this.resetConfirmation();
  }

  // Reseta o estado de confirmação
  resetConfirmation() {
    this.selectedEvent = null;
    this.confirmationForm.reset();
    this.stopTimer();
    this.timer = 30;
  }

  // Inicia o timer para confirmação de reserva
  startTimer() {
    this.stopTimer(); // Certifica-se de que nenhum outro timer está rodando
    this.intervalId = setTimeout(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.cancelReservation();
      }
    }, 1000);
  }

  // Para o timer
  stopTimer() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }


  ngOnDestroy() {
    // Fechar a conexão ao WebSocket ao destruir o componente
    this.stompService.disconnect();
  }

}
