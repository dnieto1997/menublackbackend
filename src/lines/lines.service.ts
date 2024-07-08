import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';
import { Line } from './entities/line.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStatusLineDto } from './dto/update-status.dto';
import { Group } from 'src/group/entities/group.entity';
import { Product } from 'src/products/entities/product.entity';
import { Variante } from 'src/variantes/entities/variante.entity';

@Injectable()
export class LinesService {
  constructor(
    @InjectRepository(Line) private lineDashRepository: Repository<Line>,
    @InjectRepository(Group) private Group: Repository<Group>,
    @InjectRepository(Product)
    private productDashRepository: Repository<Product>,
    @InjectRepository(Variante)
    private varianttDashRepository: Repository<Variante>,
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

  async searchgroup(id: number) {
    const existUser = await this.lineDashRepository.find({
      where: { group: id },
    });

    if (!existUser) {
      throw new HttpException('Group does not exist', HttpStatus.CONFLICT);
    }

    return existUser;
  }

  async search(id: number, id2?: number) {
    const arr = [];

    let lineasQuery = this.lineDashRepository
      .createQueryBuilder('lineas_app')
      .select(['lineas_app.*'])
      .innerJoin(Group, 'g', 'g.id = lineas_app.group')
      .where('lineas_app.group = :id', { id })
      .andWhere('lineas_app.status = 1')
      .orderBy('lineas_app.position', 'ASC');

    if (id2) {
      lineasQuery = lineasQuery.andWhere('lineas_app.code = :id2', { id2 });
    }

    const lineas = await lineasQuery.getRawMany();

    for (const row2 of lineas) {
      const arr2 = [];

      const productos = await this.productDashRepository.find({
        where: { status: true, lines: row2.id },
        order: { price: 'ASC' },
      });

      for (const row of productos) {
        arr2.push({
          id: row.id,
          img: row.img,
          code: row.code,
          group: row.group,
          lines: row.lines,
          name: row.name,
          price: row.price,
          stars: row.stars,
          new: row.new == true ? 'SI' : 'NO',
          promotion: row.promotion == true ? 'SI' : 'NO',
          observation: row.observation,
        });
      }

      arr.push({
        nombre: row2.name,
        descripcion: row2.observations,
        productos: arr2,
      });
    }

    return arr;
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
