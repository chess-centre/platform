export default function prettyDate(start, end) {
  if(!end || start === end) {
    return formatDate(start).replace(",", "");
  } else {
    // we want to remove the "month" to shorten the string
    // FROM:  Sat, 22 May - Sun, 23 May 
    // TO:    Sat 22 - Sun 23 May 
    const dateStr = `${formatDate(start).slice(0, 7).replace(",", "")} - ${formatDate(end).replace(",", "")}`;
    return dateStr;
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}