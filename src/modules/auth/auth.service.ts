import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/application/services/user.service';
import { PasswordHashingService } from '../password_hashing/password_hashing.service';
import { User } from '../users/domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordHashingService: PasswordHashingService,
  ) {}

  async validateUser(email: string, plainTextPassword: string) : Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Not user founded with that email');
    }
    const isMatch = await this.passwordHashingService.comparePassword(plainTextPassword, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(user: User) {
    const payload  = {username: user.username, sub: user.id};

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
