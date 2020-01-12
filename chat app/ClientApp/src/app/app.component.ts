import { Component, NgZone } from '@angular/core';
import { Message } from '../models/Message';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ClientApp';
  txtMessage: string = '';
  uniqueID: string = new Date().getTime().toString();
  messages = new Array<Message>();
  message = new Message();
  constructor(
    private chatService: ChatService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
  }
  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.ClientUniqueId = this.uniqueID;
      this.message.Type = "sent";
      this.message.message = this.txtMessage;
      this.message.Date = new Date();
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }
  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      console.log('messages updated', this.messages);
      this._ngZone.run(() => {
        if (message.ClientUniqueId !== this.uniqueID) {
          message.Type = "received";
          this.messages.push(message);
        }
      });
    });
  }
}  