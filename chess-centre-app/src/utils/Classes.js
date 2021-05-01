

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
};

export function bgColor900(color) {
  switch (color) {
    case "blue":
      return "bg-blue-900";
    case "orange":
      return "bg-orange-900";
    case "teal":
      return "bg-teal-900";
    case "pink":
      return "bg-pink-900";
    case "green":
      return "bg-green-900";
    case "yellow":
      return "bg-yellow-900";
    default:
      return "bg-teal-700";
  }
};

export function bgColor700(color) {
  switch (color) {
    case "blue":
      return "bg-blue-700";
    case "orange":
      return "bg-orange-700";
    case "teal":
      return "bg-teal-700";
    case "pink":
      return "bg-pink-700";
    case "green":
      return "bg-green-700";
    case "yellow":
      return "bg-yellow-700";
    default:
      return "bg-teal-700";
  }
};