import { API } from "aws-amplify";
import { useEffect, useState } from "react";

export default function InstagramFeed({ count, tag }) {
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getInstagramData = async () => {
      setIsLoading(true);
      const response = await API.get("social", `/instagram/feed`, {
        queryStringParameters: {
          count,
          tag,
        },
      }).catch((e) => {
        console.log("error", e);
      });
      if (response) {
        setFeed(response);
      }
      setIsLoading(false);
    };

    getInstagramData();
  }, [count, tag]);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Instagram</h2>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {!isLoading &&
          feed &&
          feed.map((post) => (
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
      </div>
    </div>
  );
}
