const JuniorClub = {
    name: "Junior Club",
    description: "To book a place in a Junior coaching session. Contact us.",
    url: "",
    time: "6:00pm onwards",
    color: "bg-yellow-50"
};

const JuniorRapidPlay = {
    name: "Junior RapidPlay (u16)",
    description: "5 Round - ECF Graded 25min per player events.",
    url: "",
    color: "bg-green-50"
};

const Congress = {
    name: "Open Congress",
    description: "5 Round - ECF Graded Long Play matches.",
    url: "",
    color: "bg-blue-50"
};

const RapidPlay = {
    name: "Open RapidPlay",
    description: "5 Round - ECF Graded 25min per player events.",
    url: "",
    color: "bg-orange-50"
};

const MatchNight = {
    name: "Match Night",
    description: "Organised graded match events, including leagues and competitions.",
    url: "",
    color: "bg-brown-50"
};

const ClubNight = {
    name: "Club Night 🎉",
    description: "Social Chess for members and guests.",
    time: "7:00pm onwards",
    url: "",
    color: "bg-white-100"
};

const eventDetails = [
    // MAY
    {
        ...JuniorClub,
        date: new Date(2021, 5, 18),
        textDate: "Tuesday 18th May"
    },
    {
        ...MatchNight,
        date: new Date(2021, 5, 18),
        textDate: "Tuesday 18th May"
    },
    {
        ...ClubNight,
        date: new Date(2021, 5, 20),
        textDate: "Thursday 20th May"
    },
    {
        ...Congress,
        date: new Date(2021, 5, 22),
        textDate: "Saturday 22nd, Sunday 23rd May"
    },
    {
        ...JuniorClub,
        date: new Date(2021, 5, 25),
        textDate: "Tuesday 25th May"
    },
    {
        ...MatchNight,
        date: new Date(2021, 5, 25),
        textDate: "Tuesday 25th May"
    },
    {
        ...ClubNight,
        date: new Date(2021, 5, 27),
        textDate: "Thursday 27th May"
    },
    {
        ...RapidPlay,
        date: new Date(2021, 5, 29),
        textDate: "Saturday 29th May"
    },
    // JUNE
    {
        ...JuniorClub,
        date: new Date(2021, 6, 1),
        textDate: "Tuesday 1st June"
    },
    {
        ...MatchNight,
        date: new Date(2021, 6, 1),
        textDate: "Tuesday 1st June"
    },
    {
        ...ClubNight,
        date: new Date(2021, 6, 3),
        textDate: "Thursday 3rd June"
    },
    {
        ...JuniorRapidPlay,
        date: new Date(2021, 6, 5),
        textDate: "Thursday 5th June"
    },
    {
        ...JuniorClub,
        date: new Date(2021, 6, 8),
        textDate: "Tuesday 8th June"
    },
    {
        ...MatchNight,
        date: new Date(2021, 6, 8),
        textDate: "Tuesday 8th June"
    },
    {
        ...ClubNight,
        date: new Date(2021, 6, 10),
        textDate: "Thursday 10th June"
    },
    {
        ...JuniorClub,
        date: new Date(2021, 6, 15),
        textDate: "Tuesday 15th June"
    },
    {
        ...MatchNight,
        date: new Date(2021, 6, 15),
        textDate: "Tuesday 15th June"
    },
    {
        ...ClubNight,
        date: new Date(2021, 6, 17),
        textDate: "Thursday 17th June"
    },
    {
        ...Congress,
        date: new Date(2021, 5, 19),
        textDate: "Saturday 19th, Sunday 20th June"
    },
    {
        ...JuniorClub,
        date: new Date(2021, 6, 22),
        textDate: "Tuesday 22nd June"
    },
    {
        ...MatchNight,
        date: new Date(2021, 6, 22),
        textDate: "Tuesday 22nd June"
    },
    {
        ...ClubNight,
        date: new Date(2021, 6, 24),
        textDate: "Thursday 24th June"
    },
    {
        ...RapidPlay,
        date: new Date(2021, 6, 26),
        textDate: "Thursday 26th June"
    },
    {
        ...JuniorClub,
        date: new Date(2021, 6, 29),
        textDate: "Tuesday 29th June"
    },
    {
        ...MatchNight,
        date: new Date(2021, 6, 29),
        textDate: "Tuesday 29th June"
    },
    // JULY
    {
        ...ClubNight,
        date: new Date(2021, 7, 1),
        textDate: "Thursday 1st July"
    },
    {
        ...JuniorRapidPlay,
        date: new Date(2021, 7, 3),
        textDate: "Saturday 3rd July"
    },
    {
        ...JuniorClub,
        date: new Date(2021, 7, 6),
        textDate: "Tuesday 6th July"
    },
    {
        ...MatchNight,
        date: new Date(2021, 7, 6),
        textDate: "Tuesday 6th July"
    },
    {
        ...ClubNight,
        date: new Date(2021, 7, 8),
        textDate: "Thursday 8th July"
    },
    {
        ...Congress,
        date: new Date(2021, 7, 10),
        textDate: "Saturday 10th, Sunday 11th July"
    },
    {
        ...JuniorClub,
        date: new Date(2021, 7, 13),
        textDate: "Tuesday 13th July"
    },
    {
        ...MatchNight,
        date: new Date(2021, 7, 13),
        textDate: "Tuesday 13th July"
    },
    {
        ...ClubNight,
        date: new Date(2021, 7, 15),
        textDate: "Thursday 15th July"
    },
    {
        ...ClubNight,
        date: new Date(2021, 7, 20),
        textDate: "Tuesday 20th July"
    },
    {
        ...MatchNight,
        date: new Date(2021, 7, 20),
        textDate: "Tuesday 20th July"
    },
    {
        ...ClubNight,
        date: new Date(2021, 7, 22),
        textDate: "Thursday 22nd July"
    },
    {
        ...RapidPlay,
        date: new Date(2021, 7, 24),
        textDate: "Saturday 24th July"
    },
    {
        ...JuniorClub,
        date: new Date(2021, 7, 27),
        textDate: "Thursday 27th July"
    },
    {
        ...MatchNight,
        date: new Date(2021, 7, 27),
        textDate: "Thursday 27th July"
    },
    {
        ...ClubNight,
        date: new Date(2021, 7, 29),
        textDate: "Thursday 29th July"
    },
    // August
    {
        ...JuniorClub,
        date: new Date(2021, 8, 3),
        textDate: "Tuesday 3rd August"
    },
    {
        ...MatchNight,
        date: new Date(2021, 8, 3),
        textDate: "Tuesday 3rd August"
    },    
    {
        ...ClubNight,
        date: new Date(2021, 8, 5),
        textDate: "Thursday 5th August"
    },
    {
        ...JuniorClub,
        date: new Date(2021, 8, 10),
        textDate: "Tuesday 10th August"
    },
    {
        ...ClubNight,
        date: new Date(2021, 8, 12),
        textDate: "Thursday 12th August"
    },
    {
        ...JuniorClub,
        date: new Date(2021, 8, 17),
        textDate: "Tuesday 17th August"
    },
    {
        ...MatchNight,
        date: new Date(2021, 8, 17),
        textDate: "Tuesday 17th August"
    },
    {
        ...ClubNight,
        date: new Date(2021, 8, 19),
        textDate: "Thursday 19th August"
    },
    {
        ...Congress,
        date: new Date(2021, 8, 21),
        textDate: "Saturday 21st, Sunday 22nd August"
    },
    {
        ...JuniorClub,
        date: new Date(2021, 8, 24),
        textDate: "Tuesday 24th August"
    },
    {
        ...MatchNight,
        date: new Date(2021, 8, 24),
        textDate: "Tuesday 24th August"
    },
    {
        ...ClubNight,
        date: new Date(2021, 8, 26),
        textDate: "Tuesday 26th August"
    },
    {
        ...RapidPlay,
        date: new Date(2021, 8, 28),
        textDate: "Saturday 28th August"
    },
    {
        ...JuniorClub,
        date: new Date(2021, 8, 31),
        textDate: "Saturday 31st August"
    },
    {
        ...MatchNight,
        date: new Date(2021, 8, 31),
        textDate: "Saturday 31st August"
    }
];

const getEventDetails = month => eventDetails.filter(d => d.textDate.includes(month));

export default getEventDetails;