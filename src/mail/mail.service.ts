import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abdulborimahammadjanov86@gmail.com',
        pass: 'jxkj sfsb hrdx pswm',
      },
    });
  }
}
