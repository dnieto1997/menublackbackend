import { Injectable } from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Slider } from './entities/slider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SlidersService {
  constructor(
    @InjectRepository(Slider)
    private SlidersRepository: Repository<Slider>,
  ) {}
  create(createSliderDto: CreateSliderDto) {
    const file = this.SlidersRepository.create(createSliderDto);
    this.SlidersRepository.save(file);

    return { status: 201, message: 'Image Created' };
  }

  async findAll() {
    const user = await this.SlidersRepository.find();
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} slider`;
  }

  update(id: number, updateSliderDto: UpdateSliderDto) {
    return `This action updates a #${id} slider`;
  }

  remove(id: number) {
    return `This action removes a #${id} slider`;
  }
}
