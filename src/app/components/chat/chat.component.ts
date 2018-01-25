import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  message: string;
  elem: any;

  constructor( public _chatService: ChatService ) {
    this.message = '';
    this._chatService.loadMessages().subscribe( () => {
      setTimeout( () => {
        this.elem.scrollTop = this.elem.scrollHeight;
      }, 20);
    });
  }

  ngOnInit() {
    this.elem = document.getElementById('app-mensajes');
  }

  sendMessage() {
    if (this.message.length === 0) {
      return;
    }
    this._chatService.addMessage(this.message).then( () => {
      this.message = '';
      // console.log('Message send it!');
    })
    .catch( (err) => {
      console.log('Error sending message ', err);
    });
  }

}
