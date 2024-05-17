import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateBannerDto {
  @IsNotEmpty()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsNumber()
  line: number;
}
