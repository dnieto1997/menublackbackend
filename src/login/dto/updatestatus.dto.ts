import { PartialType } from '@nestjs/swagger';
import { CreateLoginDto } from './create-login.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateStatus extends PartialType(CreateLoginDto) {
  @IsOptional()
  @IsBoolean()
  status: boolean;
}
