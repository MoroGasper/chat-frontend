import io from 'socket.io';
import {LogManager} from 'aurelia-framework';

export class ChatWindow {
  message = '';

  constructor() {
    this.logger = LogManager.getLogger('chat-window-element');
  }

  attached() {
    this.logger.debug('Attached...');
    this.socket = io('http://127.0.0.1:8081');

    this.socket.on('connect', () =>{
      this.logger.debug('Socket connected...');
    });

    this.socket.on('be-message', (data) => {
      this.logger.debug(`Event with data: ${data}`);
    });

    this.socket.on('disconnect', () =>{
      this.logger.debug('Socket disconnected...');
    });
  }

  sendMessage() {
    this.socket.emit('fe-message', {
      message: this.message
    });
  }
}

