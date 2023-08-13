import React from "react";
import { standardSections, juniorSections } from "../../api/sections";

export const TemplateData = {
  festival: {
    address: "329A Coleford Road, Sheffield, S9 5NF",
    paragraphs: [
      "Join us for our biggest event yet! Our Sheffield Chess Festival will be held at the beautiful Kings Hall & Winter Gardens.",
      "This is just the beginning of many great events to be held in West Yorkshire!",
      "Section details:",
      "Below you will find the full details for the event including the playing schedule and current entries.",
    ],
    tags: [
      { name: "Standard", color: "bg-blue-500" },
      { name: "ECF", color: "bg-rose-500" },
    ],
    coverImage: "/festival-square.jpg",
    arbiters: [
      {
        name: "Alan Atkinson",
        fideUrl: "https://ratings.fide.com/profile/450430"
      },
      {
        name: "John Grasham",
        fideUrl: ""
      },
      {
        name: "Ihor Lewyk",
        fideUrl: ""
      }
    ],
    organisers: [
      {
        name: "Jonathan Arnott",
        imgUrl: "/jonathan.png",
      },
      {
        name: "Matthew Webb",
        imgUrl: "/matt.png",
      },
    ],
    hasBroadcast: true,
    broadcastLink: "https://chess-results.com/tnr665788.aspx?lan=1&art=0"
  },
  congress: {
    address: "329A Coleford Road, Sheffield, S9 5NF",
    paragraphs: [
      "Our two day congress events have players split into three all-play-all sections.",
      "Sections are determined purely on latest ECF standard play ratings.",
      "Below you will find the full details for the event including the playing schedule and current entries.",
    ],
    coverImage: "/open-congress.jpg",
    tags: [
      { name: "Standard", color: "bg-blue-500" },
      { name: "ECF", color: "bg-rose-500" },
    ],
    organisers: [
      { name: "Jonathan Arnott", imgUrl: "/jonathan.png" },
      { name: "Matthew Webb", imgUrl: "/matt.png" },
    ],
  },
  rapidplay: {
    address: "329A Coleford Road, Sheffield, S9 5NF",
    paragraphs: [
      "Our popular rapidplay events will take an all-play-all format where we get maximum entries",
      "Where we have fewer than 18 players we will default to a swiss event.",
      "Below you will find the full details for the event including the playing schedule and current entries.",
    ],
    coverImage: "/open-rapidplay.jpg",
    tags: [
      { name: "Rapidplay", color: "bg-yellow-400" },
      { name: "ECF", color: "bg-rose-500" },
      { name: "DGT Boards", color: "bg-sky-500" },
    ],
    organisers: [
      { name: "Jonathan Arnott", imgUrl: "/jonathan.png" },
      { name: "Matthew Webb", imgUrl: "/matt.png" },
    ],
  },
  blitz: {
    address: "329A Coleford Road, Sheffield, S9 5NF",
    paragraphs: [
      "Ready for some adrenaline pumping, hand trembling, piece flying chess?",
      "This event is not ECF rated.",
      "Below you will find the full details for the event including the playing schedule and current entries.",
    ],
    coverImage: "/open-blitz.jpg",
    tags: [{ name: "Blitz", color: "bg-yellow-400" }],
    organisers: [
      {
        name: "Jonathan Arnott",
        imgUrl: "/jonathan.png",
      },
      {
        name: "Matthew Webb",
        imgUrl: "/matt.png",
      },
    ],
  },
  junior: {
    address: "329A Coleford Road, Sheffield, S9 5NF",
    paragraphs: [
      "Our dedicated Junior Rapidplay events are the perfect first event for any aspiring young chess player!",
      "We offer a range of rated sections which allows us to divide the children in bands according to their current playing strength.",
      "Below you will find the full details for the event including the playing schedule and current entries.",
    ],
    coverImage: "/igs.jpg",
    tags: [
      { name: "Junior", color: "bg-pink-500" },
      { name: "ECF", color: "bg-rose-500" },
      { name: "Rapidplay", color: "bg-yellow-400" },
    ],
    organisers: [
      {
        name: "Jonathan Arnott",
        imgUrl: "/jonathan.png",
      },
      {
        name: "Matthew Webb",
        imgUrl: "/matt.png",
      },
    ],
  },
};

export function EventDescription({
  template,
  multipleSections,
  isJuniorEvent,
}) {
  return (
    <div className="sm:flex">
      <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
          <img
            className="object-cover rounded-lg h-48 w-full sm:h-32 sm:w-32 border border-gray-300 bg-white text-gray-300"
            src={TemplateData[template].coverImage}
            alt=""
          />
      </div>
      <div className=" col-span-2 prose max-w-none">
        {TemplateData[template].paragraphs.map((text: string, key: number) => {
          if (multipleSections && key === 3) {
            return (
              <div key={key}>
                <ol>
                  {!isJuniorEvent &&
                    standardSections.map((section) => (
                      <li key={section.name}>
                        {section.name}{" "}
                        <span className="text-sm text-gray-400">
                          {section.ratingBand}
                        </span>
                      </li>
                    ))}

                  {isJuniorEvent &&
                    juniorSections.map((section) => (
                      <li key={section.name}>
                        {section.name}{" "}
                        <span className="text-sm text-gray-400">
                          {section.ratingBand}
                        </span>
                      </li>
                    ))}
                </ol>
                <p key={key}>{text}</p>
              </div>
            );
          }
          return <p key={key}>{text}</p>;
        })}
      </div>
    </div>
  );
}
