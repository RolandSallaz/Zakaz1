import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { AuthService } from './auth.service';

@WebSocketGateway()
export class AuthGateway {
  constructor(private readonly authService: AuthService) {}

  @SubscribeMessage('checkEmailCode')
  checkEmailCode(@MessageBody() createAuthDto) {
   
  }
}
