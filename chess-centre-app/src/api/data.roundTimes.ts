// Could be CMS controlled:
export const rounds = [
  {
    type: "festival",
    eventStart: "9:30",
    eventEnd: "14:30",
    rounds: [
      {
        round: 1,
        day: "Friday",
        time: "19:00 - 23:00",
      },
      {
        round: 2,
        day: "Saturday",
        time: "09:30 - 13:30",
      },
      {
        round: 3,
        day: "Saturday",
        time: "14:15 - 18:15",
      },
      {
        round: 4,
        day: "Sunday",
        time: "09:30 - 13:30",
      },
      {
        round: 5,
        day: "Sunday",
        time: "14:15 - 18:15",
      },
    ],
    prizeGiving: {
      time: "18:30",
      day: "Sunday",
    },
  },
  {
    type: "congress",
    eventStart: "9:30",
    eventEnd: "14:30",
    rounds: [
      {
        round: 1,
        day: "Saturday",
        time: "10:00 - 12:00",
      },
      {
        round: 2,
        day: "Saturday",
        time: "12:30 - 14:30",
      },
      {
        round: 3,
        day: "Saturday",
        time: "15:00 - 17:00",
      },
      {
        round: 4,
        day: "Sunday",
        time: "10:00 - 12:00",
      },
      {
        round: 5,
        day: "Sunday",
        time: "12:30 - 14:30",
      },
    ],
    prizeGiving: {
      time: "14:30",
      day: "Sunday",
    },
  },
  {
    type: "rapidplay",
    eventStart: "9:30",
    eventEnd: "15:30",
    rounds: [
      {
        round: 1,
        day: "Saturday",
        time: "10:00 - 10:50",
      },
      {
        round: 2,
        day: "Saturday",
        time: "11:00 - 11:50",
      },
      {
        round: 3,
        day: "Saturday",
        time: "12:30 - 13:20",
      },
      {
        round: 4,
        day: "Saturday",
        time: "13:30 - 14:20",
      },
      {
        round: 5,
        day: "Saturday",
        time: "14:30 - 15:20",
      },
    ],
    break: {
      afterRound: 2
    },
    prizeGiving: {
      time: "15:30",
      day: "Saturday",
    },
  },
  {
    type: "blitz",
    eventStart: "9:30",
    eventEnd: "14:00",
    rounds: [
      {
        round: 1,
        day: "Saturday",
        time: "10:00 - 10:10",
      },
      {
        round: 2,
        day: "Saturday",
        time: "10:20 - 10:30",
      },
      {
        round: 3,
        day: "Saturday",
        time: "10:40 - 10:50",
      },
      {
        round: 4,
        day: "Saturday",
        time: "11:00 - 11:10",
      },
      {
        round: 5,
        day: "Saturday",
        time: "11:20 - 11:30",
      },
      {
        round: 6,
        day: "Saturday",
        time: "12:30 - 12:40",
      },
      {
        round: 7,
        day: "Saturday",
        time: "12:50 - 13:00",
      },
      {
        round: 8,
        day: "Saturday",
        time: "13:10 - 13:20",
      },
      {
        round: 9,
        day: "Saturday",
        time: "13:30 - 13:40",
      },
    ],
    break: {
      afterRound: 5
    },
    prizeGiving: {
      time: "13:50",
      day: "Saturday",
    },
  },
  {
    type: "junior-rapidplay",
    eventStart: "9:30",
    eventEnd: "15:30",
    rounds: [
      {
        round: 1,
        day: "Saturday",
        time: "10:00 - 10:50",
      },
      {
        round: 2,
        day: "Saturday",
        time: "11:00 - 11:50",
      },
      {
        round: 3,
        day: "Saturday",
        time: "12:30 - 13:20",
      },
      {
        round: 4,
        day: "Saturday",
        time: "13:30 - 14:20",
      },
      {
        round: 5,
        day: "Saturday",
        time: "14:30 - 15:20",
      },
    ],
    break: {
      afterRound: 2
    },
    prizeGiving: {
      time: "15:30",
      day: "Saturday",
    },
  },
  {
    type: "norm",
    rounds: [
      {
        round: 1,
        day: "Wednesday",
        time: "18:30 - 22:30",
      },
      {
        round: 2,
        day: "Thursday",
        time: "10:00 - 14:00",
      },
      {
        round: 3,
        day: "Thursday",
        time: "15:00 - 19:00",
      },
      {
        round: 4,
        day: "Friday",
        time: "10:00 - 14:00",
      },
      {
        round: 5,
        day: "Friday",
        time: "15:00 - 19:00",
      },
      {
        round: 6,
        day: "Saturday",
        time: "10:00 - 14:00",
      },
      {
        round: 7,
        day: "Saturday",
        time: "15:00 - 19:00",
      },
      {
        round: 8,
        day: "Sunday",
        time: "10:00 - 14:00",
      },
      {
        round: 9,
        day: "Sunday",
        time: "15:00 - 19:00",
      }
    ]
  },
  {
    type: "junior",
    eventStart: "9:30",
    eventEnd: "16:00",
    rounds: [
      {
        round: 1,
        day: "Saturday",
        time: "10:00 - 10:50",
      },
      {
        round: 2,
        day: "Saturday",
        time: "11:00 - 11:50",
      },
      {
        round: 3,
        day: "Saturday",
        time: "12:00 - 12:50",
      },
      {
        round: 4,
        day: "Saturday",
        time: "13:00 - 13:50",
      },
      {
        round: 5,
        day: "Saturday",
        time: "14:00 - 14:50",
      },
      {
        round: 6,
        day: "Saturday",
        time: "15:00 - 15:50",
      },
    ],
    prizeGiving: {
      time: "16:00",
      day: "Saturday",
    },
  },
  {
    type: "doubles",
    eventStart: "12:30",
    eventEnd: "16:30",
    rounds: [
      {
        round: 1,
        day: "Saturday",
        time: "13:00 - 13:20",
      },
      {
        round: 2,
        day: "Saturday",
        time: "13:30 - 13:50",
      },
      {
        round: 3,
        day: "Saturday",
        time: "14:00 - 14:20",
      },
      {
        round: 4,
        day: "Saturday",
        time: "14:30 - 14:50",
      },
      {
        round: 5,
        day: "Saturday",
        time: "15:00 - 15:20",
      },
      {
        round: 6,
        day: "Saturday",
        time: "15:30 - 15:50",
      },
      {
        round: 7,
        day: "Saturday",
        time: "16:00 - 16:20",
      },
    ],
    prizeGiving: {
      time: "16:30",
      day: "Saturday",
    },
  },
];
