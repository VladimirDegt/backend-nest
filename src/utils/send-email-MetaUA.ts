import * as process from 'process';
import { IDataEmail } from '../customers/types';

require("dotenv").config();
const nodemailer = require("nodemailer");

export async function sendEmailForMeta(data, content: string) {

  const nodemailerConfig = {
    host: "smtp.meta.ua",
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
 
  const dataEmail: IDataEmail = {
    number: data['Номер'],
    customer: data['Замовник'],
    debt: data['Стан оплати'],
    penalty: data['Пеня за прострочення платежу'],
    email: data['Email замовника'],
  };

  const mailOptions = {
    to: data['Email замовника'],
    from: process.env.USER,
    subject: 'Повідомлення КП "МІЦ"',
    html: `${contentEmail}`
//       <table border="1">
//   <thead>
//     <tr>
//       <th>Номер</th>
//       <th>Замовник</th>
//       <th>Стан оплати</th>
//       <th>Пеня за прострочення платежу</th>
//       <th>Email замовника</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>${dataEmail.number}</td>
//       <td>${dataEmail.customer}</td>
//       <td>${dataEmail.debt}</td>
//       <td>${dataEmail.penalty}</td>
//       <td>${dataEmail.email}</td>
//     </tr>
//   </tbody>
// </table>

  };

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (err, info) => {
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


