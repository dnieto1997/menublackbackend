import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductosVarianteDto } from './dto/create-productos_variante.dto';
import { UpdateProductosVarianteDto } from './dto/update-productos_variante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosVariante } from './entities/productos_variante.entity';
import { Repository } from 'typeorm';
import { UpdateStatusVariantDto } from 'src/variantes/dto/update-status.dto';

@Injectable()
export class ProductosVariantesService {
  constructor(
    @InjectRepository(ProductosVariante)
    private VarianteProductRepository: Repository<ProductosVariante>,
  ) {}
  create(createProductosVarianteDto: CreateProductosVarianteDto) {
    const newVariante = this.VarianteProductRepository.create({
      name: createProductosVarianteDto.name,
      product_variante: JSON.stringify(
        createProductosVarianteDto.producto_variante,
      ),
      tipo: createProductosVarianteDto.tipo,
    });
    this.VarianteProductRepository.save(newVariante);

    return { status: 201, message: 'Product Variant Created' };
  }

  async findAll() {
    const user = await this.VarianteProductRepository.find();
    return user;
  }

  async findOne(id: number) {
    const existUser = await this.VarianteProductRepository.findOneBy({
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

  async update(
    id: number,
    updateProductosVarianteDto: UpdateProductosVarianteDto,
  ) {
    const existUser = await this.VarianteProductRepository.findOneBy({
      id: id,
    });

    if (!existUser) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = await this.VarianteProductRepository.preload({
      id: id,
      name: updateProductosVarianteDto.name,
      product_variante: JSON.stringify(
        updateProductosVarianteDto.producto_variante,
      ),
      tipo: updateProductosVarianteDto.tipo,
    });

    const saveUser2 = await this.VarianteProductRepository.save(updateUser);

    return { status: 201, message: 'Product Variant Updated', data: saveUser2 };
  }

  async updateUser(id: number, updateProductDto: UpdateStatusVariantDto) {
    const existUser = await this.VarianteProductRepository.findOneBy({
      id: id,
    });

    if (!existUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateProductDto.status !== undefined) {
      existUser.status = !updateProductDto.status;
    }

    return await this.VarianteProductRepository.save(existUser);
  }

  remove(id: number) {
    return `This action removes a #${id} productosVariante`;
  }
}
