import { PartialType } from '@nestjs/swagger';
import { CreateLoginDto } from './create-login.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLoginDto extends PartialType(CreateLoginDto) {
  @IsOptional()
  @IsString()
  user: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password: string;
}
