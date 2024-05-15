import { PartialType } from '@nestjs/swagger';
import { CreateProductosVarianteDto } from './create-productos_variante.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductosVarianteDto extends PartialType(
  CreateProductosVarianteDto,
) {
  @IsNotEmpty()
  @IsString()
  producto_id: number;

  @IsNotEmpty()
  @IsString()
  producto_variante: number;
}
