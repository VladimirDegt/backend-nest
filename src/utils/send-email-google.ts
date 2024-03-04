import * as process from 'process';
import { IDataEmail } from '../customers/types';
import * as path from 'path';

require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
export async function sendEmailGoogle(data) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_EMAIL,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: '.html',
      partialsDir: path.resolve('src/utils/views'),
      defaultLayout: false,
    },
    viewPath: path.resolve('src/utils/views'),
    extName: '.handlebars',
  };

  transporter.use('compile', hbs(handlebarOptions))

  const mailOptions = {
    from: process.env.APP_NAME,
    to: data[0],
    subject: `Лист від КП МІЦ`,
    template: 'email',
    context: {
      customers: data[1],
    }

  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (e) {
    console.log('sendEmail Error: ', e);
}
}