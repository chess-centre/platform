import React from "react";
import PageTitle from "../../components/Typography/PageTitle";

function Dashboard() {
  // MOVE TO DB:
  const eventData = [
    {
      name: "Bob Burns",
      entries: [
        {
          name: "Matthew Webb",
          gradeNo: "225527D",
          grade: "Inactive",
        },
        {
          name: "Peter Shaw",
          gradeNo: "166609F",
          grade: "2172",
        },
        {
          name: "Mike Walker",
          gradeNo: "142953L",
          grade: "2073",
        },
        {
          name: "David Barlow",
          gradeNo: "106225G",
          grade: "2005",
        },
        {
          name: "Gary Corcoran",
          gradeNo: "258651E",
          grade: "1878",
        },
        {
          name: "John Holliday",
          gradeNo: "180699D",
          grade: "1713",
        },
        {
          name: "Andrew Wainwright",
          gradeNo: "185834J",
          grade: "2013",
        },
        {
          name: "Gawain Ako",
          gradeNo: "265438G",
          grade: "161",
        }
      ],
    },
    {
      name: "May Rapidplay",
      entries: [
        {
          name: "Peter Shaw",
          gradeNo: "166609F",
          grade: "2172",
        },
        {
          name: "Andrew Wainwright",
          gradeNo: "185834J",
          grade: "2013",
        },
        {
          name: "David Barlow",
          gradeNo: "106225G",
          grade: "2005",
        },
        {
          name: "Max Shaw",
          gradeNo: "312992F",
          grade: "2000*",
        },
        {
          name: "Chris Wright",
          gradeNo: "214108F",
          grade: "1968",
        },
        {
          name: "Sam Davies",
          gradeNo: "289559G",
          grade: "1908",
        },
        {
          name: "Gary Corcoran",
          gradeNo: "258651E",
          grade: "1878",
        },
        {
          name: "John Holliday",
          gradeNo: "180699D",
          grade: "1713",
        },
        {
          name: "Tony Youngs",
          gradeNo: "",
          grade: "Inactive",
        },
        {
          name: "Steven Law",
          gradeNo: "",
          grade: "Ungraded",
        },
      ],
    },
    {
      name: "May Congress",
      entries: [
        {
          name: "Peter Shaw",
          gradeNo: "166609F",
          grade: "2172",
        },
        {
          name: "Andrew Wainwright",
          gradeNo: "185834J",
          grade: "2013",
        },
        {
          name: "David Barlow",
          gradeNo: "106225G",
          grade: "2005",
        },
        {
          name: "Max Shaw",
          gradeNo: "312992F",
          grade: "2000*",
        },
        {
          name: "Sam Davies",
          gradeNo: "289559G",
          grade: "1908",
        },
        {
          name: "Gary Corcoran",
          gradeNo: "258651E",
          grade: "1878",
        },
        {
          name: "Gawain Ako",
          gradeNo: "265438G",
          grade: "161",
        },
        {
          name: "Gawain Ako",
          gradeNo: "265438G",
          grade: "161",
        },
        {
          name: "Bob Gaunt",
          gradeNo: "",
          grade: "Ungraded",
        },
        {
          name: "Steven Law",
          gradeNo: "",
          grade: "Ungraded",
        },
        {
          name: "Jacob Smith",
          gradeNo: "",
          grade: "Ungraded",
        },
      ],
    },
  ];

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <section>
              <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 sm:px-6">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    Bob Burns
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
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                ECF Ref
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Grade / Rating
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
                            {eventData[0].entries.map((p, i) => {
                              return (
                                <tr key={i}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {p.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {p.gradeNo}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                    {p.grade}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a
                                      href="#"
                                      className="text-orange-600 hover:text-orange-900"
                                    >
                                      View
                                    </a>
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
            <section>
              <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 sm:px-6">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    May Rapidplay
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
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                ECF Ref
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Grade / Rating
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
                            {eventData[1].entries.map((p, i) => {
                              return (
                                <tr key={i}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {p.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {p.gradeNo}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                    {p.grade}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a
                                      href="#"
                                      className="text-orange-600 hover:text-orange-900"
                                    >
                                      View
                                    </a>
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
            <section>
              <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 sm:px-6">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    May Congress
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
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                ECF Ref
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Grade / Rating
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
                            {eventData[2].entries.map((p, i) => {
                              return (
                                <tr key={i}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {p.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {p.gradeNo}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                    {p.grade}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a
                                      href="#"
                                      className="text-orange-600 hover:text-orange-900"
                                    >
                                      View
                                    </a>
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
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
