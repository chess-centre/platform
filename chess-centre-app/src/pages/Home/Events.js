import React from 'react';
import FooterLanding from "../../components/Footer/LandingFooter";
import LandingNav from "../../components/Navigation/LandingNav";

function Events() {
  
  // const __events__ = [
  //   // MAY
  //   {
  //     name:"Junior Club",
  //     description: "",
  //     time: "6:00pm onwards",
  //     date: new Date(2021, 05, 18),
  //     textDate: "Tuesday 18th May",
  //     link: ""
  //   },
  //   {
  //     name:"Club Night",
  //     description: "",
  //     time: "7:00pm onwards",
  //     date: new Date(2021, 05, 20),
  //     textDate: "Thursday 20th May",
  //     url: ""
  //   },
  //   {
  //     name:"Open Congress",
  //     description: "",
  //     time: "",
  //     date: new Date(2021, 05, 22),
  //     textDate: "Saturday 22nd May & Sunday 23rd May",
  //     url: ""
  //   },
  //   {
  //     name:"Junior Club",
  //     description: "",
  //     time: "6:00pm onwards",
  //     date: new Date(2021, 05, 18),
  //     textDate: "Tuesday 25th May",
  //     link: ""
  //   },
  //   {
  //     name:"Club Night",
  //     description: "",
  //     time: "7:00pm onwards",
  //     date: new Date(2021, 05, 27),
  //     textDate: "Thursday 27th May",
  //     link: ""
  //   },
  //   {
  //     name:"Open RapidPlay",
  //     description: "",
  //     time: "7:00pm onwards",
  //     date: new Date(2021, 05, 29),
  //     textDate: "Saturday 29th May",
  //     link: ""
  //   },
  //   // JUNE
  // ]



  return (
    <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
          <LandingNav />
        </div>
        <div className="py-6 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-centre">
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Coming soon
            </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Chess can be played in all kinds of ways, from long play 😴 to bullet 🔥 and from two players 🤼 to four 😲!
            The important thing is to have fun and to enjoy the challenge.</p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Bob Burns
                  </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">

                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Club Nights
                  </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
            </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Rapid Plays
                  </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </dd>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">

                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      Training Nights
                  </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                  </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      <FooterLanding />
    </div>
  )
}

export default Events