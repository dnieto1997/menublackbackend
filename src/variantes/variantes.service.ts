import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVarianteDto } from './dto/create-variante.dto';
import { UpdateVarianteDto } from './dto/update-variante.dto';
import { Variante } from './entities/variante.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStatusVariantDto } from './dto/update-status.dto';

@Injectable()
export class VariantesService {
  constructor(
    @InjectRepository(Variante)
    private VarianteRepository: Repository<Variante>,
  ) {}
  create(createVarianteDto: CreateVarianteDto) {
    const newVariante = this.VarianteRepository.create({
      name: createVarianteDto.name,
      cost: createVarianteDto.cost,
    });
    this.VarianteRepository.save(newVariante);

    return { status: 201, message: 'Variant Created' };
  }

  async findAll() {
    const user = await this.VarianteRepository.find();
    return user;
  }

  async findOne(id: number) {
    const existUser = await this.VarianteRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Variant does not exist', HttpStatus.CONFLICT);
    }

    return existUser;
  }

  async updateUser(id: number, updateProductDto: UpdateStatusVariantDto) {
    const existUser = await this.VarianteRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateProductDto.status !== undefined) {
      existUser.status = !updateProductDto.status;
    }

    return await this.VarianteRepository.save(existUser);
  }

  async update(id: number, updateVarianteDto: UpdateVarianteDto) {
    const existUser = await this.VarianteRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = await this.VarianteRepository.preload({
      id: id,
      name: updateVarianteDto.name,
      cost: updateVarianteDto.cost,
    });

    const saveUser2 = await this.VarianteRepository.save(updateUser);

    return { status: 201, message: 'Variant Updated', data: saveUser2 };
  }

  remove(id: number) {
    return `This action removes a #${id} variante`;
  }
}
