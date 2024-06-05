import { Module } from '@nestjs/common';
import { LinesService } from './lines.service';
import { LinesController } from './lines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Line } from './entities/line.entity';
import { Group } from 'src/group/entities/group.entity';
import { Product } from 'src/products/entities/product.entity';
import { Variante } from 'src/variantes/entities/variante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Line, Group, Product, Variante])],
  controllers: [LinesController],
  providers: [LinesService],
})
export class LinesModule {}
