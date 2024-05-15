import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDecimal,
  IsBoolean,
} from 'class-validator';
export class CreateProductDto {
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

  @IsString()
  observations: string;
}
