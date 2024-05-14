import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateStatusProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsBoolean()
  status: boolean;
}
