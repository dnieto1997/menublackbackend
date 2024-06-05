import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Variante } from 'src/variantes/entities/variante.entity';
import { ProductosVariante } from 'src/productos_variantes/entities/productos_variante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Variante, ProductosVariante])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
