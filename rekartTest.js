import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.4/index.js";


export const options = {
  vus: 20,
  duration: '10s',
  // iterations: 100,
};

export default function () {
  const res = http.get('https://release.rekart.io/app/main/delivery-overview/373-2026-01-08');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "reports/k6-report.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}



// export async function sendK6ReportEmail() {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: 'mahesh@abmiro.in',
//       pass: 'pxmx gpvz uyfz jfok', // App Password
//     },
//   });

//   const mailOptions = {
//     from: '"Rekart QA Team" <mahesh@abmiro.in>',
//     to: 'mahesh@abmiro.in',
//     subject: 'Rekart app k6 Performance Testing – HTML Report',
//     html: `
//       <p>Hello Team,</p>
//       <p>Please find attached the <b>k6 performance testing HTML report</b>.</p>
//       <p><b>Summary:</b></p>
//       <ul>
//         <li>Tool: k6</li>
//         <li>Test Type: Load Testing</li>
//         <li>Max Users: 50</li>
//       </ul>
//       <p>Regards,<br>QA / Performance Team</p>
//     `,
//     attachments: [
//       {
//         filename: 'k6-performance-report.html',
//         path: path.join(__dirname, 'reports/k6-report.html'),
//       },
//     ],
//   };

//   const info = await transporter.sendMail(mailOptions);
//   console.log('Email sent:', info.response);
// }
