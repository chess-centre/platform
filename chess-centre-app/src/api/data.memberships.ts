import moment from "moment";

export const Memberships = [
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
      name: "Club events and competitions",
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
    subHeading: "Our tailored junior membership offering.",
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
    title: "Senior",
    price: "£10",
    subHeading: "We are delighted to offer half-price on our standard membership to all our senior citizens.",
    benefits: [{
      name: "Same benefits as a standard membership",
      iconClasses: "fas fa-sparkles"
    }],
    buttonColour: "bg-gray-800 hover:bg-gray-700",
    pillColour: "bg-orange-brand",
    plan: "student-senior",
  },
  {
    title: "Student",
    price: "£10",
    subHeading: `Those under 16 years old before Sept ${moment().format("yyyy")} are eligible for our half-price standard membership.`,
    benefits: [{
      name: "Same benefits as a standard membership",
      iconClasses: "fas fa-sparkles"
    }],
    buttonColour: "bg-gray-800 hover:bg-gray-700",
    pillColour: "bg-orange-brand",
    plan: "student-senior",
  },
];