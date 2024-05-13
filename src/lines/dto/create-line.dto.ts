import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateLineDto {
    @IsNotEmpty()
    @IsNumber()
    position: number;
  
    @IsNotEmpty()
    @IsString()
    img: string;
  
    @IsNotEmpty()
    @IsNumber()
    code: number;

    @IsNotEmpty()
    @IsNumber()
    group: number;
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsString()
    observations: string;
}
