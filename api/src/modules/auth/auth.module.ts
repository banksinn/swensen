import { Module } from '@nestjs/common';
import { JwtStrategy } from '@/modules/auth/domain/authentication/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from '@/modules/auth/presentation/auth.controller';
import { AuthService } from '@/modules/auth/domain/services/auth.service';
import { AllConfig } from '@/config/config.type';
import { UserService } from '@/modules/auth/user/domain/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/auth/user/domain/entities/user.entity';
import { UserRepository } from '@/modules/auth/user/infrastructure/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfig>) => ({
        secret: configService.get('auth.secret', { infer: true }),
      }),
    }),
  ],
  providers: [UserRepository, UserService, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
