export default function ToggleView({ selectedMonth, months, setSelectedMonth }) {
  return (
    <div className="inline-flex shadow-md rounded-md m-auto -ml-1">
      <div className="relative z-0 inline-flex rounded-md">
        <button
          onClick={() => setSelectedMonth(months[0])}
          type="button"
          className={`${
            selectedMonth === months[0]
              ? "text-yellow-500 font-medium bg-gray-100"
              : "text-gray-700"
          } relative inline-flex items-center px-4 py-2
                      rounded-l-md border border-gray-300 bg-white text-xs  hover:bg-gray-50
                      focus:z-10 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400`}
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
              ? "text-yellow-500 font-medium bg-gray-100"
              : "text-gray-700"
          } -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xs
                       hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400`}
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
              ? "text-yellow-500 font-medium bg-gray-100"
              : "text-gray-700"
          } -ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300
                      bg-white text-xs hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400`}
        >
          {new Date(2000, months[2], 1).toLocaleString("default", {
            month: "short",
          })}
        </button>
      </div>
    </div>
  );
}
