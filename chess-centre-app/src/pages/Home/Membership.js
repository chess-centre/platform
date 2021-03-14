import React from 'react';
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import MembershipCard from "../../partials/MembershipCard";

function Membership() {

  const data = [{
    title: "Juniors",
    price: "£20",
    subHeading: "Under 16 as at September 2021.",
    benefits: [
      "Weekly Training Sessions",
      "Tailored Development Curriculum",
      "Professional Coaching and Tuition"
    ],
    discounted: false
  },
  {
    title: "Premium Member",
    price: "£20",
    subHeading: "Adult Players",
    benefits: [
      "Weekly Social Chess",
      "Weekly Rated Match Chess",
      "Wide Range of Club Events and Competitions"
    ],
    discounted: false
  },
  {
    title: "Student",
    price: "£15",
    subHeading: "Adult Players",
    benefits: [
      "Weekly Social Chess",
      "Weekly Rated Match Chess",
      "Wide Range of Club Events and Competitions"
    ],
    discounted: true
  },
  {
    title: "OAP",
    price: "£15",
    subHeading: "Adult Players",
    benefits: [
      "Weekly Social Chess",
      "Weekly Rated Match Chess",
      "Wide Range of Club Events and Competitions"
    ],
    discounted: true
  }
  ];

  return (
    <div>
      <div className="relative bg-gray-50 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav />
      </div>

      <div className="bg-teal-700">
        <div className="pt-12 sm:pt-16 lg:pt-10">
          <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
              <p className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Join our community
              </p>
              <p className="text-xl text-gray-300">
                It's so much more than chess, it's being part of our community, learning, playing and discovering what makes this game so amazing!
            </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pb-12 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-20">
          <div className="relative">
            <div className="absolute inset-0 h-3/4 bg-teal-700"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">

                {
                  data.map(m => {
                    return <MembershipCard {...m} />
                  })
                }

              </div>
            </div>
          </div>
          <div className="mt-4 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mt-5">
            <div className="max-w-md mx-auto lg:max-w-5xl">
              <div className="rounded-lg bg-gray-100 px-6 py-8 sm:p-10 lg:flex lg:items-center">
                <div className="flex-1">
                  <div className="mt-4 text-lg text-gray-600">Got an amazing idea to grow our community and bring Chess to a greater audience?</div>
                </div>
                <div className="mt-6 rounded-md shadow lg:mt-0 lg:ml-10 lg:flex-shrink-0">
                  <a href="/" className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50">
                    Contact Us
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterLanding />
      </div>

    </div>
  )
}

export default Membership