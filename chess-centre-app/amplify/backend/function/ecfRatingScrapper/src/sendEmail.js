const AWS = require("aws-sdk");
const { REGION, ENV } = process.env;
const SES = new AWS.SES({ region: REGION });

async function sendRatingUpdateEmail(members) {
  console.log("Sending update email");
  const ToAddresses = ["Matt <matt@chesscentre.online>"];

  if(ENV.includes("prod")) {
    ToAddresses.push("Andy <andy@chesscentre.online>");
  }

  const ratingChangeTable = (members, type) => {
    const prop = type === "standard" ? "oldRating" : "oldRapid";
    const rows = members
      .sort((a, b) => Number(b[prop] - Number(a[prop])))
      .reduce((pre, cur) => {
        const previousRating = type === "standard" ? Number(cur.oldRating) : Number(cur.oldRapid);
        const currentRating = Number(cur[type].original_rating);
        const row = `<tr>
          <td>${cur.name}</td>
          <td align="center">${previousRating }</td>
          <td align="center">${currentRating}</td>
          <td>${previousRating - currentRating}</td>
        </tr>`;
        pre.push(row);
        return pre;
    }, [])
    .join("");

    return `
      <table>
        <tr align="left">
          <th>Name</th>
          <th>Previous</th>
          <th>New</th>
          <th>+/-</th>
        </tr>
        ${ rows }
      </table>`;
  };

  const params = {
    Source: "The Chess Centre <support@chesscentre.online>",
    Destination: {
      ToAddresses
    },
    Message: {
      Subject: { Data: `ECF Ratings Updated!` },
      Body: {
        Text: { Data: `The ECF ratings for all players have now been updated!` },
        Html: { Data: `
        <style>
          table, th, td {
            border: 0.5px solid grey;
            padding-right: 2px;
            padding-left: 2px;
          }
        </style>
        <h3 style="color: #047481">♟️ The Chess Centre</h3>
        <h4 style="color: #f0802b">📊 Member Ratings Update!</h4>
        <p>Total records checked: ${members.length}</p>
        <p>📈 Standard rating changes:</p>
        <div>
          ${ratingChangeTable(members, 'standard')}
        </div>
        <p>📈 Rapid rating changes:</p>
        <div>
          ${ratingChangeTable(members, 'rapid')}
        </div>
        <p style="color: #9da4a5;font-size:14px;">This rating scheduler runs every week to capture rating changes across all our members. It relies on having an accurate ECF player ID.</p>
        `
      }
      }
    }
  };
  return SES.sendEmail(params).promise();
}

exports.sendRatingUpdateEmail = sendRatingUpdateEmail;