import React from "react";
import MembershipCard from "../../components/Membership/MembershipCard";
import { Memberships } from "../../api/data.memberships";

export default function Upgrade() {
  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Upgrade
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <p className="ml-2 mt-1 text-sm text-gray-500 dark:text-gray-300 truncate">Ready to join our community?</p>
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
        </div>
      </main>
    </>
  );
};