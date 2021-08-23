const AWS = require("aws-sdk");
const fetchPotentialInfo = require("./ecfPreflightCheck").fetchPotentialInfo;
const { REGION, ENV } = process.env;
const SES = new AWS.SES({ region: REGION });

async function sendNewAccountEmail(data) {

  const name = `${data.given_name} ${data.family_name}`;
  console.log(`Checking if player is already ECF member. ${name}`);
  const potentialPlayers = await fetchPotentialInfo(name).catch((error) => {
    console.log(error);
    return { success: false };
  });
  console.log(potentialPlayers);
  const table = playerTable(JSON.parse(potentialPlayers));

  console.log("Sending new account email");
  const ToAddresses = ["Matt <matt@chesscentre.online>"];

  const params = {
    Source: "The Chess Centre <support@chesscentre.online>",
    Destination: {
      ToAddresses
    },
    Message: {
      Subject: { Data: `New Account Created | ${ENV}` },
      Body: {
        Text: { Data: `New Account Created for ${name}` },
        Html: { Data: `
        <style>
          table, th, td {
            border: 0.5px solid grey;
            padding-right: 2px;
            padding-left: 2px;
            font-size:xx-small;
          }
        </style>
        <h3 style="color: #047481">♟️ The Chess Centre</h3>
        <h4 style="color: #f0802b">New Account Created</h4>
        <p>Name: ${data.given_name} ${data.family_name}</p>
        <p>Email verified: ${data.email_verified}</p>
        <p>Email: ${data.email}</p>
        <div>
          ${table}
        </div>
        `
      }
      }
    }
  };
  return SES.sendEmail(params).promise();
}

const playerTable = ({ success, players }) => {
  if(!success) return null;
  const rows = players
    .reduce((pre, cur) => {
      const row = `<tr align="left">
      <td>${cur.ECF_code}</td>
        <td>${cur.full_name}</td>
        <td>${cur.club_name}</td>
      </tr>`;
      pre.push(row);
      return pre;
  }, [])
  .join("");

  return `
    <p>Possibly the following player(s)</p>
    <table>
      <tr align="left">
        <th>Code</th>
        <th>Name</th>
        <th>Club</th>
      </tr>
      ${ rows }
    </table>`;
};

exports.sendNewAccountEmail = sendNewAccountEmail;