import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';
import { Line } from './entities/line.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStatusLineDto } from './dto/update-status.dto';

@Injectable()
export class LinesService {
  constructor(
    @InjectRepository(Line) private lineDashRepository: Repository<Line>,
  ) {}
  create(createLineDto: CreateLineDto) {
    const newGroup = this.lineDashRepository.create({
      position: createLineDto.position,
      group: createLineDto.group,
      name: createLineDto.name,
      code: createLineDto.code,
      img: createLineDto.img,
      observation: createLineDto.observations,
    });
    this.lineDashRepository.save(newGroup);

    return { status: 201, message: 'Line Created' };
  }

  async findAll() {
    const user = await this.lineDashRepository.find();
    return user;
  }

  async updateStatus(id: number, updateGroupDto: UpdateStatusLineDto) {
    const existUser = await this.lineDashRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Line not found', HttpStatus.NOT_FOUND);
    }

    if (updateGroupDto.status !== undefined) {
      existUser.status = !updateGroupDto.status;
    }

    return await this.lineDashRepository.save(existUser);
  }

  async findOne(id: number) {
    const existUser = await this.lineDashRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Group does not exist', HttpStatus.CONFLICT);
    }

    return existUser;
  }

  async update(id: number, updateLineDto: UpdateLineDto) {
    const existUser = await this.lineDashRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = await this.lineDashRepository.preload({
      id: id,
      img: updateLineDto.img,
      code: updateLineDto.code,
      position: updateLineDto.position,
      name: updateLineDto.name,
      group: updateLineDto.group,
      observation: updateLineDto.observations,
    });

    const saveUser2 = await this.lineDashRepository.save(updateUser);

    return { status: 201, message: 'updated line', data: saveUser2 };
  }

  async remove(id: number) {
    const existUser = await this.lineDashRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Group does not exist', HttpStatus.NOT_FOUND);
    }

    await this.lineDashRepository.delete(id);

    return {
      message: 'Line deleted successfully',
    };
  }
}
