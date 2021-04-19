const data = [
  {
    title: "Adult",
    price: "£20",
    subHeading: "Our standard club membership offering.",
    benefits: [
    {
      name: "Weekly rated match chess",
      iconClasses: "fas fa-chess-clock-alt"
    },
    {
      name: "Wide range of club events and competitions",
      iconClasses: "fad fa-trophy-alt"
    },
    {
      name:  "Live games",
      iconClasses: "fad fa-broadcast-tower"
    },
    {
      name: "Weekly social chess",
      iconClasses: "fad fa-glass-cheers"
    },
    {
      name: "Game and results tracking",
      iconClasses: "fad fa-analytics"
    }
    ],
    buttonColour: "bg-teal-600 hover:bg-teal-500",
    pillColour: "bg-pink-700",
    plan: "adult",
  },
  {
    title: "Junior",
    price: "£20",
    subHeading: "Our tailored membership offering.",
    benefits: [
      {
        name: "Weekly training sessions",
        iconClasses: "fas fa-chess-knight"
      },
      {
        name: "Tailored development curriculum",
        iconClasses: "fad fa-user-graduate"
      },
      {
        name: "Custom events and competitions",
        iconClasses: "far fa-trophy"
      },
      {
        name: "Professional coaching and tuition",
        iconClasses: "fas fa-presentation"
      },
      {
        name: "Track results and progress",
        iconClasses: "far fa-user-chart"
      }
    ],
    buttonColour: "bg-teal-600 hover:bg-teal-500",
    pillColour: "bg-pink-700",
    plan: "junior",
  },
  {
    title: "Student / Senior",
    price: "£10",
    subHeading: "We are delighted to be able to offer half-price on our membership to full-time students and senior citizens.",
    benefits: [],
    buttonColour: "bg-orange-600 hover:bg-orange-500",
    pillColour: "bg-black",
    plan: "student-senior",
  },
  {
    title: "Family",
    price: "£10",
    subHeading: "The chess obsession spreading throughout the household? Additional family members can join for half-price.",
    benefits: [],
    buttonColour: "bg-orange-600 hover:bg-orange-500",
    pillColour: "bg-black",
    plan: "family",
  },
];

export default data;
