
export function prettyDate(start, end) {
  console.log(start);
  if(!end || start === end) {
    return formatDate(start).replace(",", "");
  } else {
    // we want to remove the "month" to shorten the string
    // FROM:  Sat, 22 May - Sun, 23 May 
    // TO:    Sat 22 - Sun 23 May 
    const dateStr = `${formatDate(start).slice(0, 7).replace(",", "")}, ${formatDate(end).replace(",", "")}`;
    return dateStr;
  }
};

export function prettyLongDate(start, end) {
  if(!end || start === end) {
    return formatLongDate(start).replace(",", "");
  } else {
    // we want to remove the "month" to shorten the string
    // FROM:  Saturday, 22 August - Sunday, 23 August
    // TO:    Saturday 22 - Sunday 23 August 
    const dateStr = `${formatLongDate(start).slice(0, 7).replace(",", "")}, ${formatLongDate(end).replace(",", "")}`;
    return dateStr;
  }
};

export function getMonth(date) {
  return Intl.DateTimeFormat('en', { month: 'short'}).format(new Date(date));
};

export function getDay(date) {
  return Intl.DateTimeFormat('en', { day: "2-digit" }).format(new Date(date));
};

export function getYear(date) {
  return Intl.DateTimeFormat('en', { year: "numeric"}).format(new Date(date));
};

export function getDayStr(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex = new Date(date).getDay();
  return days[dayIndex];
};

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

function formatLongDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}