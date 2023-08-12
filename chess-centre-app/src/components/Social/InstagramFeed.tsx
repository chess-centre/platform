import { useInstagram } from "../../api/social";

export default function InstagramFeed({ count, tag }) {
  const { isLoading, error, data } = useInstagram({ count, tag });
  
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Instagram</h2>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {!isLoading &&
          !error &&
          data &&
          data.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg shadow-2xl overflow-hidden">
                <img
                  src={post.media_url}
                  alt="chess"
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
            </a>
          ))}
        {isLoading &&
          [...new Array(count)].map((_, index) => (
            <div
              key={index}
              className="relative w-full h-72 aspect-w-1 aspect-h-1 bg-gray-200 animate-pulse rounded-lg shadow-2xl overflow-hidden"
            >
              <span className="absolute inset-0 flex items-center justify-center">
                <i className="fab fa-instagram fa-6x text-gray-300"></i>
              </span>
            </div>
          ))}
      </div>
      {error && (
        <div className="text-center">
          <span className="text-8xl sm:text-8xl">
            <i className="fad fa-images text-yellow-600"></i>
          </span>
          <h3 className="mt-2 text-2xl text-gray-600 font-extrabold">
            Oh, no images...
          </h3>
          <p className="mt-6 mx-6 sm:mx-0 text-md text-gray-600">
            You can find more directly via our Instagram
          </p>
          <p className="mt-6 mx-6 sm:mx-0 text-md">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/thechesscentre"
              className="text-gray-400 hover:text-pink-700"
            >
              <span className="sr-only">Instagram</span>
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </p>
          <p className="mt-2 mx-6 sm:mx-0 text-md">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/thechesscentre"
              className="text-gray-400 hover:text-pink-700 font-medium"
            >
              @thechesscentre
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
