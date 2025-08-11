import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('partner_forms')
export class PartnerForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() fullName: string;
  @Column() phone: string;
  @Column() email: string;
  @Column() city: string;
  @Column() pincode: string;
  @Column() qualification: string;
  @Column() experience: string;
  @Column() brands: string;
  @Column() workedBefore: string;
  @Column() serviceRegion: string;
  @Column() hasTools: string;
  @Column() availability: string;
  @Column() declaration: boolean;
  @Column({ nullable: true }) idProof?: string;
  @Column({ nullable: true }) qualificationDoc?: string;
  @Column({ nullable: true }) photo?: string;

  @CreateDateColumn()
  createdAt: Date;
}
