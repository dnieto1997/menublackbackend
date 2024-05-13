import { PartialType } from '@nestjs/swagger';
import { CreateLineDto } from './create-line.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateStatusLineDto extends PartialType(CreateLineDto) {
  @IsOptional()
  @IsBoolean()
  status: boolean;
}
