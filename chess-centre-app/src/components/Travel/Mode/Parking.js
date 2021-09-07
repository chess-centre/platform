import React, { useState } from "react";

export default function Parking() {
  // eslint-disable-next-line no-unused-vars
  const [parkingInfo, setTrainInfo] = useState([
    {
      street: "South Hawksworth Street",
      postCode: "LS29 9DX",
      cost: "£6",
      distance: "0.1 mile",
      mapURL:
        "https://www.google.co.uk/maps/dir/LS29+8DE,+Brook+St,+Ilkley/LS29+9DX,+S+Hawksworth+St,+Ilkley/@53.9257164,-1.8250916,18z/am=t/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x487bfb1d8a00f4d3:0x717687c6d0ec4fbc!2m2!1d-1.8229554!2d53.9257312!1m5!1m1!1s0x487bfae24301b425:0xbf264418fb874913!2m2!1d-1.8248278!2d53.9258957!3e3?hl=en&authuser=0",
    },
    {
      street: "Railway Road",
      postCode: "LS29 8HP",
      cost: "£5",
      distance: "0.2 miles",
      mapURL:
        "https://www.google.co.uk/maps/dir/LS29+8DE,+Brook+St,+Ilkley/LS29+8HP,+Railway+Rd,+Ilkley/@53.9253712,-1.8238887,17z/am=t/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x487bfb1d8a00f4d3:0x717687c6d0ec4fbc!2m2!1d-1.8229554!2d53.9257312!1m5!1m1!1s0x487bfb1dcbf9e1ab:0xda41a13ba810bf70!2m2!1d-1.8200189!2d53.9251337!3e3?hl=en&authuser=0",
    },
    {
      street: "Wharfe View Road",
      postCode: "LS29 8DY",
      cost: "£5",
      distance: "0.2 miles",
      mapURL:
        "https://www.google.co.uk/maps/dir/LS29+8DE,+Brook+St,+Ilkley/LS29+8DY,+Wharfe+View+Rd,+Ilkley/@53.9264715,-1.8245958,17z/am=t/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x487bfb1d8a00f4d3:0x717687c6d0ec4fbc!2m2!1d-1.8229554!2d53.9257312!1m5!1m1!1s0x487bfb1d0cb7ad11:0x7f88899a9ab73afd!2m2!1d-1.821411!2d53.9272119!3e3?hl=en&authuser=0",
    },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="mt-4 p-0 text-sm">
      {parkingInfo && !isLoading && (
        <div>
          <div className="overflow-auto">
          <table className="m-auto w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 divide-y divide-gray-200 dark:border-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                >
                  Where
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                >
                  Distance
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                >
                  Cost
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 text-center text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
                >
                  Map
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parkingInfo.map((details, key) => {
                return (
                  <tr key={key}>
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                      {details.street}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-800">
                      {details.distance}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-800">
                      {details.cost}
                    </td>
                    <td className="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-800">
                      <a
                        href={details.mapURL}
                        target="_blank"
                        rel="noreferrer"
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        <i className="far fa-directions text-white"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
          <div className="mt-2 text-center">
            <p className="text-right text-xs text-gray-400 italic sm:mr-4 -mt-2">
              Prices are based on all day parking
            </p>
            <div className="mt-3">
              <a
                className="text-teal-500 underline"
                href="https://www.bradford.gov.uk/transport-and-travel/parking/car-parks-in-ilkley/"
              >
                more info
              </a>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div
          type="button"
          className="relative block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center"
        >
          <span className="">
            <i className="fal fa-cars fa-8x text-gray-200"></i>
          </span>
          <span className="animate-pluse mt-2 block text-sm font-medium text-teal-500">
            Loading...
          </span>
        </div>
      )}
    </div>
  );
}