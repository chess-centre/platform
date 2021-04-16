const data = [
  {
    title: "Juniors",
    price: "£20",
    subHeading: "Under 16 as at September 2021.",
    benefits: [
      "Weekly Training Sessions",
      "Tailored Development Curriculum",
      "Custom Events and Competitions",
      "Professional Coaching and Tuition",
    ],
    discounted: false,
    plan: "juniors",
  },
  {
    title: "Premium Member",
    price: "£20",
    subHeading: "Adult Players",
    benefits: [
      "Weekly Social Chess",
      "Weekly Rated Match Chess",
      "Wide Range of Club Events and Competitions",
      "Live Games",
    ],
    discounted: false,
    plan: "premium",
  },
  {
    title: "Student",
    price: "£10",
    subHeading: "Full-time studying? We offer a 50% discount",
    benefits: [
      "Weekly Social Chess",
      "Weekly Rated Match Chess",
      "Wide Range of Club Events and Competitions",
    ],
    discounted: true,
    plan: "student",
  },
  {
    title: "OAP",
    price: "£10",
    subHeading: "Retired. Over 65s",
    benefits: [
      "Weekly Social Chess",
      "Weekly Rated Match Chess",
      "Wide Range of Club Events and Competitions",
    ],
    discounted: true,
    plan: "oap",
  },
];

export default data;
