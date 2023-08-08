import { useEffect } from "react";
import InstagramFeed from "../../components/Social/InstagramFeed";

export default function Gallery() {

  useEffect(() => {
    document.title = "The Chess Centre | Gallery";
  }, []);

  return (
    <div className="overscroll-none">
      <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        <i className="fas fa-camera-retro text-teal-600"></i> Gallery
        <div className="inline-flex align-top top-2"></div>
      </h1>
      <div className="pb-5 border-b border-gray-200">
        <div className="md:flex md:items-center md:justify-between">
          <p className="text-sm text-left text-gray-500 dark:text-gray-300">
            Checkout some of the pictures taken during our events.
          </p>
        </div>
      </div>
      <InstagramFeed count={12} />
    </div>
  );
}