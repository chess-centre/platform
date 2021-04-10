const JuniorClub = {
    name: "Junior Club",
    description: "Join our tailored chess coaching sessions.",
    url: "/events/junior",
    time: "6:00pm onwards",
    color: "bg-yellow-50",
  };
  
  const JuniorRapidPlay = {
    name: "Junior RapidPlay (u16)",
    description: "Five Round - ECF Graded 25min per player events.",
    url: "",
    color: "bg-green-50",
  };
  
  const Congress = {
    name: "Open Congress",
    description: "Five Round - ECF Graded Long Play matches.",
    url: "/events/congress",
    color: "bg-blue-50",
  };
  
  const RapidPlay = {
    name: "Open RapidPlay",
    description: "Five Round - ECF Graded 25min per player events.",
    url: "/events/rapidplay",
    color: "bg-orange-50",
  };
  
  const MatchNight = {
    name: "Match Night",
    description:
      "ECF graded matches, including leagues & competitions.",
    time: "7:00pm start",
    url: "",
    color: "bg-brown-50",
  };
  
  const ClubNight = {
    name: "Club Night 🎉",
    description: "Social Chess for members and guests.",
    time: "7:00pm onwards",
    url: "",
    color: "bg-green-50",
  };
  
  export const eventDetails = [
    // MAY
    {
      id: 1,
      ...JuniorClub,
      date: new Date(2021, 5, 18),
      textDate: "Tues, 18th May",
    },
    {
      ...MatchNight,
      date: new Date(2021, 5, 18),
      textDate: "Tues, 18th May",
    },
    {
      ...ClubNight,
      date: new Date(2021, 5, 20),
      textDate: "Thur, 20th May",
    },
    {
      id: 1,
      ...Congress,
      date: new Date(2021, 5, 22),
      textDate: "Sat, 22nd - Sun, 23rd May",
    },
    {
      id: 2,
      ...JuniorClub,
      date: new Date(2021, 5, 25),
      textDate: "Tues, 25th May",
    },
    {
      ...MatchNight,
      date: new Date(2021, 5, 25),
      textDate: "Tues, 25th May",
    },
    {
      ...ClubNight,
      date: new Date(2021, 5, 27),
      textDate: "Thur, 27th May",
    },
    {
      ...RapidPlay,
      date: new Date(2021, 5, 29),
      textDate: "Sat, 29th May",
    },
    // JUNE
    {
      ...JuniorClub,
      date: new Date(2021, 6, 1),
      textDate: "Tues, 1st June",
    },
    {
      ...MatchNight,
      date: new Date(2021, 6, 1),
      textDate: "Tues, 1st June",
    },
    {
      ...ClubNight,
      date: new Date(2021, 6, 3),
      textDate: "Thurs, 3rd June",
    },
    {
      ...JuniorRapidPlay,
      date: new Date(2021, 6, 5),
      textDate: "Thurs, 5th June",
    },
    {
      ...JuniorClub,
      date: new Date(2021, 6, 8),
      textDate: "Tues, 8th June",
    },
    {
      ...MatchNight,
      date: new Date(2021, 6, 8),
      textDate: "Tues, 8th June",
    },
    {
      ...ClubNight,
      date: new Date(2021, 6, 10),
      textDate: "Thurs, 10th June",
    },
    {
      ...JuniorClub,
      date: new Date(2021, 6, 15),
      textDate: "Tues, 15th June",
    },
    {
      ...MatchNight,
      date: new Date(2021, 6, 15),
      textDate: "Tues, 15th June",
    },
    {
      ...ClubNight,
      date: new Date(2021, 6, 17),
      textDate: "Thurs, 17th June",
    },
    {
      ...Congress,
      date: new Date(2021, 5, 19),
      textDate: "Sat, 19th - Sun, 20th June",
    },
    {
      ...JuniorClub,
      date: new Date(2021, 6, 22),
      textDate: "Tues, 22nd June",
    },
    {
      ...MatchNight,
      date: new Date(2021, 6, 22),
      textDate: "Tues, 22nd June",
    },
    {
      ...ClubNight,
      date: new Date(2021, 6, 24),
      textDate: "Thurs, 24th June",
    },
    {
      ...RapidPlay,
      date: new Date(2021, 6, 26),
      textDate: "Thurs, 26th June",
    },
    {
      ...JuniorClub,
      date: new Date(2021, 6, 29),
      textDate: "Tues, 29th June",
    },
    {
      ...MatchNight,
      date: new Date(2021, 6, 29),
      textDate: "Tues, 29th June",
    },
    // JULY
    {
      ...ClubNight,
      date: new Date(2021, 7, 1),
      textDate: "Thurs, 1st July",
    },
    {
      ...JuniorRapidPlay,
      date: new Date(2021, 7, 3),
      textDate: "Sat, 3rd July",
    },
    {
      ...JuniorClub,
      date: new Date(2021, 7, 6),
      textDate: "Tues, 6th July",
    },
    {
      ...MatchNight,
      date: new Date(2021, 7, 6),
      textDate: "Tues, 6th July",
    },
    {
      ...ClubNight,
      date: new Date(2021, 7, 8),
      textDate: "Thurs, 8th July",
    },
    {
      ...Congress,
      date: new Date(2021, 7, 10),
      textDate: "Sat, 10th - Sun, 11th July",
    },
    {
      ...JuniorClub,
      date: new Date(2021, 7, 13),
      textDate: "Tues, 13th July",
    },
    {
      ...MatchNight,
      date: new Date(2021, 7, 13),
      textDate: "Tues, 13th July",
    },
    {
      ...ClubNight,
      date: new Date(2021, 7, 15),
      textDate: "Thurs, 15th July",
    },
    {
      ...ClubNight,
      date: new Date(2021, 7, 20),
      textDate: "Tues, 20th July",
    },
    {
      ...MatchNight,
      date: new Date(2021, 7, 20),
      textDate: "Tues, 20th July",
    },
    {
      ...ClubNight,
      date: new Date(2021, 7, 22),
      textDate: "Thurs, 22nd July",
    },
    {
      ...RapidPlay,
      date: new Date(2021, 7, 24),
      textDate: "Sat, 24th July",
    },
    {
      ...JuniorClub,
      date: new Date(2021, 7, 27),
      textDate: "Thurs, 27th July",
    },
    {
      ...MatchNight,
      date: new Date(2021, 7, 27),
      textDate: "Thurs, 27th July",
    },
    {
      ...ClubNight,
      date: new Date(2021, 7, 29),
      textDate: "Thurs, 29th July",
    },
    // August
    {
      ...JuniorClub,
      date: new Date(2021, 8, 3),
      textDate: "Tues, 3rd August",
    },
    {
      ...MatchNight,
      date: new Date(2021, 8, 3),
      textDate: "Tues, 3rd August",
    },
    {
      ...ClubNight,
      date: new Date(2021, 8, 5),
      textDate: "Thurs, 5th August",
    },
    {
      ...JuniorClub,
      date: new Date(2021, 8, 10),
      textDate: "Tues, 10th August",
    },
    {
      ...ClubNight,
      date: new Date(2021, 8, 12),
      textDate: "Thurs, 12th August",
    },
    {
      ...JuniorClub,
      date: new Date(2021, 8, 17),
      textDate: "Tues, 17th August",
    },
    {
      ...MatchNight,
      date: new Date(2021, 8, 17),
      textDate: "Tues, 17th August",
    },
    {
      ...ClubNight,
      date: new Date(2021, 8, 19),
      textDate: "Thurs, 19th August",
    },
    {
      ...Congress,
      date: new Date(2021, 8, 21),
      textDate: "Sat, 21st - Sun, 22nd August",
    },
    {
      ...JuniorClub,
      date: new Date(2021, 8, 24),
      textDate: "Tues, 24th August",
    },
    {
      ...MatchNight,
      date: new Date(2021, 8, 24),
      textDate: "Tues, 24th August",
    },
    {
      ...ClubNight,
      date: new Date(2021, 8, 26),
      textDate: "Tues, 26th August",
    },
    {
      ...RapidPlay,
      date: new Date(2021, 8, 28),
      textDate: "Sat, 28th August",
    },
    {
      ...JuniorClub,
      date: new Date(2021, 8, 31),
      textDate: "Sat, 31st August",
    },
    {
      ...MatchNight,
      date: new Date(2021, 8, 31),
      textDate: "Sat, 31st August",
    },
  ];