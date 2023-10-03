import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessageResponseDTO } from 'src/core/base/message-response-dto.base';
import { BaseUseCase, IUseCasePayload } from 'src/core/base/use-case.base';
import { HashService } from 'src/core/helper/modules/hash.service';
import { PrismaService } from 'src/core/helper/modules/prisma.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { LoginRequestDto } from './dto/login-user-request.dto';

@Injectable()
export class AuthService extends BaseUseCase {
  constructor(
    readonly prisma: PrismaService,
    readonly hash: HashService,
    readonly jwtService: JwtService,
  ) {
    super();
  }

  async createUser(payload: IUseCasePayload<CreateUserRequestDto>) {
    const { data } = payload;

    const userExist = await this.prisma.tm_user.findFirst({
      where: {
        user_id: data.user_id,
      },
    });
    if (userExist) {
      this.logger.error('User Conflicted');
      throw new ConflictException('UserId telah terdaftar.');
    }

    const passwordHashed = await this.hash.generate(data.password);

    await this.prisma.tm_user.create({
      data: {
        user_id: data.user_id,
        user_name: data.user_name,
        password: passwordHashed,
      },
    });

    return new MessageResponseDTO('Berhasil Membuat User');
  }

  async loginUser(payload: IUseCasePayload<LoginRequestDto>) {
    const { data } = payload;
    const user = await this.prisma.tm_user.findFirst({
      where: { user_id: data.user_id },
    });

    if (!user) {
      throw new UnauthorizedException('Username atau password salah.');
    }

    const passwordMatch = await this.hash.compare(data.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Username atau Password Salah.');
    }

    const jwtPayload = {
      sub: user.user_id,
    };
    return {
      access_token: this.jwtService.sign(jwtPayload),
    };
  }

  async getUser() {
    return this.prisma.tm_user.findMany({
      select: {
        id: true,
        user_id: true,
        user_name: true,
      },
    });
  }
}
