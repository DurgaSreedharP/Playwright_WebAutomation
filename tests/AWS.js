const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'your-region'
});

const ses = new AWS.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'your-region'
});

const bucketName = 'your-bucket-name';
const allureReportDir = 'allure-results';

async function uploadAllureReportToS3() {
  const files = fs.readdirSync(allureReportDir);

  for (const file of files) {
    const filePath = path.join(allureReportDir, file);
    const params = {
      Bucket: bucketName,
      Key: `allure-reports/${file}`,
      Body: fs.createReadStream(filePath)
    };

    await s3.upload(params).promise();
  }
}

async function sendEmailWithReportLink(recipient) {
  const transporter = nodemailer.createTransport({
    service: 'SES',
    auth: {
      user: 'AKIA4DK3AVO5OTVGPXFB',
      pass: 'BKmxvjm2EJZuUX26874bqDHwZNSBdv34SGVyEr8UQ4+u' // Replace with SES credentials or IAM role
    }
  });

  const mailOptions = {
    from: 'swarna.boddu@grays.com.au',
    to: recipient,
    subject: 'Allure Report',
    //html: `<p>Find the Allure report at: https://${bucketName}.s3.amazonaws.com/${reportKey}</p>`
    html: `<p>Allure Report</p>`
  };

  await transporter.sendMail(mailOptions);
}

async function sendAllureReport() {
//  // await uploadAllureReportToS3();
//   const reportKey = 'allure-reports/index.html'; // Adjust as needed
  const recipient = 'swarna.boddu@grays.com.au';
  //await sendEmailWithReportLink(recipient, bucketName, reportKey);
  await sendEmailWithReportLink(recipient);
}

sendAllureReport();