const AWS = require("aws-sdk");
const { REGION, ENV } = process.env;
const SES = new AWS.SES({ region: REGION });

async function sendRatingUpdateEmail(members, erredChecks, erredMembers) {
  console.log("Sending update email");
  const ToAddresses = ["Matt <matt@chesscentre.online>"];

  const errerMemberList = (members) => {
    if(members.length > 0) {
      const list = `<ol>` + members.map(m => `<li>${m.ecfId} - ${m.name}</li>`).join("") + "</ol>";
      return list;
    }
    return "";
  }

  const ratingChangeTable = (members, type) => {
    const prop = type === "standard" ? "oldRating" : "oldRapid";
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    const rows = members
      .sort((a, b) => {
        const _b = Number(b[prop]) ? Number(b[prop]) : 0;
        const _a = Number(a[prop]) ? Number(a[prop]) : 0;
        return _b - _a;
      })
      .reduce((pre, cur, index) => {
        const previousR = type === "standard" ? Number(cur.oldRating) : Number(cur.oldRapid);
        const previousRating = Number(previousR) ? Number(previousR) : 0;
        const currentRating = Number(cur[type].revised_rating) ? Number(cur[type].revised_rating) : 0;
        const diff = currentRating - previousRating;
        const changeColor = currentRating > previousRating ? "green" : currentRating < previousRating ? "red" : "black";
        const profileUrl = `https://www.ecfrating.org.uk/v2/new/list_games_player.php?domain=${type === "standard" ? "S" : "R"}&year=${currentYear}&show_games=on&show_ratings=on&ECF_code=${cur.ecfId}`;
        const APIUrl = `https://www.ecfrating.org.uk/v2/new/api.php?v2/ratings/${type === "standard" ? "S" : "R"}/${cur.ecfId}/${currentYear}-${currentMonth + 1}-${currentDay}`;

        const row = `<tr>
          <td align="center">${index + 1}</td>
          <td align="left">${cur.name}</td>
          <td align="center">${previousRating }</td>
          <td align="center">${currentRating }</td>
          <td align="center" style="color: ${changeColor}">${diff}</td>
          <td align="center">
            <a href="${profileUrl}">view</a>
          </td>
          <td align="center">
            <a href="${APIUrl}">check</a>
          </td>
        </tr>`;
        pre.push(row);
        return pre;
    }, [])
    .join("");

    return `
      <table>
        <tr align="left">
          <th>No.</th>
          <th>Name</th>
          <th>Previous</th>
          <th>Latest</th>
          <th>+/-</th>
          <th>Profile</th>
          <th>API</th>
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
      Subject: { Data: `ECF Ratings updated!` },
      Body: {
        Text: { Data: `The ECF ratings for all players have now been updated!` },
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
        <h4 style="color: #f0802b">📊 ECF Rating tracker complete</h4>
        <p>Total records checked: ${members.length}</p>      
        <p>📈 Standard rating changes:</p>
        <div>
          ${ratingChangeTable(members, 'standard')}
        </div>
        <p>📈 Rapid rating changes:</p>
        <div>
          ${ratingChangeTable(members, 'rapid')}
        </div>
        <div>
          <p>Total records unable to validate: ${erredChecks}</p>
          ${errerMemberList(erredMembers)}
        </div>
        <p style="color: #9da4a5;font-size:14px;">This rating scheduler runs every week to capture rating changes across all our members. It relies on having an accurate ECF player ID.</p>
        <p style="color: #9da4a5;font-size:14px;">Notes: The above "previous" ratings relate only to the previous record we held and not the previously published ECF rating.</p>
        `}
      }
    }
  };
  return SES.sendEmail(params).promise();
}

exports.sendRatingUpdateEmail = sendRatingUpdateEmail;