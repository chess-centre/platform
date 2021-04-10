import React from "react";
import { Link, useParams } from "react-router-dom";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";


function CongressEvent() {

	const { id } = useParams();

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
                Congresses
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Join us
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
								The Chess Centre’s “Mini-Congresses” have been tailored specifically for our venue to provide a
								sophisticated and digitally supported congress tournament experience for our members and guests.
								Backed by our leading digital platform, competitors can register, track and review their participation
								in our Congress events online.
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
								When competitors visit our Chess Centre for the first time to play in a Congress events, we hope that
								they are impressed by the attention to detail that has been taken in providing comfortable and
								modern facilities for this format of Chess.
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
								Designed to accommodate modern working and social patterns, our “Mini-Congresses” take place
								over a two day weekend, with 5 standard play rounds being played from Saturday morning to
								Sunday afternoon. Though the games are quicker than many congress tournaments, they are still
								within the parameters of ECF standard play events and thus are fully graded. The “all-play-all”
								format of players competing in graded groups of 6 also ensures that players know they will receive a
								competitive and challenging test of their skills across all rounds of the competitions. There’s no
								where to hide in our “Mini-Congresses”.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}

export default CongressEvent;
