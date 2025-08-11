import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('contact_forms')
export class ContactForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array') requestType: string[];
  @Column('simple-array') selectedProducts: string[];
  @Column('simple-array') selectedServices: string[];
  @Column() businessName: string;
  @Column() contactName: string;
  @Column() phone: string;
  @Column() email: string;
  @Column() pincode: string;
  @Column() message: string;

  @CreateDateColumn()
  createdAt: Date;
}
