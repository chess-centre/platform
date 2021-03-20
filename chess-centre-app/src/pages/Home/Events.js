import React from "react";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

function Events() {
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="relative pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav />
      </div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">
              Events
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Join us
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Our members can register for events and see more about the players
              already entered.
            </p>
          </div>
        </div>
        <div class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl mb-4">
          <div class="mt-2 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            <div>
              <div>
                <a href="#" class="inline-block">
                  <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    Congress
                  </span>
                </a>
              </div>
              <a href="#" class="block mt-4">
                <p class="text-xl font-semibold text-gray-900">
                  All Play All
                </p>
                <p class="mt-3 text-base text-gray-500">
                  Long play time controls, ECF graded chess congress.
                </p>
                <p class="mt-3 text-sm text-teal-500">
                  Last Entry:
                </p>
              </a>
              <div class="mt-6 flex items-center">
                <div class="flex-shrink-0">
                  <a href="#">
                    <span class="sr-only">Paul York</span>
                    <img
                      class="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=aBSgQKFntQ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </a>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    <a href="#">Joe Blogs</a>
                  </p>
                  <div class="flex space-x-1 text-sm text-gray-500">
                    <time datetime="2020-03-16">Mar 16, 2020</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>Seeded 1st</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <a href="#" class="inline-block">
                  <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                    RapidPlay
                  </span>
                </a>
              </div>
              <a href="#" class="block mt-4">
                <p class="text-xl font-semibold text-gray-900">
                  Six Round Swiss
                </p>
                <p class="mt-3 text-base text-gray-500">
                  25 minutes per player. No time to waste!
                </p>
                <p class="mt-3 text-sm text-teal-500">
                  Last Entry:
                </p>
              </a>
              <div class="mt-6 flex items-center">
                <div class="flex-shrink-0">
                  <a href="#">
                    <span class="sr-only">Jane Smith</span>
                    <img
                      class="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixqx=aBSgQKFntQ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </a>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    <a href="#">Dessie Ryan</a>
                  </p>
                  <div class="flex space-x-1 text-sm text-gray-500">
                    <time datetime="2020-03-10">Mar 10, 2020</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>Seeded 4th</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div>
                <a href="#" class="inline-block">
                  <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Junior
                  </span>
                </a>
              </div>
              <a href="#" class="block mt-4">
                <p class="text-xl font-semibold text-gray-900">
                  Group Coaching
                </p>
                <p class="mt-3 text-base text-gray-500">
                  Improve your skills with this indepth endgame training session.
                </p>
                <p class="mt-3 text-sm text-teal-500">
                  Last Entry:
                </p>
              </a>
              <div class="mt-6 flex items-center">
                <div class="flex-shrink-0">
                  <a href="#">
                    <span class="sr-only">Easer Collins</span>
                    <img
                      class="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixqx=aBSgQKFntQ&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </a>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    <a href="#">Easer Collins</a>
                  </p>
                  <div class="flex space-x-1 text-sm text-gray-500">
                    <time datetime="2020-02-12">Feb 12, 2020</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}

export default Events;
