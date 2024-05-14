import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

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
      lines:createProductDto.line,
      name: createProductDto.name,
      price: createProductDto.price,
      stars:Number(createProductDto.stars),
      new:createProductDto.new,
      promotion:createProductDto.promotion,
      observation:createProductDto.observations
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
