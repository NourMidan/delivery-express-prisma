import { Categories } from '@/interfaces/models.interface';
import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateOwnerDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  menuName: string;

  @IsNotEmpty()
  category: Categories[];
}

export class LoginOwnerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
