import * as process from 'process';
import { IDataEmail } from '../customers/types';

require('dotenv').config();
const nodemailer = require('nodemailer');

export async function sendEmailFromGoogle(data) {

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

    const formattedData = `
        <tr>
            <td>${data['Номер']}</td>
            <td>${data['Замовник']}</td>
            <td>${data['Стан оплати']}</td>
            <td>${data['Пеня за прострочення платежу']}</td>
        </tr>
    `;

    const mailOptions = {
        from: process.env.EMAIL,
        to: data['Email замовника'],
        subject: `Тестування`,
        html: `
        <h4>Таблица:</h4>
        <table >
            <tr>
                <th>Номер</th>
                <th>Замовник</th>
                <th>Стан оплати</th>
                <th>Пеня за прострочення платежу</th>
            </tr>
            ${formattedData}
        </table>
    `,
    };

    const dataEmail: IDataEmail = {
        name: data['Номер'],
        customer: data['Замовник'],
        debt: data['Стан оплати'],
        penalty: data['Пеня за прострочення платежу'],
        email: data['Email замовника'],
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
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