import { Module } from '@nestjs/common';
import { LinesService } from './lines.service';
import { LinesController } from './lines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Line } from './entities/line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Line])],
  controllers: [LinesController],
  providers: [LinesService],
})
export class LinesModule {}
