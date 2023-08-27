import React, { useEffect } from "react";
import FooterLanding from "../../components/Footer/LandingFooter";
import LandingNav from "../../components/Navigation/LandingNav";

const About = () => {

  useEffect(() => {
    document.title = "Sheffield Chess Centre | About Us"
  }, []);

  return (
    <div>
      <div className="bg-white">
        <div className="relative bg-gray-50 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
          <LandingNav />
        </div>
        <div className="mx-auto py-6 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6 text-center">
            About us
          </h2>
          <div className="mx-auto space-y-12 lg:grid lg:grid-cols-1 prose">
            <p>
              The Sheffield Chess Centre is a new venture. We’re a hub for chess in the Sheffield area for both juniors and adults.
              We recognise that our junior players are the future of the game, and our Monday and Tuesday sessions are for children only.
            </p>
            <p>
              We aim to work together with the Sheffield & District Chess Association to run events for a wide variety of abilities, and provide a home for Sheffield teams in the Yorkshire leagues. Our Wednesday, Thursday and Friday sessions are aimed at adults (juniors are still welcome).
              We have no desire to take players away from traditional pub-based chess clubs, but we do want to help new players to get involved with over-the-board chess.
            </p>
          </div>

        </div>

        <FooterLanding></FooterLanding>
      </div>
    </div>
  );
};

export default About;
