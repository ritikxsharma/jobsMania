const { AWS_SES } = require("./config");

const sendEmail = async (email, token) => {
  await new Promise((resolve, reject) => {
    AWS_SES.sendEmail(
      {
        Source: process.env.AWS_FROM_EMAIL,
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Subject: {
            Charset: "UTF-8",
            Data: "Account Verification",
          },
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: `
                <html>
                  <h2>Welcome to Jobs Mania</h2>
                  <p>We are glad to have you with us.</p>
                  <p>Click on the link below to activate your account.</p>
                  <a href="http://localhost:${process.env.PORT}/register?token=${token}">Activate my account</a>
                </html>
              `,
            },
          },
        },
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

module.exports = sendEmail;
