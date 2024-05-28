import { PartialType } from '@nestjs/swagger';
import { CreateLineDto } from './create-line.dto';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLineDto extends PartialType(CreateLineDto) {
  @IsOptional()
  @IsString()
  img: string;

  @IsOptional()
  @IsNumber()
  position: number;

  @IsOptional()
  @IsNumber()
  code: number;

  @IsOptional()
  @IsNumber()
  group: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  observations: string;
}
