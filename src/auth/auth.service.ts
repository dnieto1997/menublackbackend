import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from 'src/login/entities/login.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Login)
    private logiDashRepository: Repository<Login>,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { user, password } = createAuthDto;

    const existUser = await this.logiDashRepository.findOneBy({ user });

    if (!existUser) {
      throw new HttpException('User/Password Error', HttpStatus.CONFLICT);
    }

    const isPasswordValid = await compare(password, existUser.password);

    if (!isPasswordValid) {
      throw new HttpException('User/Password Error', HttpStatus.CONFLICT);
    }

    if (existUser.status == false) {
      throw new HttpException('Contact the administrator', HttpStatus.CONFLICT);
    }

    const data_user = {
      id: existUser.id,
      user: existUser.user,
      name: existUser.name,
      status: existUser.status,
    };

    const token = this.jwtService.sign(data_user);

    const data = {
      token,
      data_user,
    };
    return data;
  }

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
  }
}
