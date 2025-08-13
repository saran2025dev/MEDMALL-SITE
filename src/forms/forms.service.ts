import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePartnerFormDto } from './dto/create-partner-form.dto';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { CreateStudentFormDto } from './dto/create-student-form.dto';
import { PartnerForm } from './entities/partner-form.entity';
import { ContactForm } from './entities/contact-form.entity';
import { StudentForm } from './entities/student-form.entity';
import { MailService } from 'src/mailer/mail.service';

@Injectable()
export class FormSubmissionService {
  constructor(
    @InjectRepository(PartnerForm)
    private readonly partnerRepo: Repository<PartnerForm>,

    @InjectRepository(ContactForm)
    private readonly contactRepo: Repository<ContactForm>,

    @InjectRepository(StudentForm)
    private readonly studentRepo: Repository<StudentForm>,

    private readonly mailService: MailService,
  ) {}

  async createPartner(dto: CreatePartnerFormDto) {
    const partner = await this.partnerRepo.save(dto);

    const subject = 'Partner Form Submission Received';
    const html = `
      <h3>New Partner Form Submission</h3>
      <p><b>Full Name:</b> ${partner.fullName}</p>
      <p><b>Email:</b> ${partner.email}</p>
      <p><b>Phone:</b> ${partner.phone}</p>
      <p>Thank you for submitting the partner form!</p>
    `;

    try {
      await this.mailService.sendMail(partner.email, subject, html);
    } catch (err) {
      console.error('Failed to send mail', err);
    }

    return partner;
  }

  createContact(dto: CreateContactFormDto) {
    return this.contactRepo.save(dto);
  }

  createStudent(dto: CreateStudentFormDto) {
    return this.studentRepo.save(dto);
  }

  // Find all methods
  findAllPartners() {
    return this.partnerRepo.find({ order: { createdAt: 'DESC' } });
  }

  findAllContacts() {
    return this.contactRepo.find({ order: { createdAt: 'DESC' } });
  }

  findAllStudents() {
    return this.studentRepo.find({ order: { createdAt: 'DESC' } });
  }

  // Find by id methods
  findPartnerById(id: string) {
    return this.partnerRepo.findOneBy({ id });
  }

  findContactById(id: string) {
    return this.contactRepo.findOneBy({ id });
  }

  findStudentById(id: string) {
    return this.studentRepo.findOneBy({ id });
  }

  // Update partial fields
  async updatePartner(id: string, data: Partial<PartnerForm>) {
    await this.partnerRepo.update(id, data);
    return this.findPartnerById(id);
  }

  async updateContact(id: string, data: Partial<ContactForm>) {
    await this.contactRepo.update(id, data);
    return this.findContactById(id);
  }

  async updateStudent(id: string, data: Partial<StudentForm>) {
    await this.studentRepo.update(id, data);
    return this.findStudentById(id);
  }
}
