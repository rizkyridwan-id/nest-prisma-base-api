import { Body, Controller, Post } from '@nestjs/common';
import { SecureGet } from 'src/core/decorator/secure-get.decorator';
import { AuthService } from './auth.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { LoginRequestDto } from './dto/login-user-request.dto';
@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() body: CreateUserRequestDto) {
    return this.authService.createUser({ data: body });
  }

  @Post('login')
  async loginUser(@Body() body: LoginRequestDto) {
    return this.authService.loginUser({ data: body });
  }

  @SecureGet('users')
  async getUser() {
    return this.authService.getUser();
  }
}
