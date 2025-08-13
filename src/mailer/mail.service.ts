import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private transporter;
    private readonly toEmail = 'saran07rose@gmail.com';

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        try {
            const info = await this.transporter.sendMail({
                from: `"Your Name or Company" <${process.env.SMTP_USER}>`,
                to: this.toEmail,
                subject,
                html,
            });
            this.logger.log(`Mail sent: ${info.messageId}`);
            return info;
        } catch (error) {
            this.logger.error('Error sending mail:', error);
            throw error;
        }
    }
}
