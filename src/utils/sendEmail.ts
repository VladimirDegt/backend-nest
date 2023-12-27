import * as process from 'process';

require('dotenv').config();
const nodemailer = require('nodemailer');

export async function sendEmailFromGoogle (data, emailOrganization) {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: 'process.env.EMAIL',
        to: emailOrganization,
        subject: `Тестування`,
        html: `<h4 >${data}</h4>`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(new Error("Помилка при відправці листа: " + err));
            } else {
                resolve(`Лист відправлено на пошту ${emailOrganization}`);
            }
        });
    });
}