const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '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',
);

export async function sendEmailFromSendgrid () {
    const msg = {
  to: 'degtyarevvladimirr@gmail.com',
  from: 'kpgicemail@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode);
    console.log(response[0].headers);
  })
  .catch((error) => {
    console.error(`Помилка відправки: ${error}`);
  });

}
