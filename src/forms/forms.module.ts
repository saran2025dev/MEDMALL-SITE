import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSubmissionService } from './forms.service';
import { FormSubmissionController } from './forms.controller';

import { PartnerForm } from './entities/partner-form.entity';
import { ContactForm } from './entities/contact-form.entity';
import { StudentForm } from './entities/student-form.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PartnerForm, ContactForm, StudentForm]),
  ],
  providers: [FormSubmissionService],
  controllers: [FormSubmissionController],
})
export class FormsModule {}
