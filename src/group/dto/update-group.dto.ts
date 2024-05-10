import { PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @IsOptional()
  @IsString()
  img: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsNumber()
  order: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  days: string[];

  @IsOptional()
  @IsArray()
  hours: string[];

  @IsOptional()
  observations: string;
}
