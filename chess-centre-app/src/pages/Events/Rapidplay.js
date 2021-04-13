import React from "react";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

function RapidplayEvent() {
  return (
    <div>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
          <LandingNav current="events" />
        </div>
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-10 px-4 sm:py-18 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">
                Rapidplays
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Join us
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Want to test yourself, but don’t have time for a full weekend
                tournament? Then look no further, as our 1 day, 5 round Rapid
                Play tournaments are ideal for new and returning players who
                want to “scratch their competitive itch”, but in a more
                condensed and faster format of the game.
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Our Open Rapid Play Tournaments also tend to follow our favored
                “all-play-all” format of players competing in graded groups of
                six, to ensure that players know they will receive a competitive
                and challenging test of their skills across all rounds of the
                competitions.
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Though a little “less serious” by nature than congress events,
                our Open Rapid Play Tournaments are nonetheless fully ECF Rapid
                Play events, and as such are competitive in nature. So if you
                like the idea of a quick fire day of competitive Chess in Ilkley
                then try one of our Rapid Play events and enter [here].
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}

export default RapidplayEvent;
