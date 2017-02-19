import io from 'socket.io';
import {LogManager} from 'aurelia-framework';
import $ from 'bootstrap';

export class ChatWindow {
  message = '';
  username = '';

  constructor() {
    this.logger = LogManager.getLogger('chat-window-element');
    this.username = this.randomString();
  }

  attached() {
    this.logger.debug('Attached...');
    this.socket = io('http://127.0.0.1:8081');

    this.socket.on('connect', () =>{
      this.logger.debug('Socket connected...');
    });

    this.socket.on('be-message', (data) => {
      this.logger.debug('Event with data', data);
      $(this.messages).append(
        this.createMessageDiv(
          data.message,
          data.username
        )
      );

    });

    this.socket.on('disconnect', () =>{
      this.logger.debug('Socket disconnected...');
    });
  }

  createMessageDiv(message, username) {
    return $('<div class="chat-message"><span class="username">'
                    + username + ':</span> ' + message + '</div>');
  }

  sendMessage() {
    this.socket.emit('fe-message', {
      message: this.message,
      username: this.username
    });
  }

  randomString() {
    const letrasDisponibles = `ABCDEFGHIJKLMNOPQRSTUVWXYZ
                      abcdefghijklmnopqrstuvwxyzÑñ0123456789`;
    let cadena = '';
    '1234567'.split('').forEach(() => {
      const pos = Math.floor(Math.random() * letrasDisponibles.length);
      cadena += letrasDisponibles.charAt(pos);
    });
    return cadena;
  }
}

