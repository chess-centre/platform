import React from "react";
import { Link } from "react-router-dom";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import EventCard from "../../components/Events/EventCard";

export default function Events() {
  return (
    <div>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-2 xl:pb-6">
          <LandingNav current="events" />
        </div>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">
                Events
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Join us
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Our members can register for events and see more about the
                players already entered.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap content-evenly items-center">
            <EventCard
              icon="fa-chess-queen-alt"
              cost="20"
              title="May Congress"
              clock="90 min"
              rounds="6"
            />
            <EventCard
              icon="fa-chess-king-alt"
              cost="15"
              title="May Rapidplay"
              clock="25 min"
              rounds="6"
            />
            <EventCard
              icon="fa-chess-bishop-alt"
              cost="20"
              title="Bob Burns"
              clock="60 min"
              rounds="5"
            />
        </div>
        <NewsLetter />
      </div>
      <FooterLanding />
    </div>
  );
}
