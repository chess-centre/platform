import ToggleFeed from "./ToggleFeed";
export default function Calendar() {


    return (
        <div className="sm:max-w-none mt-6">
            <div className="mx-auto text-center">
                <div className="relative flex mb-5 mt-2">
                    <div className="ml-1 z-0 top-6 inline-flex m-auto">
                        <ToggleFeed />
                    </div>
                </div>
            </div>
            <ListSkeleton />
        </div>
    );
}

function ListSkeleton() {
    return (
        <li className="col-span-1 flex mb-3 z-0">
            <div className="relative z-0 flex-1 flex items-center justify-between border-t border-b border-l border-gray-200 bg-white rounded-lg truncate shadow">

                <div className="px-4 sm:px-6 py-0 text-sm truncate w-full">
                    <h2 className="sm:text-2xl sm:font-medium font-bold text-lg h-7  rounded-md mt-2 mb-2 w-2/3 sm:w-1/4">December Rapidplay</h2>
                    <div className="h-36 flex justify-center items-center">
                        <p>
                            table of content
                        </p>
                    </div>
                </div>
                <div

                ></div>
                <div className="flex-shrink-0 pr-2 w-28 h-10 relative top-14">
                    tag :
                    <div
                        className={`w-20 h-8 sm:w-12 sm:h-12 bg-gray-100 inline-flex items-center
              justify-center text-gray-300 rounded-lg hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 mr-2 sm:mr-4`}
                    >   
                        <span className="text-gray-400">
                            Results
                        </span>
                    </div>
                </div>
            </div>
        </li>
    );
}