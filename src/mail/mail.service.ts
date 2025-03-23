import { BadRequestException, Injectable } from '@nestjs/common';
import { text } from 'node:stream/consumers';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, message: string) {
    try {
      let data = await this.transporter.sendMail({
        from: process.env.USER_EMAIL,
        to,
        subject,
        html: message,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
