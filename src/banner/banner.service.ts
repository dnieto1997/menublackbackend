import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStatusBannerDto } from './dto/update-status.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private BannerRepository: Repository<Banner>,
  ) {}
  create(createBannerDto: CreateBannerDto) {
    const newBanner = this.BannerRepository.create({
      img: createBannerDto.img,
      lines: createBannerDto.line,
    });
    this.BannerRepository.save(newBanner);

    return { status: 201, message: 'Banner Created' };
  }

  async findAll() {
    const user = await this.BannerRepository.find();
    return user;
  }

  async findOne(id: number) {
    const existUser = await this.BannerRepository.findOneBy({
      id: id,
    });

    if (!existUser) {
      throw new HttpException(
        'Product Variant does not exist',
        HttpStatus.CONFLICT,
      );
    }

    return existUser;
  }

  async update(id: number, updateBannerDto: UpdateBannerDto) {
    const existUser = await this.BannerRepository.findOneBy({
      id: id,
    });

    if (!existUser) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = await this.BannerRepository.preload({
      id: id,
      img: updateBannerDto.img,
      lines: updateBannerDto.line,
    });

    const saveUser2 = await this.BannerRepository.save(updateUser);

    return { status: 201, message: 'Banner', data: saveUser2 };
  }

  async updateUser(id: number, updateProductDto: UpdateStatusBannerDto) {
    const existUser = await this.BannerRepository.findOneBy({
      id: id,
    });

    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateProductDto.status !== undefined) {
      existUser.status = !updateProductDto.status;
    }

    return await this.BannerRepository.save(existUser);
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
