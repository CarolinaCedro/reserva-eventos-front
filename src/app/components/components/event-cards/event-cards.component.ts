import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {BehaviorSubject} from "rxjs";
import {EventCardService} from "./services/event-card.service";
import {EventCard} from "../../../app.component";


@Component({
  selector: 'app-event-cards',
  standalone: true,
  imports: [
    MatCard,
    NgForOf,
    NgClass,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardTitle,
    NgIf,
    DatePipe,
    MatCard,
    AsyncPipe
  ],
  templateUrl: './event-cards.component.html',
  styleUrl: './event-cards.component.scss'
})
export class EventCardsComponent implements OnInit {

  @Input() events: EventCard[] = [
    {id: '1', name: 'Evento A', date: new Date(), availableSlots: 5, isBeingReserved: false},
    {id: '2', name: 'Evento B', date: new Date(), availableSlots: 0, isBeingReserved: false},
    {id: '3', name: 'Evento C', date: new Date(), availableSlots: 3, isBeingReserved: false},
  ];

  events$ = new BehaviorSubject<EventCard[]>([]);

  constructor(private eventService: EventCardService) {
  }

  ngOnInit() {
    // Inicializando a lista de eventos mockados
    this.eventService.initializeEvents(this.events);

    // Assinando o fluxo de atualizações dos eventos
    this.eventService.getEvents().subscribe(events => {
      this.events$.next(events);
    });

    // Atualizando os eventos conforme as modificações
    this.eventService.eventUpdates$.subscribe(updatedEvent => {
      // Verifica se o evento não é null antes de acessar as propriedades
      if (updatedEvent !== null && "id" in updatedEvent) {
        const events = this.events$.getValue().map(event =>
          event.id === updatedEvent.id ? updatedEvent : event
        );
        // Atualiza o estado com os eventos modificados
        this.events$.next(events);
      }
    });

  }


}
