import { PartialType } from '@nestjs/swagger';
import { CreateBannerDto } from './create-banner.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBannerDto extends PartialType(CreateBannerDto) {
  @IsOptional()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsNumber()
  line: number;
}
