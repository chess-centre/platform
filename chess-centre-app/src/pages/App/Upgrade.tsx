import React from "react";
import { Link } from "react-router-dom";
import MembershipCard from "../../components/Membership/MembershipCard";
import { Memberships } from "../../api/data.memberships";

export default function Upgrade() {
  document.title = "Sheffield Chess Centre | Membership";

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Upgrade
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <p className="ml-2 mt-1 text-sm text-gray-500 dark:text-gray-300 truncate">
            Ready to join our community?
          </p>
        </div>
      </div>
      <main className="mt-5">
        <div className="relative">
          <div className="absolute inset-0 h-3/4"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
              {Memberships.map((membership, key) => {
                return <MembershipCard direct key={key} {...membership} />;
              })}
            </div>
          </div>
          <div className="mt-6 relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-6 lg:mt-6">
            <div className="max-w-md mx-auto lg:max-w-5xl">
              <div className="rounded-lg bg-white px-6 py-2 lg:flex lg:items-center border border-light-blue-300 shadow mb-4 pb-6 sm:mr-16 sm:ml-16">
                <div className="flex-1">
                  <div className="text-center text-sm font-normal text-gray-900 space-y-2">
                    <h2 className="mt-4 text-2xl font-extrabold">Still deciding?</h2>
                    <p>Come pay us a visit and see what we've got to offer. There is no charge for your first few visits and no obligation to sign-up.</p>
                    <div><Link to="/app/faqs?tag=membership" className="text-teal-500 hover:underline hover:text-teal-700 text-lg">FAQs</Link></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
