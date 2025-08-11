import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsEmail, ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateContactFormDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  requestType: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  selectedProducts: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  selectedServices: string[];

  @ApiProperty()
  @IsString()
 
  businessName: string;

  @ApiProperty()
  @IsString()
 
  contactName: string;

  @ApiProperty()
  @IsString()
 
  phone: string;

  @ApiProperty()
  @IsEmail()
 
  email: string;

  @ApiProperty()
  @IsString()
 
  pincode: string;

  @ApiProperty()
  @IsString()
 
  message: string;
}
