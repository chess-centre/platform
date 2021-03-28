import React from "react";

export const CentreRoadmap = () => {
  return (
    <div className="relative w-1/2 m-8">
      <div
        className="border-r-2 border-gray-500 absolute h-full top-0 l-4"
      ></div>
      <ul className="list-none m-0 p-0">
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-gray-500 rounded-full h-8 w-8"></div>
            <div className="flex-1 ml-4 font-medium">Oct 2017 - First Release</div>
          </div>
          <div className="ml-12">First release of Tailwind CSS</div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-gray-500 rounded-full h-8 w-8"></div>
            <div className="flex-1 ml-4 font-medium">
              Nov 2017 - Multiple Releases
            </div>
          </div>
          <div className="ml-12">v0.1.0 - v0.2.2</div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-gray-500 rounded-full h-8 w-8"></div>
            <div className="flex-1 ml-4 font-medium">
              Feb 2018 - Other stuff happened
            </div>
          </div>
          <div className="ml-12">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
            perspiciatis facilis deserunt excepturi sunt pariatur consequuntur
            eveniet molestias ea quia? Magni veniam illo optio tempora modi
            exercitationem qui adipisci ex.
          </div>
        </li>
        <li className="mb-2">
          <div className="flex items-center mb-1">
            <div className="bg-gray-500 rounded-full h-8 w-8"></div>
            <div className="flex-1 ml-4 font-medium">
              July 2018 - More stuff happened
            </div>
          </div>
          <div className="ml-12">
            Consequuntur odit explicabo officiis veniam incidunt non velit ex
            consectetur magnam minima vero hic impedit cumque, blanditiis autem
            distinctio facere dolor atque facilis, eos, labore sunt iusto.
            Beatae, quas, dolorem?
          </div>
        </li>
      </ul>
    </div>
  );
};
