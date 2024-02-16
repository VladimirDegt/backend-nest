import * as process from 'process';

require('dotenv').config();
const nodemailer = require('nodemailer');

export async function sendEmailForMeta(data, content: string) {

  const nodemailerConfig = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.META_PASSWORD,
    },
    logger: true,
    // Вікдлючаємо перевірку сертифікату. У продакшені прибрати
    tls: {
      rejectUnauthorized: false,
    },
  };

  const transport = nodemailer.createTransport(nodemailerConfig);

  const contentEmail = JSON.parse(content);

    const markupRow = data[1].map(item => {
      return (
        `<tr>
          <td align="center">${item.number}</td>
          <td align="center">${item.customer}</td>
          <td align="center">${item.debt}</td>
          <td align="center">${item.penalty}</td>
        </tr>`
      )
    }).join('')


  const mailOptions = {
    to: data[0],
    from: process.env.USER,
    subject: 'Повідомлення КП "МІЦ"',
    html: `${contentEmail}
      <br>
      <table border="1" >
  <thead>
    <tr>
      <th>Номер договору</th>
      <th>Замовник</th>
      <th>Стан оплати</th>
      <th>Пеня за прострочення платежу</th>
    </tr>
  </thead>
  <tbody>
    ${markupRow}
  </tbody>
</table>`

  };

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('err-->', err);
        reject(
        {
          email: data[0],
            customer: data[1].customer,
        },
        );
      } else {
        resolve({
          email: data[0],
          customer: data[1].customer,
        });
      }
    });
  });

}


