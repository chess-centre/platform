import React from "react";
import { useAuthState } from "../../context/Auth";
import QR from "../../assets/img/QR-live-games.png";
import { useEffect } from "react";
import { Animated } from "react-animated-css";

const Avatar = () => {
  return (
    <span className="inline-block align-middle bg-gray-100 rounded-full overflow-hidden h-8 w-8">
      <svg
        className="h-full w-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
};

const Live = () => {
  //const { user } = useAuthState();
  const [isLive, setLive] = React.useState(true);
  const [isCalendar, setCalendar] = React.useState(false);

  const rotateViewer = () => {
    setLive(!isLive);
  };

  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4 px-10 py-10 h-screen">
      <div className="row-span-3 col-span-4 bg-gray-100 rounded-lg shadow-xs overflow-hidden">
        <div>
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInDuration={3000}
            animationOutDuration={3000}
            isVisible={isLive}
          >
            <div className="aspect-w-16 aspect-h-10">
              <iframe
                frameBorder="0"
                allowFullScreen
                src="https://view.livechesscloud.com/#da3bbd37-ca97-4196-b0c5-56e6cf004054"
              />
            </div>
          </Animated>
        </div>
      </div>
      <div className="col-span-1 bg-gray-100 rounded-lg shadow-xs overflow-hidden p-8">
        <div className="bg-gradient-to-r from-orange-600 to-orange-300 px-4 py-5 border-b border-gray-200 sm:px-6 rounded-xl mb-2">
          <h3 className="text-lg text-white leading-6 font-medium">
            Current Standings
          </h3>
        </div>
        <ul className="divide-y divide-gray-200 bg-white p-1 rounded-xl">
          <li className="py-2 flex ml-2 grid-cols-2">
            <Avatar />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Matthew Webb</p>
              <p className="text-sm text-gray-500">The Chess Centre</p>
            </div>
          </li>

          <li className="py-2 flex ml-2">
            <Avatar />
            <div className="ml-3 ml-2">
              <p className="text-sm font-medium text-gray-900">Pete Redmond</p>
              <p className="text-sm text-gray-500">Shipley CC</p>
            </div>
          </li>

          <li className="py-2 flex ml-2 flex">
            <Avatar />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Gary Corcoran</p>
              <p className="text-sm text-gray-500">The Chess Centre</p>
            </div>
          </li>
          <li className="py-2 flex ml-2 flex">
            <Avatar />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Dave Aldous</p>
              <p className="text-sm text-gray-500">Alwoodley</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex row-span-2 col-span-1 bg-gray-100 rounded-lg shadow-xs overflow-hidden p-2">
        <img className="object-center w-64 mx-auto self-center" src={QR} />
      </div>
    </div>
  );
};

export default Live;
