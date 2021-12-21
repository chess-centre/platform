import React, { useEffect, useState } from "react";
import routes from "../../routes/sidebar";
import { useLiveGameState } from "../../context/LiveGameContext";
import { NavLink, Route, Link } from "react-router-dom";
import * as Icons from "../../icons";
import SidebarSubmenu from "./SidebarSubmenu";
import ImageLight from "../../assets/img/logo-light-theme-small.png";
import { isPaidMember } from "../../context/Auth";
import SupportContactModal from "../Modal/SupportContactModal";

const version = process.env.REACT_APP_VERSION || "0.0.0";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  const { eventInfo, isLoading } = useLiveGameState();
  const [needsUpgrade, setNeedsUpgrade] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  async function checkMemberStatus() {
    const isPaid = await isPaidMember();
    setNeedsUpgrade(!isPaid);
  }

  useEffect(() => {
    checkMemberStatus();
  }, []);

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <NavLink
        to="/app/dashboard"
        className="text-lg font-bold text-gray-800 dark:text-gray-500 hover:text-gray-500"
      >
        <img
          aria-hidden="true"
          className="object-contain mt-4 sm:mt-2 h-7 px-6 inline-block"
          src={ImageLight}
          alt="Logo"
        />
      </NavLink>
      <ul className="mt-6 sm:mt-8">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-teal-800 dark:hover:text-gray-200"
                activeClassName="text-teal-500 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-2 bg-teal-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      {needsUpgrade && (
        <Link
          to="/app/upgrade"
          className="align-bottom inline-flex font-medium items-center justify-center cursor-pointer leading-5 transition-colors duration-150 focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-teal-600 border border-transparent active:bg-teal-600 hover:bg-teal-700 focus:shadow-outline-teal ml-5 mt-3"
        >
          Upgrade Membership
        </Link>
      )}
      {!isLoading && eventInfo?.length > 0 && (
        <Link
          to="/broadcast/live"
          className={`
        align-bottom inline-flex font-medium items-center justify-center cursor-pointer leading-5 
        transition-colors duration-150 focus:outline-none px-10 py-2 rounded-lg 
        text-sm text-white bg-teal-500 border border-transparent active:bg-teal-600 hover:bg-teal-600 focus:shadow-outline-teal ml-5 mt-3`}
        >
          <span className="flex relative h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-65"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-600"></span>
          </span>{" "}
          <span className="ml-2">Watch Now</span>
        </Link>
      )}
      <div className="absolute grid grid-cols-2 bottom-1 pl-8 my-6 text-sm">
        <div
          onClick={openModal}
          className="text-right hover:text-teal-600 ml-2 mr-8 cursor-pointer"
        >
          <i className="fas fa-user-headset"></i>{" "}
          <span className="text-xs">support</span>
        </div>
        <div className="text-center hover:text-teal-500">
          <Link to="/app/roadmap">{`v${version}`}</Link>
        </div>
      </div>
      <SupportContactModal open={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default SidebarContent;
