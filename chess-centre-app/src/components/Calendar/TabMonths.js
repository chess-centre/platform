export default function ToggleView({ selectedMonth, months, setSelectedMonth }) {
  return (
    <div className="inline-flex shadow-md rounded-md m-auto -ml-1">
      <div className="relative z-0 inline-flex rounded-md">
        <button
          onClick={() => setSelectedMonth(months[0])}
          type="button"
          className={`${
            selectedMonth === months[0]
              ? "text-teal-600 font-medium"
              : "text-gray-700"
          } relative inline-flex items-center px-4 py-2
                      rounded-l-md border border-gray-300 bg-white text-xs  hover:bg-gray-50
                      focus:z-10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
        >
          {new Date(2000, months[0], 1).toLocaleString("default", {
            month: "short",
          })}
        </button>
        <button
          onClick={() => setSelectedMonth(months[1])}
          type="button"
          className={`${
            selectedMonth === months[1]
              ? "text-orange-600 font-medium"
              : "text-gray-700"
          } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xs
                       hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
        >
          {new Date(2000, months[1], 1).toLocaleString("default", {
            month: "short",
          })}
        </button>
        <button
          onClick={() => setSelectedMonth(months[2])}
          type="button"
          className={`${
            selectedMonth === months[2]
              ? "text-teal-600 font-medium"
              : "text-gray-700"
          } -ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300
                      bg-white text-xs hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
        >
          {new Date(2000, months[2], 1).toLocaleString("default", {
            month: "short",
          })}
        </button>
      </div>
    </div>
  );
}
