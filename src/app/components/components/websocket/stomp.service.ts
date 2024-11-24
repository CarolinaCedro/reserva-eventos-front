import {Injectable} from '@angular/core';
import {Stomp} from "@stomp/stompjs";
import SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class StompService {

  private stompClient: any;

  constructor() {}

  connect(webSocketEndPoint: string, topic: string, onMessage: Function): void {
    const socket = new SockJS(webSocketEndPoint);  // Certifique-se de que SockJS esteja corretamente importado
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe(topic, (message: any) => {
        onMessage(message);
      });
    }, this.onError);
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  }

  private onError(error: any): void {
    console.log('Error while connecting: ' + error);
    setTimeout(() => {
      console.log('Trying to reconnect...');
      // You can trigger a reconnect mechanism here if needed
    }, 3000);
  }
}
