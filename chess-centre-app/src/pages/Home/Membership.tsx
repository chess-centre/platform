import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";
import MembershipCard from "../../components/Membership/MembershipCard";
import { Memberships } from "../../api/data.memberships";

function Membership() {

  useEffect(() => {
    document.title = "Sheffield Chess Centre | Membership"
  }, []);

  return (
    <div>
      <div className="relative bg-gray-50 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav current="membership" />
      </div>
      <div className="bg-yellow-700">
        <div className="pt-12 sm:pt-16 lg:pt-10">
          <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
              <p className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Join our community
              </p>
              <div className="pt-4">
                <i className="fad fa-users-crown fa-4x text-white"></i>
              </div>
              <p className="text-xl text-gray-300">
                Learning, playing and discovering what makes this game so
                amazing!
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <svg
            className="hidden xl:block z-10 absolute -top-0 right-0 md:-mr-32 2xl:-mr-4"
            width="500"
            height="700"
            fill="none"
            viewBox="0 0 500 700"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-yellow-500"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="500"
              height="700"
              fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
            />
          </svg>

          <svg
            className="hidden md:block z-10 absolute -top-52 left-0 md:-ml-32 2xl:-ml-4"
            width="500"
            height="500"
            fill="none"
            viewBox="0 0 500 500"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="95e8f2de-6d30-4b7e-8159-f791729db21b"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-yellow-500"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="500"
              height="500"
              fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
            />
          </svg>
        </div>
        <div className="mt-8 pb-12 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-10">
          <div className="relative">
            <div className="absolute inset-0 h-3/4 bg-yellow-700"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
                {Memberships.map((membership, key) => {
                  return (
                    <div className="z-20" key={key}>
                      <MembershipCard key={key} direct={false} {...membership} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-6 relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-6 lg:mt-6">
            <div className="max-w-md mx-auto lg:max-w-5xl">
              <div className="rounded-lg bg-white px-6 py-2 lg:flex lg:items-center border border-light-blue-300 shadow mb-4 pb-6 sm:mr-16 sm:ml-16">
                <div className="flex-1">
                  <div className="text-center text-sm font-normal text-gray-900 space-y-2">
                    <h2 className="mt-4 text-2xl font-extrabold">Still deciding?</h2>
                    <p>Come pay us a visit and see what we've got to offer. There is no charge for your first few visits and no obligation to sign-up.</p>
                    <div><Link to="/faqs?tag=membership" className="text-yellow-400 hover:underline hover:text-yellow-600 text-lg">FAQs</Link></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterLanding />
      </div>
    </div>
  );
}

export default Membership;
