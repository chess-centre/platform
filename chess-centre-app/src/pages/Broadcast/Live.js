import React from "react";
import { LiveGameContext } from "../../context/LiveGameContext";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

const Live = () => {

  const { eventInfo, isLoading } = React.useContext(LiveGameContext);

  return (
    <div>
      <div className="relative z-10 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav />
      </div>
      <div>
        {!isLoading && eventInfo.length > 0 && eventInfo[0].isLiveUrl && (
          <iframe
            className="w-full h-screen"
            title="Live Broadcast"
            frameBorder="0"
            allowFullScreen
            src={eventInfo[0].isLiveUrl}
          />
        )}

        {isLoading && (
          <div className="mt-4">
            <div className="text-gray-400 mb-2 text-xs">
              <i className="fal fa-spinner-third fa-spin fa-fw"></i>
              <br />
              Loading Live Game
            </div>
          </div>
        )}

        {!isLoading && eventInfo.length > 0 && !eventInfo[0]?.isLiveUrl && (
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">
                Live Broadcast
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Oops, no event found!
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                This event may have expired or is yet to be started.
              </p>
            </div>
          </div>
        )}
      </div>
      <FooterLanding />
    </div>
  );
};

export default Live;
