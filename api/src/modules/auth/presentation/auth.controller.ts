import { AuthService } from '@/modules/auth/domain/services/auth.service';
import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
