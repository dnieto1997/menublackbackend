import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateProductosVarianteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  producto_variante: string[];

  @IsNotEmpty()
  @IsString()
  tipo: string;
}
