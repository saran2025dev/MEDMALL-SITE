import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePartnerFormDto } from './dto/create-partner-form.dto';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { CreateStudentFormDto } from './dto/create-student-form.dto';

import { PartnerForm } from './entities/partner-form.entity';
import { ContactForm } from './entities/contact-form.entity';
import { StudentForm } from './entities/student-form.entity';

@Injectable()
export class FormSubmissionService {
  constructor(
    @InjectRepository(PartnerForm)
    private readonly partnerRepo: Repository<PartnerForm>,

    @InjectRepository(ContactForm)
    private readonly contactRepo: Repository<ContactForm>,

    @InjectRepository(StudentForm)
    private readonly studentRepo: Repository<StudentForm>,
  ) {}

  // Create methods
  createPartner(dto: CreatePartnerFormDto) {
    return this.partnerRepo.save(dto);
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
