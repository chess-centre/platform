import { MemoryRouter } from "react-router-dom";
import { EventCard } from "./AppEventCard";

export default {
  title: "EventCard",
  component: EventCard,
  decorators: [(Story) => <MemoryRouter>{Story()}</MemoryRouter>],
};

const Template = (args) => <EventCard {...args} />;

export const Congress = Template.bind({});
Congress.args = {
  id: "1",
  eventId: "1",
  name: "Open Congress",
  description: "ECF Rated Event",
  entries: [],
  type: {
    name: "Open Congress",
    color: "yellow",
    maxEntries: 18,
    defaultPrice: 20,
    description: "ECF Rated Event",
  },
  startDate: "",
  endDate: "",
  time: "",
  allowedToRegister: false,
  full: false,
  isLive: false,
  registered: false,
  maxEntries: 18,
  entryCount: 2,
  color: "yellow",
  rounds: 5,
  register: "",
  showModal: "",
  setIsSlideOutOpen: () => {},
};
