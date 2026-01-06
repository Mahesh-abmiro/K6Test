const nodemailer = require('nodemailer');
const path = require('path');

// Create transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  
  port: 587,
  secure: false,
  auth: {
    user: 'mahesh@abmiro.in',
    pass: 'pxmx gpvz uyfz jfok' // use App Password, app name : EmailSendForTesting
  }
});

// Email options
const mailOptions = {
  from: '"Rekart QA  Team" <mahesh@abmiro.in>',
  to: 'mahesh@abmiro.in',
  subject: 'Rekart app k6 Performance Testing – HTML Report',
  html: `
    <p>Hello Team,</p>

    <p>Please find attached the <b>k6 performance testing HTML report</b> for the Rekart application.</p>

    <p><b>Summary:</b></p>
    <ul>
      <li>Tool: k6</li>
      <li>Test Type: Load Testing</li>
      <li>Max Users: 50</li>
    </ul>

    <p>Regards,<br>
        QA / Performance Team</p>
  `,
  attachments: [
    {
      filename: 'k6-performance-report.html',
      path: path.join(__dirname, 'reports/k6-report.html')
    }
  ]
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent successfully:', info.response);
  }
});
