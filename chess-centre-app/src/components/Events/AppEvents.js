import React from "react";
import { Link } from "react-router-dom";
import { eventData } from "../../api/mock.entries";

function UpComingEvents() {
  return (
    <>
      {eventData.map(({ name, entries }, index) => {
        return (
          <section className="relative">
            <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  {name}
                </h2>
              </div>
              <div className="mt-6 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-t border-gray-200">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-2 sm:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="hidden sm:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              ECF Ref
                            </th>
                            <th
                              scope="col"
                              className="px-4 sm:px-6 py-3 text-left text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Rating
                            </th>

                            <th
                              scope="col"
                              className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              <span>Details</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {entries.map((p, i) => {
                            const isEven = i % 2 === 0;
                            return (
                              <tr
                                key={i}
                                className={isEven ? "bg-white" : "bg-gray-50"}
                              >
                                <td className="px-2 sm:px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {p.name}
                                </td>
                                <td className="hidden sm:block px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {p.gradeNo}
                                </td>
                                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                  {p.grade}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Link
                                    to={`/app/members/${p.id}`}
                                    className="text-orange-600 hover:text-orange-900"
                                  >
                                    View
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

export default UpComingEvents;
