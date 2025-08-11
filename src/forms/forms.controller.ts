import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreatePartnerFormDto } from './dto/create-partner-form.dto';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { CreateStudentFormDto } from './dto/create-student-form.dto';
import { FormSubmissionService } from './forms.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import type { Response } from 'express';
import { FormType } from 'src/utils/enums';

@ApiTags('Forms')
@Controller('forms')
export class FormSubmissionController {
  constructor(private readonly service: FormSubmissionService) {}

  // Partner Form

  @Post('partner-form')
  @ApiOperation({ summary: 'Submit partner form' })
  createPartner(@Body() dto: CreatePartnerFormDto) {
    return this.service.createPartner(dto);
  }

  @Get('partner-form')
  @ApiOperation({ summary: 'Get all partner form submissions' })
  getPartnerForms() {
    return this.service.findAllPartners();
  }

  @Get('partner-form/:id')
  @ApiOperation({ summary: 'Get partner form submission by ID' })
  getPartnerById(@Param('id') id: string) {
    return this.service.findPartnerById(id);
  }

  @Post('partner-form/:id/upload-photo')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file to upload (jpg, jpeg, png only, max 2MB)',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 2 * 1024 * 1024 }, // Max 2MB
    }),
  )
  async uploadPartnerPhoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const partner = await this.service.findPartnerById(id);
    if (!partner) {
      throw new NotFoundException('Partner form not found');
    }
    // Save only filename
    const filename = file.filename;
    await this.service.updatePartner(id, { photo: filename });
    return { message: 'Photo uploaded successfully', filename };
  }

  @Get('partner-form/:id/photo')
  @ApiOperation({ summary: 'Get partner photo by partner ID' })
  async getPartnerPhoto(@Param('id') id: string, @Res() res: Response) {
    const partner = await this.service.findPartnerById(id);
    if (!partner || !partner.photo) {
      throw new NotFoundException('Photo not found for this partner');
    }

    // Compose full path for file serving
    const filePath = join(process.cwd(), 'uploads', partner.photo);
    return res.sendFile(filePath);
  }

  // Contact Form

  @Post('contact-form')
  @ApiOperation({ summary: 'Submit contact form' })
  createContact(@Body() dto: CreateContactFormDto) {
    return this.service.createContact(dto);
  }

  @Get('contact-form')
  @ApiOperation({ summary: 'Get all contact form submissions' })
  getContactForms() {
    return this.service.findAllContacts();
  }

  @Get('contact-form/:id')
  @ApiOperation({ summary: 'Get contact form submission by ID' })
  getContactById(@Param('id') id: string) {
    return this.service.findContactById(id);
  }

  // Student Form

  @Post('student-form')
  @ApiOperation({ summary: 'Submit student form' })
  createStudent(@Body() dto: CreateStudentFormDto) {
    return this.service.createStudent(dto);
  }

  @Get('student-form')
  @ApiOperation({ summary: 'Get all student form submissions' })
  getStudentForms() {
    return this.service.findAllStudents();
  }

  @Get('student-form/:id')
  @ApiOperation({ summary: 'Get student form submission by ID' })
  getStudentById(@Param('id') id: string) {
    return this.service.findStudentById(id);
  }
}
