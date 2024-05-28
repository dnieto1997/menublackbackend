import { PartialType } from '@nestjs/swagger';
import { CreateProductosVarianteDto } from './create-productos_variante.dto';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductosVarianteDto extends PartialType(
  CreateProductosVarianteDto,
) {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  producto_variante: string[];

  @IsNotEmpty()
  @IsString()
  tipo: string;
}
