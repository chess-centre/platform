import React from "react";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import { Link } from "react-router-dom";

export default function JuniorClubEvent() {
  return (
    <div>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
          <LandingNav current="events" />
        </div>
        <div className="bg-white">
          <div className="max-w-6xl mx-auto py-10 px-4 sm:py-10 sm:px-6 lg:px-6">
            <div className="text-center">
              <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">
                Junior Chess Club
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-4xl">
                Get started now
              </p>
              <p className="prose prose-gray max-w-xl mt-5 mx-auto text-xl text-gray-500">
                The Chess Centre’s junior Chess Club is open to boys and girls
                aged 6-16yrs of age.
              </p>
              <p className="prose prose-gray max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Irrespective of experience, playing strength or ability all
                children are welcome to join our Junior Club. In the Junior Club
                they will learn from our dedicated coaching team all
                fundamentals of the game, whilst developing their cognitive
                reasoning skills, problem solving and spatial awareness.
              </p>
              <p className="prose prose-gray max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Alongside the more technical elements of the game we also
                believe that it is just as important for Children learning Chess
                to also develop their teamwork, sportsmanship and social skills,
                all of which is possible as part of our Junior Club activities.
              </p>
              <p className="prose prose-gray max-w-xl mt-5 mx-auto text-xl text-gray-500">
                So if you would like to learn more about the game of Chess in a
                fun, friendly and safe environment then please{" "}
                <a className="text-teal-500 hover:text-teal-700 hover:underline" href="mailto:info@chesscentre.online">contact us</a> to book a place.
              </p>
              <div className="text-sm text-center mt-6">
                <Link className="text-teal-600 hover:text-teal-500" to="/"><i className="fad fa-long-arrow-alt-left"></i> back</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}