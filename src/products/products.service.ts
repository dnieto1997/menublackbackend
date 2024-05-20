import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateStatusProductDto } from './dto/update-status.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private ProductRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const newProduct = this.ProductRepository.create({
      img: createProductDto.img,
      code: createProductDto.code,
      group: createProductDto.group,
      lines: createProductDto.line,
      name: createProductDto.name,
      price: createProductDto.price,
      stars: Number(createProductDto.stars),
      new: createProductDto.new,
      promotion: createProductDto.promotion,
      observation: createProductDto.observations,
    });
    this.ProductRepository.save(newProduct);

    return { status: 201, message: 'Product Created' };
  }

  async findAll() {
    const user = await this.ProductRepository.find();
    return user;
  }

  async findOne(id: number) {
    const existUser = await this.ProductRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Group does not exist', HttpStatus.CONFLICT);
    }

    return existUser;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const existUser = await this.ProductRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = await this.ProductRepository.preload({
      id: id,
      img: updateProductDto.img,
      code: updateProductDto.code,
      group: updateProductDto.group,
      lines: updateProductDto.line,
      name: updateProductDto.name,
      price: updateProductDto.price,
      stars: Number(updateProductDto.stars),
      new: updateProductDto.new,
      promotion: updateProductDto.promotion,
      observation: updateProductDto.observations,
    });

    const saveUser2 = await this.ProductRepository.save(updateUser);

    return { status: 201, message: 'Product Updated', data: saveUser2 };
  }

  async updateUser(id: number, updateProductDto: UpdateStatusProductDto) {
    const existUser = await this.ProductRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateProductDto.status !== undefined) {
      existUser.status = !updateProductDto.status;
    }

    return await this.ProductRepository.save(existUser);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
