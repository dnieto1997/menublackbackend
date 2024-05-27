import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  order: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  days: string[];

  @IsArray()
  hours: string[];

  @IsOptional()
  @IsString()
  observations: string;
}
