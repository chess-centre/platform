import React, { useEffect } from "react";
import LeanNewsFeed from '../../components/Newsfeed/LeanNewsFeed';
export default function Newsfeed() {


    useEffect(() => {

        document.title = "The Chess Centre | News feed";


    }, []);
    return (
        <>
            <h1 className="relative my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                <i className="fas fa-rss-square text-teal-600"></i> News feed
            </h1>
            <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
                <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
                    <p className="ml-2 mt-1 text-sm text-left text-gray-500 dark:text-gray-400">
                        news feed.
                    </p>
                </div>
            </div>
            <LeanNewsFeed />
        </>
    );
}
