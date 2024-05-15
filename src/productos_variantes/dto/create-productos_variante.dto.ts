import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateProductosVarianteDto {
  @IsNotEmpty()
  @IsNumber()
  producto_id: number;

  @IsNotEmpty()
  @IsNumber()
  producto_variante: number;
}
