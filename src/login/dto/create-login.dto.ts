import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  /*  @Matches(
        /(?:(?=.\d)|(?=.\W+))(?![.\n])(?=.[A-Z])(?=.[a-z]).*$/, {
        message: 'La contraseña debe tener una letra mayúscula, una letra minúscula y un número'
    }) */
  password: string;
}
