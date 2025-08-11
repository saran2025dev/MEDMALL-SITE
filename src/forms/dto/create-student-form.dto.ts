import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateStudentFormDto {
  @ApiProperty()
  @IsString()
 
  fullName: string;

  @ApiProperty()
  @IsEmail()
 
  email: string;

  @ApiProperty()
  @IsString()
 
  phone: string;

  @ApiProperty()
  @IsString()
 
  college: string;

  @ApiProperty()
  @IsString()
 
  cityState: string;

  @ApiProperty()
  @IsString()
 
  course: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  ambassadorInterest?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  suggestions?: string;
}
