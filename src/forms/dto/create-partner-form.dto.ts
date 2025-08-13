import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';

export class CreatePartnerFormDto {
  @ApiProperty()
  @IsString()
 
  fullName: string;

  @ApiProperty()
  @IsString()
 
  phone: string;

  @ApiProperty()
  @IsEmail()
 
  email: string;

  @ApiProperty()
  @IsString()
 
  city: string;

  @ApiProperty()
  @IsString()
 
  pincode: string;

  @ApiProperty()
  @IsString()
 
  qualification: string;

  @ApiProperty()
  @IsString()
 
  experience: string;

  @ApiProperty()
  @IsString()
 
  brands: string;

  @ApiProperty()
  @IsString()
 
  workedBefore: string;

  @ApiProperty()
  @IsString()
 
  serviceRegion: string;

  @ApiProperty()
  @IsString()
 
  hasTools: string;

  @ApiProperty()
  @IsString()
 
  availability: string;

  @ApiProperty()
  @IsBoolean()
 
  declaration: boolean;

  // @ApiProperty({ required: false })
  // @IsString()
  // @IsOptional()
  // idProof?: string;

  // @ApiProperty({ required: false })
  // @IsString()
  // @IsOptional()
  // qualificationDoc?: string;

  // @ApiProperty({ required: false })
  // @IsString()
  // @IsOptional()
  // photo?: string;
}
