import * as process from 'process';

require('dotenv').config();
const nodemailer = require('nodemailer');

export async function sendEmailFromGoogle(data, emailOrganization) {
    // try {
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

        const formattedData = data.data.map(item => {
            return `
            <tr>
                <td>${item['Номер']}</td>
                <td>${item['Замовник']}</td>
            </tr>
        `;
        }).join('');

        const mailOptions = {
            from: process.env.EMAIL,
            to: emailOrganization,
            subject: `Тестування`,
            html: `
            <h4>Таблица:</h4>
            <table >
                <tr>
                    <th>Номер</th>
                    <th>Замовник</th>
                </tr>
                ${formattedData}
            </table>
        `,
        };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('err.message-->', err.message)
                reject(new Error('Помилка при відправці листа: ' + err));
            } else {
                resolve(`Лист відправлено на пошту ${emailOrganization}`);
            }
        });
    });
}