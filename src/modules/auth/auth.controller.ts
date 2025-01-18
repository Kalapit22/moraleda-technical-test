import { Controller, Post, Body, UseGuards,Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../users/application/services/user.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { User } from '../users/domain/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @Post('login')
   public async login(@Body() loginDto:LoginDto){
      const user = await this.authService.validateUser(loginDto.email,loginDto.password);
      return await this.authService.login(user);
   }



  @ApiBearerAuth()
  @ApiOperation({ summary: 'Profile' })
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
