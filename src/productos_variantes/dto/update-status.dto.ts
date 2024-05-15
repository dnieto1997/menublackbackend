import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateProductosVarianteDto } from './create-productos_variante.dto';

export class UpdateStatusProductVariantDto extends PartialType(
  CreateProductosVarianteDto,
) {
  @IsOptional()
  @IsBoolean()
  status: boolean;
}
