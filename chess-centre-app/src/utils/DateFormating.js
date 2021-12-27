import moment from 'moment';

export function prettyDate(start, end) {
  if(!end || start === end) {
    return formatDate(start);
  } else {
    return formatDoubleDateMoment(start, end);
  }
};

export function prettyLongDate(start, end) {
  if(!end || start === end) {
    return moment(start).format("dddd Do MMMM")
  } else {
    // we want to remove the "month" to shorten the string
    // FROM:  Saturday, 22 August - Sunday, 23 August
    // TO:    Saturday 22 - Sunday 23 August 
    const dateStr = `${moment(start).format("dddd Do MMMM")}, ${moment(end).format("dddd Do MMMM")}`;
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
  return moment(date).format("ddd Do MMM");
}

function formatDoubleDateMoment(start, end) {
  return `${moment(start).format("ddd Do")}, ${moment(end).format("ddd Do MMM")}`
}

