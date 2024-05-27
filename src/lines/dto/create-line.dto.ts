import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateLineDto {
  @IsNotEmpty()
  @IsNumber()
  position: number;

  @IsNotEmpty()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsNumber()
  code: number;

  @IsNotEmpty()
  @IsNumber()
  group: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  observations: string;
}
