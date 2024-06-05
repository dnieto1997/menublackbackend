import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { Group } from 'src/group/entities/group.entity';
import { Line } from 'src/lines/entities/line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Banner, Line, Group])],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
