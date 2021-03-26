import { eventDetails } from "../../api/mock.events";

const getEventDetails = (month) =>
  eventDetails.filter((d) => d.textDate.includes(month));

export default getEventDetails;
