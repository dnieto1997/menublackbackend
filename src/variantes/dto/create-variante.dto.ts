import { IsNotEmpty, IsString } from 'class-validator';
export class CreateVarianteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  cost: string;
}
