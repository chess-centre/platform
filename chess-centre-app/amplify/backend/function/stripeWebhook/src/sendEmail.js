const AWS = require("aws-sdk");
const env = process.env.ENV;
const region = process.env.REGION;
const SES = new AWS.SES({ region: region });

async function sendMembershipEmailInternal({ email, name, stripeEmail, price, stripeFriendlyProductName }) {
  console.log("Sending internal membership email to us:", name, email, env);

  const ToAddresses = ["Matt <matt@chesscentre.online>"];
  
  const params = {
    Source: "Sheffield Chess Centre <support@chesscentre.online>",
    Destination: {
      ToAddresses
    },
    Message: {
      Subject: { Data: `New Membership Confirmed! ${env === "prod" ? "" : env}` },
      Body: {
        Text: { Data: `New Membership for ${name}` },
        Html: { Data: `<h3 style="color: #047481">♟️ Membership</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Payment Email: ${stripeEmail}</p>
        <p>Price: £${price / 100}</p>
        ${stripeFriendlyProductName && `<p>Type: ${stripeFriendlyProductName}</p>`}
        ${email !== stripeEmail && `<p><span style="color: #FF0000;">Be aware:</span> The account email and the strip email differ!</p>`}
        `
      }
      }
    }
  };
  return SES.sendEmail(params).promise();
}

async function sendMembershipEmailToMember({ email, name }) {
  console.log("Sending membership email to new member:", name, email);
  const params = {
    Source: "Sheffield Chess Centre <support@chesscentre.online>",
    Destination: {
      BccAddresses: [
        "Sheffield Chess Centre <support@chesscentre.online>",
      ],
      ToAddresses: [email],
    },
    Message: {
      Subject: { Data: `Sheffield Chess Centre | Membership Confirmed` },
      Body: {
        Text: { Data: `Hi ${name},\r\n Thank you for joining Sheffield Chess Centre! More information to come.` },
        Html: { Data: `<h2 style="color: #047481">♟️ Sheffield Chess Centre</h2>
        <p>Hello ${name} 👋</p>
        <p>This email is to confirm your membership sign up.</p> 
        <p>Thank you for joining our fantastic chess community ❤️</p> 
        <p>🏠 Our location: <span style="color: #047481">329A Coleford Road, Sheffield, S9 5NF</span></p>
        <p>If you have any questions please don't hesitate to email us at: info@chesscentre.online</p>
        <p>We look forward to seeing you soon! 🚀</p>
        <p style="color: #9da4a5;font-size:10px;">ps. Memberships can be cancelled at anytime, no questions asked. If you have any problems just pop us a quick email and we'll gladly assist.</p>
        `
      }
      }
    }
  };
  return SES.sendEmail(params).promise();
}

async function sendRegisteredEventEmailToMember({ email, name, eventName, eventType, eventId, startDate, arrivalTime }) {
  console.log("Sending member registration email to:", name, email, eventName);
  const params = {
    Source: "Sheffield Chess Centre <support@chesscentre.online>",
    Destination: {
      BccAddresses: [
        "Sheffield Chess Centre <support@chesscentre.online>"
      ],
      ToAddresses: [email],
    },
    Message: {
      Subject: { Data: `${eventName} | Entry Confirmed` },
      Body: {
        Text: { Data: `Hi ${name},\r\n Thank you for registering for our ${eventName} on ${startDate}.` },
        Html: { Data: `<h2 style="color: #047481">♟️ Sheffield Chess Centre</h2>
        <p>Hello ${name} 👋</p>
        <p>Thank you for registering for our <strong>${eventName}</strong>.</p> 
        <p>The key details for this event:</p>
        <p>📅 Date: ${formatDate(startDate)}</p>
        ${arrivalTime ? `<p>⌚ Arrival Time: ${arrivalTime}</p>` : ""}
        <p>🏠 Our location: <span style="color: #047481">329A Coleford Road, Sheffield, S9 5NF</span></p>
        <p>More details can be found here:
          <a href="https://www.chesscentre.online/events/${eventType}/${eventId}">chesscentre.online/${eventType}</a>
        </p>
        <p>If you have any questions or need to withdraw your entry, please email us at: info@chesscentre.online</p>
        <p>We look forward to seeing you soon! 🚀</p>
        <p></p>
        <p style="color: #9da4a5;font-size:10px;">ps. If you don't see your entry on our list, this maybe because the payment didn't succeed, just drop us a quick email and we can help.</p>
        `
      }
      }
    }
  };
  return SES.sendEmail(params).promise();
}

async function sendRegisteredEventEmailToMemberJuniorCustom({ email, name, eventName, eventType, eventId, startDate, arrivalTime, section }) {
  console.log("Sending member registration email to:", name, email, eventName);
  const params = {
    Source: "Sheffield Chess Centre <support@chesscentre.online>",
    Destination: {
      BccAddresses: [
        "Sheffield Chess Centre <support@chesscentre.online>"
      ],
      ToAddresses: [email],
    },
    Message: {
      Subject: { Data: `${eventName} | Entry Confirmed` },
      Body: {
        Text: { Data: `Hi ${name},\r\n Thank you for registering for our ${eventName} on ${startDate}.` },
        Html: { Data: `
        <p>👋 Hello ${name} <span style="color: #6e6e76;">(or parent / guardian of)</span></p>
        <p>Thank you for registering for our <strong>${eventName}</strong>.</p>
        <p>The key details for this event:</p>
        <p>📅 Date: ${formatDate(startDate)}</p>
        ${arrivalTime ? `<p>⌚ Arrival Time: ${arrivalTime}</p>` : ""}
        <p>🤓 Section entered: ${section}</p> 
        <p>🏫 Event location: <span style="color: #047481;">Ilkley Grammar School, Armitage Hall, LS29 8TH</span></p>
        <p style="font-style: italic;">Entrance via Springs Lane</p>
        <p>ℹ️ More details can be found here:
          <a href="https://www.chesscentre.online/events/igs-junior/${eventId}">chesscentre.online/${eventType}</a>
        </p>
        <p>If you have any questions or need to withdraw your entry, please email us at: 
          <a href="mailto:info@chesscentre.online?subject=${eventName}%20|%20Entry%20Enquiry%20(${name})">info@chesscentre.online</a>
        </p>
        <p>We look forward to seeing you soon! 🚀</p>
        <p></p>
        <p style="color: #047481">This event was brought to you by Sheffield Chess Centre, Ilkley ❤️</p>
        <p style="color: #9da4a5;font-size:12px;">ps. If you don't see your entry on our list, this maybe because the payment didn't succeed, just drop us a quick email and we can help.</p>
        `
      }
      }
    }
  };
  return SES.sendEmail(params).promise();
}

async function sendRegisteredEventEmailToMemberFestival({ email, name, eventName, eventType, eventId, startDate, endDate, section }) {
  console.log("Sending member registration email to:", name, email, eventName);
  const params = {
    Source: "Sheffield Chess Centre <support@chesscentre.online>",
    Destination: {
      BccAddresses: [
        "Sheffield Chess Centre <support@chesscentre.online>"
      ],
      ToAddresses: [email],
    },
    Message: {
      Subject: { Data: `${eventName} | Entry Confirmed` },
      Body: {
        Text: { Data: `Hi ${name},\r\n Thank you for registering for our ${eventName} on ${startDate}.` },
        Html: { Data: `
        <p>👋 Hello ${name}</p>
        <p>Thank you for registering for our <strong>${eventName}</strong>.</p>
        <p>The key details for this event:</p>  
        <p>📅 <strong>Date:</strong> ${formatDate(startDate)} - ${formatDate(endDate)}</p>
        <p>🤓 <strong>Section entered:</strong> ${section}</p>
        <p>🏫 <strong>Event location:</strong> <span style="color: #047481;">King's Hall & Winter Garden, Station Road, Ilkley, LS29 8HB</span></p>
        <p>📊 <strong>ECF rating:</strong> Newly registered accounts will have their rating automatically checked (if you have one).<p>
        <p>ℹ️ More details can be found here:
          <a href="https://www.chesscentre.online/events/festival/${eventId}">chesscentre.online/${eventType}</a>
        </p>
        <p>If you have any questions or need to withdraw your entry, please email us at: 
          <a href="mailto:info@chesscentre.online?subject=${eventName}%20|%20Entry%20Enquiry%20(${name})">info@chesscentre.online</a>
        </p>
        <p>We look forward to seeing you soon! 🚀</p>
        <p></p>
        <p>This event was brought to you by <span style="color: #047481"><strong>Sheffield Chess Centre</strong></span>, Ilkley ❤️</p>
        <p style="color: #9da4a5;font-size:12px;">ps. If you don't see your entry on our list, this maybe because the payment didn't succeed, just drop us a quick email and we can help.</p>
        `
      }
      }
    }
  };
  return SES.sendEmail(params).promise();
}

async function sendRegisteredEventEmailInternal({ email, name, eventName, eventType, eventId, startDate, entries, section }) {
  console.log("Sending internal registration email to:", name, email, eventName, env);

  const ToAddresses = ["Matt <matt@chesscentre.online>"];

  const params = {
    Source: "Sheffield Chess Centre <support@chesscentre.online>",
    Destination: {
      ToAddresses
    },
    Message: {
      Subject: { Data: `New Entry: ${eventName} ${formatDate(startDate)} | ${env === "prod" ? "" : env}` },
      Body: {
        Text: { Data: `New Entry Confirmed: ${eventName} (${formatDate(startDate)}) | ${name}` },
        Html: { Data: `
        <style>
          table, th, td {
            border: 0.5px solid grey;
            padding-right: 2px;
            padding-left: 2px;
            font-size:xx-small;
          }
        </style>
        <h3 style="color: #047481">♟️ Sheffield Chess Centre</h2>
        <p>Entry Name: ${name}</p>
        ${section && `<p>Section: ${section}</p>`}
        <p>Event: ${eventName}</p>
        <p>Date: ${formatDate(startDate)}</p>
        <p>Total Entries: ${entries.length + 1}</p>
        <div>
            ${entriesTable(entries, eventName)}
        </div>
        <p>Info Check: <a href="https://www.chesscentre.online/events/${eventType}/${eventId}">chesscentre.online/${eventType}</a></p>
        `
      }
      }
    }
  };
  return SES.sendEmail(params).promise();
}

function entriesTable(entries, eventName) {

  if(!entries.length) return "";

  let ratingTitle = "Standard";
  let apiType = "S";
  let ratingProp = "ecfRating";

  if(eventName.includes("Rapid")) {
    ratingTitle = "Rapid";
    apiType = "R";
    ratingProp = "ecfRapid";
  }

  const currentYear = new Date().getFullYear();
  const genURL = (ecfId) => `https://www.ecfrating.org.uk/v2/new/list_games_player.php?domain=${apiType}&year=${currentYear}&show_games=on&show_ratings=on&ECF_code=${ecfId}`;

  const rows = entries
    .sort((a, b) => Number(b?.member[ratingProp]) - Number(a?.member[ratingProp]))
    .reduce((pre, { member }) => {
      const url = member.ecfId ? `<a href="${genURL(member.ecfId)}">${member.ecfId}</a>` : "Pending";
      const rating = member[ratingProp] ? (member[ratingProp] === "0" ? "unrated" : member[ratingProp]) : member[ratingProp];
      const row = `<tr align="left">
        <td>${url}</td>
        <td>${member.name}</td>
        <td align="centre">${rating || ""}</td>
      </tr>`;
      pre.push(row);
      return pre;
  }, [])
  .join("");

  return `
    <p>Current entries list:</p>
    <table>
      <tr align="left">
        <th>Code</th>
        <th>Name</th>
        <th>${ratingTitle}</th>
      </tr>
      ${rows}
    </table>`;
};

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

exports.sendMembershipEmailInternal = sendMembershipEmailInternal;
exports.sendMembershipEmailToMember = sendMembershipEmailToMember;
exports.sendRegisteredEventEmailToMember = sendRegisteredEventEmailToMember;
exports.sendRegisteredEventEmailInternal = sendRegisteredEventEmailInternal;
exports.sendRegisteredEventEmailToMemberJuniorCustom = sendRegisteredEventEmailToMemberJuniorCustom;
exports.sendRegisteredEventEmailToMemberFestival = sendRegisteredEventEmailToMemberFestival;