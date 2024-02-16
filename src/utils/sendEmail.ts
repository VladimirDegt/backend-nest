import * as process from 'process';
import { IDataEmail } from '../customers/types';

require('dotenv').config();
const nodemailer = require('nodemailer');

export async function sendEmailFromGoogle(data, content: string) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN,
        },
    });

    const formattedData = JSON.parse(content);
    
    const dataEmail: IDataEmail = {
      number: data['Номер'],
      customer: data['Замовник'],
      debt: data['Стан оплати'],
      penalty: data['Пеня за прострочення платежу'],
      email: data['Email замовника'],
    };

    const mailOptions = {
        from: process.env.EMAIL,
        to: 'degtyarevvladimirr@gmail.com',
      subject: `Тестування`,
      html: `${formattedData}`,
    };


    // ${dataEmail.customer}
    // ${dataEmail.number}
    // ${dataEmail.debt}
    // ${dataEmail.penalty}


    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                    console.log('err-->', err);
                reject({
                    ...dataEmail,
                })
            } else {
                resolve({
                    ...dataEmail,
                });
            }
        });
    });
}