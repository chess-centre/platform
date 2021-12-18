const https = require("https");

const url = (id, type = "S", date) => {
  return `https://www.ecfrating.org.uk/v2/new/api.php?v2/ratings/${type}/${id}/${date}`;
};

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        resolve(data);
      });
      response.on("error", (e) => {
        reject("error", e);
      });
    });
  });
};

const getRatings = async (id, type = "S") => {
  const urls = [];
  for (let month = 0; month < 5; month++) {
    const currentDate = new Date();
    const date = new Date(currentDate.setMonth(currentDate.getMonth() - month));
    const ratingUrl = url(id, type, date.toISOString().split("T")[0]);
    urls.push(ratingUrl);
  }
  const data = await Promise.all(urls.map(fetchData));
  if(data && data.length > 0) {
    return data.map((result) => {
      const { effective_date, revised_rating, domain } = JSON.parse(result);
      const month = effective_date ? new Date(effective_date).toLocaleString('default', { month: 'long'}) : '';
      return {
        date: effective_date,
        month,
        standard: domain === "S" ? (revised_rating ? revised_rating : 0 ) : 0,
        rapid: domain === "R" ? (revised_rating ? revised_rating : 0 ) : 0 
      };
    });
  } else {
    return [];
  }

};

exports.getHistoricRatings = async (id) => {
  try {
    const standard = await getRatings(id, "S");
    const rapid = await getRatings(id, "R");
    // merge both arrays:
    return standard.map(info => {
        const r = rapid.find(r => info.date === r.date)?.rapid || 0;
        return {
            ...info,
            rapid: r
        };
    });
  } catch (e) {
    console.log("Error", e);
    return [];
  }
};
