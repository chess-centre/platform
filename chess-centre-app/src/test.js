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

const getHistoricRatings = async (id, type = "S") => {
  const currentDate = new Date();
  const urls = [];
  for (let month = 0; month < 5; month++) {
    const date = new Date(currentDate.setMonth(currentDate.getMonth() - month));
    const ratingUrl = url(id, type, date.toISOString().split("T")[0]);
    urls.push(ratingUrl);
  }
  const data = await Promise.all(urls.map(fetchData));
  return data.map((result) => {
    const { effective_date, original_rating, domain } = JSON.parse(result);
    return {
      month: effective_date,
      rating: original_rating ? original_rating : 0,
      type: domain === "S" ? "standard" : "rapid",
    };
  });
};

(async () => {
  const info = await getHistoricRatings("185834", "S");
  console.log(info);
})();
