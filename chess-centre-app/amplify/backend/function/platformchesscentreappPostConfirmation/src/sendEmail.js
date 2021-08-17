const AWS = require("aws-sdk");
const { REGION, ENV } = process.env;
const SES = new AWS.SES({ region: REGION });

async function sendNewAccountEmail(data) {
  console.log("Sending new account email");
  const ToAddresses = ["Matt <matt@chesscentre.online>"];

  const params = {
    Source: "The Chess Centre <support@chesscentre.online>",
    Destination: {
      ToAddresses
    },
    Message: {
      Subject: { Data: `${ENV} | New Account Created` },
      Body: {
        Text: { Data: `New Account Created for ${data.given_name} ${data.family_name}` },
        Html: { Data: `
        <h3 style="color: #047481">♟️ The Chess Centre</h3>
        <h4 style="color: #f0802b">New Account Created</h4>
        <p>ID: ${data.sub}</p>
        <p>Name: ${data.given_name} ${data.family_name}</p>
        <p>Email verified: ${data.email_verified}</p>
        <p>Email: ${data.email}</p>
        `
      }
      }
    }
  };
  return SES.sendEmail(params).promise();
}

exports.sendNewAccountEmail = sendNewAccountEmail;