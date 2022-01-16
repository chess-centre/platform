import { useState, useEffect } from "react";
import AppEvents from "../../components/Events/AppEvents";
import { isPaidMember } from "../../context/Auth";

function Events() {
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    
    document.title = "The Chess Centre | Events";

    async function fetchMember() {
      const membershipStatus = await isPaidMember();
      setIsPaid(membershipStatus);
    }
    fetchMember();
  }, []);

  return (
    <>
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fad fa-calendar-edit text-teal-600"></i> Events
        {isPaid && (
          <div className="inline-flex align-top top-2">
          <span className="ml-2 items-center px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800 top-2">
            Premium 
          </span>
          </div>
        )}
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-sm text-left text-gray-500 dark:text-gray-300">
            List of our forth coming events open for registration
          </p>
        </div>
      </div>

      <main>
        <AppEvents />
      </main>
    </>
  );
}

export default Events;
