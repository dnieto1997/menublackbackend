import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { UpdateStatusVariantDto } from 'src/variantes/dto/update-status.dto';

@Injectable()
export class ClientService {
  constructor(@InjectRepository(Client) private Client: Repository<Client>) {}
  async create(createClientDto: CreateClientDto) {
    const existId = await this.Client.findOneBy({
      celular: createClientDto.celular,
    });
    if (existId) {
      throw new HttpException('Telefono ya existe', HttpStatus.CONFLICT);
    }

    const Client = this.Client.create({
      nombres: createClientDto.nombres,
      apellidos: createClientDto.apellidos,
      celular: createClientDto.celular,
      direccion: createClientDto.direccion,
      barrio: createClientDto.barrio,
      medioDePago: createClientDto.medioDePago,
      observaciones: createClientDto.observaciones,
    });
    this.Client.save(Client);

    return { status: 201, message: 'Client Created' };
  }

  async findAll() {
    const user = await this.Client.find();
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const existUser = await this.Client.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = await this.Client.preload({
      id: id,
      nombres: updateClientDto.nombres,
      apellidos: updateClientDto.apellidos,
      celular: updateClientDto.celular,
      direccion: updateClientDto.direccion,
      barrio: updateClientDto.barrio,
      medioDePago: updateClientDto.medioDePago,
      observaciones: updateClientDto.observaciones,
    });

    const saveUser2 = await this.Client.save(updateUser);

    return { status: 201, message: 'Client Updated', data: saveUser2 };
  }

  async updateUser(id: number, updateProductDto: UpdateStatusVariantDto) {
    const existUser = await this.Client.findOneBy({
      id: id,
    });

    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateProductDto.status !== undefined) {
      existUser.status = !updateProductDto.status;
    }

    return await this.Client.save(existUser);
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
