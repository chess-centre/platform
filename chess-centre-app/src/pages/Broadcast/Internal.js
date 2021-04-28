import React from "react";
import QR from "../../assets/img/QR-live-games.png";

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

const Standings = ({ eventId }) => {
  const [standings, updateStandings] = React.useState([]);
  const fetchStandings = async () => {
    // EXAMPLE:
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            {
              name: "Matthew Webb",
              club: "The Chess Centre",
              points: 5,
            },
            {
              name: "Gary Corcoran",
              club: "The Chess Centre",
              points: 4.5,
            },
            {
              name: "Pete Redmond",
              club: "Shipley",
              points: 4,
            },
            {
              name: "Andrew Wainwright",
              club: "The Chess Centre",
              points: 3,
            },
          ]),
        1000
      )
    );
  };

  React.useEffect(() => {
    const getData = async () => {
      const data = await fetchStandings();
      updateStandings(data);
    };
    getData();
  }, []);

  return (
    <>
      <div className="bg-gradient-to-r from-orange-600 to-orange-300 px-4 py-5 border-b border-gray-200 sm:px-6 rounded-xl mb-2">
        <h3 className="text-lg text-white leading-6 font-medium">
          Current Standings
        </h3>
      </div>
      <ul className="divide-y divide-gray-200 bg-white p-1 rounded-xl">
        {standings && standings.length > 1
          ? standings
              .sort((a, b) => a.points > b.points)
              .map(({ name, club, points }) => {
                return (
                  <li className="py-2 flex ml-2 grid-cols-2">
                    <Avatar />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {name}
                      </p>
                      <div className="flex">
                        <p className="text-sm text-gray-500">{club}</p>
                        <p className="text-sm text-gray-500 ml-10">{points}</p>
                      </div>
                    </div>
                  </li>
                );
              })
          : null}
      </ul>
    </>
  );
};

/* 
 * This view pulls in three key components:
    1) the local iframe for internal DGT boards
    2) the current table / standings for the event
    3) relevant QR code for smartphones to pull up the games on their phone
*/
const Internal = (props) => {
  const { url, eventId } = props;

  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4 px-10 py-10 h-screen">
      <div className="row-span-3 col-span-4 bg-gray-100 rounded-lg shadow-xs overflow-hidden">
        <div>
          <div className="aspect-w-16 aspect-h-11">
            <iframe
              title="Live Games"
              frameBorder="0"
              allowFullScreen
              src={ url ? url : "http://localhost:1982/liveviewer/index.html"}
            />
          </div>
        </div>
      </div>
      <div className="col-span-1 bg-gray-100 rounded-lg shadow-xs overflow-hidden p-8">
        <Standings eventId={eventId} />
      </div>
      <div className="flex row-span-2 col-span-1 bg-gray-100 rounded-lg shadow-xs overflow-hidden p-2">
        <img
          className="object-center w-64 mx-auto self-center"
          src={QR}
          alt="QR Code"
        />
      </div>
    </div>
  );
};

export default Internal;
