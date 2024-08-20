import { Injectable } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
export class WebSocketService {

    @WebSocketServer()
    private server: Server;

    handleConnection(client: Socket, ...args: any[]){
        console.log(client);
    }

    @SubscribeMessage('identity')
    async identity(): Promise<any> {
      return '';
    }

}
