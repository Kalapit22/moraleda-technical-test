import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { PasswordHashingService } from '../password_hashing/password_hashing.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';




@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService:ConfigService) => ({
                secret: configService.get('JWT_SECRET') || 'secretkey',
                signOptions: { expiresIn: '3600s' },
            }),
            inject: [ConfigService]
        }),
        UserModule
    ],
    providers: [AuthService,JwtStrategy,PasswordHashingService],
    exports: [AuthService,JwtModule,PassportModule],
    controllers: [AuthController]
})
export class AuthModule{}