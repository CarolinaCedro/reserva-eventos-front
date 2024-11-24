import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {EventCard} from "../../../../app.component";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EventCardService {

  private apiUrl = 'http://localhost:8080/api/eventos-concorrentes/evento'; // URL corrigido
  private eventsSubject = new BehaviorSubject<EventCard[]>([]);

  constructor(private http: HttpClient) {}

  // Busca todos os eventos
  getEvents(): Observable<EventCard[]> {
    return this.http.get<EventCard[]>(this.apiUrl);
  }

  // Atualiza um evento específico
  updateEvent(event: EventCard): Observable<EventCard> {
    return this.http.put<EventCard>(`${this.apiUrl}/${event.id}`, event);
  }

  // Reserva um slot em um evento
  reserveSlot(event: EventCard): Observable<EventCard> {
    return this.http.post<EventCard>(`${this.apiUrl}/${event.id}/reserve`, {});
  }

  // Emite atualizações dos eventos
  initializeEvents(events: EventCard[]) {
    this.eventsSubject.next(events);
  }

  get eventUpdates$(): Observable<EventCard[]> {
    return this.eventsSubject.asObservable();
  }
}
