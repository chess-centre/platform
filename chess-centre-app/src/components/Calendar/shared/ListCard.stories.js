import { MemoryRouter } from 'react-router-dom';
import { ListCard } from './ListCard';

export default {
  title: 'ListCard',
  component: ListCard,
  decorators: [
    (Story) => (
      <MemoryRouter>{Story()}</MemoryRouter>
    )
  ]
};

const Template = (args) => <ListCard {...args} />;

export const Rapidplay = Template.bind({});
Rapidplay.args = { event:
  {
    id: "1",
    url: "test.com",
    color: "teal",
    name: "Open Rapidplay",
    startDate: "10-01-2022",
    time: "9:00",
    rounds: 5,
  }
};

export const Congress = Template.bind({});
Congress.args = { event:
  {
    id: "2",
    url: "test.com",
    color: "red",
    name: "Open Congress",
    startDate: "01-10-2022",
    endDate: "01-11-2022",
    time: "various",
    rounds: 5,
  }
};

export const Blitz = Template.bind({});
Blitz.args = { event:
  {
    id: "3",
    url: "test.com",
    color: "blue",
    name: "Open Blitz",
    startDate: "01-10-2022",
    endDate: "01-11-2022",
    time: "various",
    rounds: 9,
  }
};