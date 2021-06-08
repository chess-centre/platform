import React, { useState } from "react";
import MayCongress from "../../components/Events/Tables/MayCongress";
import MayRapidplayDivOne from "../../components/Events/Tables/MayRapidplayDivOne";
import MayRapidplayDivTwo from "../../components/Events/Tables/MayRapidplayDivTwo";
import Nav from "../../components/Events/Breadcrumb/Nav";

function ListEvents(props) {
  const { setSelectedEvent, current } = props;
  const eventList = [
    {
      name: "May Open Congress",
      winner: "Peter Shaw",
      id: 1,
    },
    {
      name: "May Rapidplay (Div 1)",
      winner: "Peter Shaw",
      id: 2,
    },
    {
      name: "May Rapidplay (Div 2)",
      winner: "Jael Muachikape",
      id: 3,
    },
  ];

  const renderEvent = (id) => {
    setSelectedEvent(id)
  };

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Previous Event
            </th>
            <th
              scope="col"
              className="hidden sm:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Winner
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              View
            </th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {eventList.map((e) => (
            <tr key={e.id} className={e.id === current ? "bg-yellow-50" : ""}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {e.name}
              </td>
              <td className="hidden sm:block px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {e.winner}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div
                  onClick={() => renderEvent(e.id)}
                  className="text-teal-600 hover:text-teal-900 cursor-pointer"
                >
                  details
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Results() {

  const [selectedEvent, setSelectedEvent] = useState(0);

  const renderSelectedEvent = () => {
    switch (selectedEvent) {
      case 0: 
        return <></>
      case 1:
        return <MayCongress />;
      case 2:
        return <MayRapidplayDivOne />;
      case 3:
        return <MayRapidplayDivTwo />;
      default:
        break;
    }
  }

  return (
    <div className="">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Results
      </h1>
      <div className="my-6 pb-5 border-b border-gray-200 dark:border-gray-700">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-lg leading-6 font-medium text-gray-900 dark:text-white">
            <Nav />
          </h3>
        </div>
      </div>
      <ListEvents setSelectedEvent={setSelectedEvent} current={selectedEvent} />
      <div className="mt-6">
        { renderSelectedEvent() }
      </div>
    </div>
  );
}

export default Results;
