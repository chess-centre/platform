import React from "react";

export const TemplateData = {
  festival: {
    address: "King's Hall & Winter Garden, Station Road, Ilkley, LS29 8HB",
    paragraphs: [
      "Join us for our biggest event yet! Our Ilkley Chess Festival will be held at the beautiful Kings Hall & Winter Gardens.",
      "Hopefully the beginning of many great events being held in the North.",
      "Below you will find the full details for the event including the playing schedule and current entries.",
    ],
    tags: [
      { name: "Standard", color: "bg-blue-500" },
      { name: "ECF", color: "bg-rose-500" },
    ],
    organisers: [
      {
        name: "Andrew Wainwright",
        imgUrl: "/andy.png",
      },
      {
        name: "Matthew Webb",
        imgUrl: "/matt.png" 
      },
    ],
  },
  congress: {
    address: "Unit 8, Crescent Court, Ilkely, LS29 8DE",
    paragraphs: [
      "Our two day congress events have players split into three all-play-all sections.",
      "Sections are determined purely on latest ECF standard play ratings.",
      "Below you will find the full details for the event including the playing schedule and current entries.",
    ],
    tags: [
      { name: "Standard", color: "bg-blue-500" },
      { name: "ECF", color: "bg-rose-500" },
    ],
    organisers: [
      { name: "Andrew Wainwright", imgUrl: "/andy.png" },
      { name: "Matthew Webb", imgUrl: "/matt.png"  },
    ],
  },
  rapidplay: {
    address: "Unit 8, Crescent Court, Ilkely, LS29 8DE",
    paragraphs: [
      "Our popular rapidplay events will take an all-play-all format where we get maximum entries",
      "Where we have fewer than 18 players we will default to a swiss event.",
      "Below you will find the full details for the event including the playing schedule and current entries.",
    ],
    tags: [
      { name: "Rapidplay", color: "bg-teal-500" },
      { name: "ECF", color: "bg-rose-500" },
    ],
    organisers: [
      { name: "Andrew Wainwright", imgUrl: "/andy.png" },
      { name: "Matthew Webb", imgUrl: "/matt.png"  },
    ],
  },
  blitz: {
    address: "Unit 8, Crescent Court, Ilkely, LS29 8DE",
    paragraphs: [
      "Ready for some adrenaline pumping, hand trembling, piece flying chess?",
      "This event is not ECF rated.",
      "Below you will find the full details for the event including the playing schedule and current entries.",
    ],
    tags: [{ name: "Blitz", color: "bg-yellow-500" }],
    organisers: [
      {
        name: "Andrew Wainwright",
        imgUrl: "/andy.png" 
      },
      {
        name: "Matthew Webb",
        imgUrl: "/matt.png" 
      },
    ],
  },
  junior: {
    address: "Ilkley Grammar School, Armitage Hall, LS29 8TH",
    paragraphs: [
      "Our dedicated Junior Rapidplay events are the perfect first event for any aspiring young chess player!",
      "We offer a range of rated sections which allows us to divide the children in bands according to their current playing strength.",
      "Below you will find the full details for the event including the playing schedule and current entries.",
    ],
    tags: [{ name: "Junior", color: "bg-pink-500" },
    { name: "ECF", color: "bg-rose-500" }, { name: "Rapidplay", color: "bg-teal-500" }],
    organisers: [
      {
        name: "Andrew Wainwright",
        imgUrl: "/andy.png" 
      },
      {
        name: "Matthew Webb",
        imgUrl: "/matt.png" 
      },
    ],
  },
};

export function EventDescription({ template }) {
  return (
    <div className="prose max-w-none">
      {TemplateData[template].paragraphs.map((text: string, key: number) => (
        <p key={key}>{text}</p>
      ))}
    </div>
  );
}