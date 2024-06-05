import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { UpdateStatusGroupDto } from './dto/update-status.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupDashRepository: Repository<Group>,
  ) {}
  async create(createGroupDto: CreateGroupDto) {
    const newGroup = this.groupDashRepository.create({
      img: createGroupDto.img,
      code: createGroupDto.code,
      order: createGroupDto.order,
      name: createGroupDto.name,
      days: JSON.stringify(createGroupDto.days),
      hours: JSON.stringify(createGroupDto.hours),
      observations: createGroupDto.observations,
    });
    this.groupDashRepository.save(newGroup);

    return { status: 201, message: 'Group Created' };
  }

  async findAll() {
    const user = await this.groupDashRepository.find();
    return user;
  }

  async Groups() {
    const user = await this.groupDashRepository.find({
      select: ['img', 'code', 'name'],
      where: { status: true },
      order: { order: 'asc' },
    });
    return user;
  }

  async findOne(id: number) {
    const existUser = await this.groupDashRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Group does not exist', HttpStatus.CONFLICT);
    }

    return existUser;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const existUser = await this.groupDashRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = await this.groupDashRepository.preload({
      id: id,
      img: updateGroupDto.img,
      code: updateGroupDto.code,
      order: updateGroupDto.order,
      name: updateGroupDto.name,
      days: JSON.stringify(updateGroupDto.days),
      hours: JSON.stringify(updateGroupDto.hours),
      observations: updateGroupDto.observations,
    });

    const saveUser2 = await this.groupDashRepository.save(updateUser);

    return { status: 201, message: 'Group Actualizado', data: saveUser2 };
  }

  async updateStatus(id: number, updateGroupDto: UpdateStatusGroupDto) {
    const existUser = await this.groupDashRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateGroupDto.status !== undefined) {
      existUser.status = !updateGroupDto.status;
    }

    return await this.groupDashRepository.save(existUser);
  }

  async remove(id: number) {
    const existUser = await this.groupDashRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Group does not exist', HttpStatus.NOT_FOUND);
    }

    await this.groupDashRepository.delete(id);

    return {
      message: 'Group deleted successfully',
    };
  }
}
