import { PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateStatusGroupDto extends PartialType(CreateGroupDto) {
  @IsOptional()
  @IsBoolean()
  status: boolean;
}
