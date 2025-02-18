const nodemailer = require('nodemailer');


async function AWSsmpt() {
  const transporter = nodemailer.createTransport({
    host: 'email-smtp.ap-southeast-2.amazonaws.com', // Replace with your region
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'AKIA4DK3AVO5OTVGPXFB', // This is your verified sender email address
      pass: 'BKmxvjm2EJZuUX26874bqDHwZNSBdv34SGVyEr8UQ4+u'
    }
  });
const allureReportUrl=`http://192.168.4.43:54041/index.html`
  const mailOptions = {
    from: 'swarna.boddu@grays.com.au',
    to: 'sharique.shueb@grays.com.au',
    subject: 'Allure Report',
    html: `
    <p>Find the Allure report at: <a href="${allureReportUrl}">${allureReportUrl}</a></p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

AWSsmpt();