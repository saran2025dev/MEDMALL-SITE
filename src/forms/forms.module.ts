import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormSubmissionService } from './forms.service';
import { FormSubmissionController } from './forms.controller';

import { PartnerForm } from './entities/partner-form.entity';
import { ContactForm } from './entities/contact-form.entity';
import { StudentForm } from './entities/student-form.entity';
import { MailService } from 'src/mailer/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PartnerForm, ContactForm, StudentForm]),
  ],
  providers: [FormSubmissionService,MailService ],
  controllers: [FormSubmissionController],
})
export class FormsModule {}
