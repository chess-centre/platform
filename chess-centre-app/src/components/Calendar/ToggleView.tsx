export default function ToggleView({ calendarView, handleViewSwitch }) {
  return (
    <div className="shadow-md rounded-md mt-0.5">
      <button
        onClick={() => handleViewSwitch("list")}
        type="button"
        className={`${
          calendarView === "list"
          ? "text-yellow-500 font-bold bg-gray-100"
          : "font-medium text-gray-500 bg-white"
        } relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm
     hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400`}
      >
        <span className="sr-only">List</span>
        <i className="fas fa-list"></i>
      </button>
      <button
        onClick={() => handleViewSwitch("grid")}
        type="button"
        className={`${
          calendarView === "grid"
            ? "text-yellow-500 font-bold bg-gray-100"
            : "font-medium text-gray-500 bg-white"
        } -ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300  text-sm
      hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400`}
      >
        <span className="sr-only">Grid</span>
        <i className="fas fa-th"></i>
      </button>
    </div>
  );
}
