import { IsString, IsInt, IsOptional, IsNumber } from 'class-validator';
export class CreateSliderDto {
  @IsString()
  name: string;

  @IsNumber()
  lastModified: number;

  @IsString()
  lastModifiedDate: Date;

  @IsInt()
  size: number;

  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  webkitRelativePath?: string;
}
