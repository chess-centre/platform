import React, { useEffect } from "react";
import Calendar from "../../components/Calendar/LeanCalendar";

export default function AppCalendar() {

  useEffect(() => {
    document.title = "Sheffield Chess Centre | Calendar";
  }, []);

  return (
    <div className="overscroll-none">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-calendar-alt text-teal-600"></i> Calendar
        <div className="inline-flex align-top top-2"></div>
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-sm text-left text-gray-500 dark:text-gray-300">
            Events happening in our club in the coming weeks
          </p>
        </div>
      </div>
      <div className="mb-6 -ml-1">
        <Calendar />
      </div>
      
    </div>
  );
}
