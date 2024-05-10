import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { Repository } from 'typeorm';
import { UpdateStatus } from './dto/updatestatus.dto';
import { hash } from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login) private logiDashRepository: Repository<Login>,
  ) {}

  async create(createLoginDashDto: CreateLoginDto) {
    const { user } = createLoginDashDto;

    const existUser = await this.logiDashRepository.findOneBy({ user });

    if (existUser) {
      throw new HttpException('User does not exist', HttpStatus.CONFLICT);
    }

    const newUser = this.logiDashRepository.create(createLoginDashDto);
    const saveUser = await this.logiDashRepository.save(newUser);

    return saveUser;
  }

  async findAll() {
    const user = await this.logiDashRepository.find();
    return user;
  }

  async findOne(id: number) {
    const existUser = await this.logiDashRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('User does not exist', HttpStatus.CONFLICT);
    }

    return existUser;
  }

  async updatestatus(id: number, updateLoginDashDto: UpdateStatus) {
    const existUser = await this.logiDashRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Actualiza el estado del usuario solo si se proporciona un nuevo estado
    if (updateLoginDashDto.status !== undefined) {
      existUser.status = !updateLoginDashDto.status;
    }

    return await this.logiDashRepository.save(existUser);
  }

  async update(id: number, updateLoginDashDto: UpdateLoginDto) {
    const existUser = await this.logiDashRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateLoginDashDto.user) {
      existUser.user = updateLoginDashDto.user;
    }

    // Actualizar el campo name si se proporciona en updateLoginDashDto
    if (updateLoginDashDto.name) {
      existUser.name = updateLoginDashDto.name;
    }

    if (updateLoginDashDto.password) {
      existUser.password = await hash(
        updateLoginDashDto.password,
        Number(process.env.HASH_SALT),
      );
    }

    // Guardar los cambios en la base de datos
    await this.logiDashRepository.save(existUser);

    return await this.logiDashRepository.save(existUser);
  }

  async remove(id: number) {
    const existUser = await this.logiDashRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('User does not exist', HttpStatus.CONFLICT);
    }

    let status = true;

    if (existUser.status == true) {
      status = false;
    } else {
      status = true;
    }
    const updateUser = await this.logiDashRepository.preload({
      id: id,
      status: status,
    });

    return await this.logiDashRepository.save(updateUser);
  }
}
