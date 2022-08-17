import React, { useState } from "react";
import Buses from "./Mode/Bus";
import Trains from "./Mode/Train";
import Parking from "./Mode/Parking";
import { classNames } from "../../utils/Classes";

export default function TravelInformation(props) {
  const { eventId, eventType } = props;
  const [tabs, setTabs] = useState([
    { name: "Parking", icon: "fa-cars", current: true },
    { name: "Trains", icon: "fa-train", current: false },
    { name: "Buses", icon: "fa-bus", current: false },
  ]);
  const [selected, setSelected] = useState("Parking");

  const renderInfo = (selected: string, eventId: string, eventType: string) => {
    switch (selected) {
      case "Parking":
        return <Parking alignLeft={true} />;
      case "Trains":
        return <Trains {...{ eventId, eventType }}  alignLeft={true}  />;
      case "Buses":
        return <Buses {...{ eventId, eventType }} alignLeft={true} />;
      default:
        return <Parking alignLeft={true} />;
    }
  };

  return (
    <div>
      <div className="rounded-t-lg py-2 sm:pt-8">
        <div className="relative text-lg text-gray-700">
          <Tabs tabs={tabs} setSelected={setSelected} setTabs={setTabs} />
          {renderInfo(selected, eventId, eventType)}
        </div>
      </div>
    </div>
  );
}

function Tabs(props) {
  const { tabs, setSelected, setTabs } = props;
  const handleChange = (e) => updateTabs(e.target.value);
  const handleClick = (tab) => updateTabs(tab);

  const updateTabs = (tab) => {
    setSelected(tab);
    setTabs((prevState) =>
      prevState.map(({ name, icon }) => ({
        name,
        icon,
        current: name === tab,
      }))
    );
  };

  return (
    <div>
      <div className="sm:hidden mt-4 mb-6">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          onChange={handleChange}
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name} >{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <div
                onClick={() => handleClick(tab.name)}
                key={tab.name}
                className={classNames(
                  tab.current
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm cursor-pointer"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <span>
                  <i className={`far ${tab.icon} mr-2`}></i>
                </span>
                {tab.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
