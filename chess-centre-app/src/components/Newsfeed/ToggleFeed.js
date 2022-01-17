export default function ToggleFeed() {
    return (
        <div className="inline-flex shadow-md rounded-md m-auto -ml-1">
            <div className="relative z-0 inline-flex rounded-md">
                <button
                    type="button"
                    className={`text-gray-700 relative inline-flex items-center px-4 py-2
                    rounded-l-md border border-gray-300 bg-white text-xs  hover:bg-gray-50
                    focus:z-10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
                >
                    Results
                </button>
                <button

                    type="button"
                    className={`text-gray-700 -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xs
                    hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
                >
                    General
                </button>
                <button
                    type="button"
                    className={`text-gray-700 -ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300
                    bg-white text-xs hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500`}
                >
                    Ratings
                </button>
            </div>
        </div >
    );
}
