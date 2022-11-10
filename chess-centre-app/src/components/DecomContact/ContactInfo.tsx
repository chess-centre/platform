import React from "react";
import { Link } from "react-router-dom";

export default function ContactInfo() {
  return (
    <div className="bg-white mb-20">
      <div className="max-w-7xl mx-auto pt-16 pb-10 px-4 sm:py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Business Continuity
        </h2>
        <div className="mt-12  text-center">
          <div className="grid grid-1 space-y-4">
            <p className="text-teal-600">For all information regarding future Chess Centre events, please contact:</p>
            <p className="text-4xl">Andrew Wainwright</p>
            <p className="text-md text-gray-500">email</p>
            <p className="text-2xl">info@ilkleychesscentre.com</p>
          </div>

          <div className="mt-10">
            <h1 className="text-red-500 text-lg font-semibold">Existing Members</h1>
            <p className="text-teal-600">You can continue to <Link to="/login" className="text-teal-800 font-normal">login</Link> to your account and manage your existing subscription.</p>
          </div>
        </div>
      </div>
    </div>
  );
}