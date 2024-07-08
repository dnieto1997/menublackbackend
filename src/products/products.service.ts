import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { UpdateStatusProductDto } from './dto/update-status.dto';
import { Variante } from 'src/variantes/entities/variante.entity';
import { ProductosVariante } from 'src/productos_variantes/entities/productos_variante.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private ProductRepository: Repository<Product>,
    @InjectRepository(Variante) private variantRepository: Repository<Variante>,
    @InjectRepository(ProductosVariante)
    private productvariantRepository: Repository<ProductosVariante>,
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
      variantes_group: JSON.stringify(createProductDto.variantes_group),
      observation: createProductDto.observations,
    });
    this.ProductRepository.save(newProduct);

    return { status: 201, message: 'Product Created' };
  }

  async findAll() {
    const user = await this.ProductRepository.find();
    return user;
  }

  async searchVariant(id: number) {
    const productos = await this.ProductRepository.find({ where: { id: id } });
    const arrProd = [];

    for (const row of productos) {
      const variantenPro = JSON.parse(row.variantes_group);

      let results = [];

      if (variantenPro && variantenPro.length > 0) {
        const sqlvarpro = await this.productvariantRepository.find({
          where: { id: In(variantenPro) },
        });

        for (const rowpro of sqlvarpro) {
          const variantenGrup = JSON.parse(rowpro.product_variante);

          let sqlvargru = [];

          if (variantenGrup && variantenGrup.length > 0) {
            const sqlvargru2 = await this.variantRepository.find({
              where: { id: In(variantenGrup) },
            });

            sqlvargru = sqlvargru2.map((rowva) => ({
              id: rowva.id,
              descripcion: rowva.name,
              precio: rowva.cost,
            }));
          }

          results.push({
            vg_id: rowpro.id,
            vg_nombre: rowpro.name,
            vg_tipo: rowpro.tipo,
            vg_variantes: sqlvargru,
          });
        }
      } else {
        results = variantenPro;
      }

      arrProd.push({
        id: row.id,
        codigo: row.code,
        img: row.img,
        nombre: row.name,
        precio_und: row.price,
        und: 1,
        variantes: results,
      });
    }

    return arrProd;
  }

  async search() {
    const products = await this.ProductRepository.find({
      select: ['id', 'name'],
      where: { status: true },
    });

    return products;
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
      variantes_group: JSON.stringify(updateProductDto.variantes_group),
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

  async remove(id: number) {
    const existUser = await this.ProductRepository.findOneBy({ id: id });

    if (!existUser) {
      throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
    }

    await this.ProductRepository.delete(id);

    return {
      message: 'Product deleted successfully',
    };
  }
}
