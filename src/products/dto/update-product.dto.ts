import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDecimal,
  IsBoolean,
  IsOptional,
  IsArray,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNotEmpty()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  group: number;

  @IsNotEmpty()
  @IsNumber()
  line: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsDecimal()
  stars: string;

  @IsNotEmpty()
  @IsBoolean()
  new: boolean;

  @IsNotEmpty()
  @IsBoolean()
  promotion: boolean;

  @IsOptional()
  @IsArray()
  variantes_group: string[];

  @IsOptional()
  @IsString()
  observations: string;
}
