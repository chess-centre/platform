import { SearchIcon } from "@heroicons/react/solid";

export const Search = ({ searchTerm, setSearchTerm, selectedTags, setSelectedTags, onResultChange }) => {
  
  const handleSearchInput = (search) => {
    setSearchTerm(search);
    onResultChange({ search });
  };

  const handleRemoveTags = (tag) => {
    const newArr = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newArr);
    onResultChange({ tag: "" });
  };

  return (
    <>
      <div className="relative self-center mt-6 bg-gray-100 rounded-lg flex sm:mt-8">
        <div className="flex-1 min-w-0">
          <label htmlFor="search" className="sr-only">
            Search questions...
          </label>
          <div className="relative rounded-md shadow-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              onChange={(e) => handleSearchInput(e.target.value)}
              type="search"
              name="search"
              defaultValue={searchTerm}
              autoComplete="off"
              id="search"
              className="focus:border-teal-500 block w-full pl-10 sm:text-sm border-teal-500 rounded-md"
              placeholder="Search questions..."
            />
          </div>
        </div>
      </div>
      <div className="inline-block mt-2">
        {selectedTags &&
          selectedTags.map((tag, key) => {
            return (
              <span
                key={key}
                onClick={() => handleRemoveTags(tag)}
                className="inline-flex items-center py-0.5 pl-2 pr-0.5 mr-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"
              >
                {tag}
                <button
                  type="button"
                  className="cursor-pointer flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-yellow-400 hover:bg-yellow-200 hover:text-yellow-500 focus:outline-none focus:bg-yellow-500 focus:text-white"
                >
                  <svg
                    className="h-2 w-2"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 8 8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      d="M1 1l6 6m0-6L1 7"
                    />
                  </svg>
                </button>
              </span>
            );
          })}
      </div>
    </>
  );
};
