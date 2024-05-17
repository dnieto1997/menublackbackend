import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateBannerDto } from './create-banner.dto';

export class UpdateStatusBannerDto extends PartialType(CreateBannerDto) {
  @IsOptional()
  @IsBoolean()
  status: boolean;
}
