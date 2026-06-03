# live-feed.gateway.ts

import {
WebSocketGateway,
WebSocketServer,
SubscribeMessage,
OnGatewayInit,
OnGatewayConnection,
OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from '[socket.io](http://socket.io/)';

@WebSocketGateway({
cors: {
origin: '*',
methods: ['GET', 'POST'],
},
})
export class LiveFeedGateway
implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
@WebSocketServer()
server: Server;

afterInit(server: Server) {
console.log('WebSocket Server Initialized');
}

handleConnection(client: Socket) {
const { creatorId } = client.handshake.query;
if (creatorId) client.join(`creator:${creatorId}`);
console.log(`Client connected to creator:${creatorId}`);
}

handleDisconnect(client: Socket) {
console.log('Client disconnected');
}

// Optional for manual testing
@SubscribeMessage('ping')
handlePing(client: Socket): string {
return 'pong';
}

broadcastTip(creatorId: string, tip: any) {
[this.server.to](http://this.server.to/)(`creator:${creatorId}`).emit('tip', tip);
}
}