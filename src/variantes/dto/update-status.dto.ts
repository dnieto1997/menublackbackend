import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateVarianteDto } from './create-variante.dto';

export class UpdateStatusVariantDto extends PartialType(CreateVarianteDto) {
  @IsOptional()
  @IsBoolean()
  status: boolean;
}
