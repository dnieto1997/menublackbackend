import { PartialType } from '@nestjs/swagger';
import { CreateProductosVarianteDto } from './create-productos_variante.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductosVarianteDto extends PartialType(
  CreateProductosVarianteDto,
) {
  @IsNotEmpty()
  @IsNumber()
  producto_id: number;

  @IsNotEmpty()
  @IsNumber()
  producto_variante: number;
}
