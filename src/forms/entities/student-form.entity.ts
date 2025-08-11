import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('student_forms')
export class StudentForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() fullName: string;
  @Column() email: string;
  @Column() phone: string;
  @Column() college: string;
  @Column() cityState: string;
  @Column() course: string;
  @Column() ambassadorInterest: string;
  @Column() suggestions: string;

  @CreateDateColumn()
  createdAt: Date;
}
