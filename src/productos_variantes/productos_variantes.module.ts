import { Module } from '@nestjs/common';
import { ProductosVariantesService } from './productos_variantes.service';
import { ProductosVariantesController } from './productos_variantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosVariante } from './entities/productos_variante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductosVariante])],
  controllers: [ProductosVariantesController],
  providers: [ProductosVariantesService],
})
export class ProductosVariantesModule {}
