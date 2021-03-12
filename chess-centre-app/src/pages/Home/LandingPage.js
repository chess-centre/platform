import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.svg";
import LogoWithName from "../../assets/img/logo-light-theme.png"
import FooterLanding from "../../components/Footer/LandingFooter";
import { useAuthState } from "../../context/Auth";

const LandingPage = () => {

  const [isExpanded, toggleExpansion] = React.useState(true);
  const { user } = useAuthState();

  return (
    <div>
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full" aria-hidden="true">
          <div className="relative h-full max-w-7xl mx-auto">
            <svg className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2" width="404" height="784" fill="none" viewBox="0 0 404 784">
              <defs>
                <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="784" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
            </svg>
            <svg className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2" width="404" height="784" fill="none" viewBox="0 0 404 784">
              <defs>
                <pattern id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="784" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
            </svg>
          </div>
        </div>

        <div className="relative pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
            <nav className="relative flex items-center justify-between sm:h-10 md:justify-center">
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <a href="/" aria-label="Home">
                    <img className="object-center h-10 md:w-auto" src={Logo} alt="Logo" />
                  </a>
                  <div className={(isExpanded ? "" : "hidden") + "-mr-2 flex items-center md:hidden"}>
                    <button onClick={() => toggleExpansion(!isExpanded)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" id="main-menu" aria-label="Main menu" aria-haspopup="true">
                      <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10">
                <Link className="font-medium text-gray-500 hover:text-orange-400 transition duration-150 ease-in-out" to="/events">Events</Link>
                <Link className="font-medium text-gray-500 hover:text-orange-400 transition duration-150 ease-in-out" to="/membership">Membership</Link>
                <Link className="font-medium text-gray-500 hover:text-orange-400 transition duration-150 ease-in-out" to="/our-mission">Our Mission</Link>
              </div>
              <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                <span className="inline-flex rounded-md shadow">
                  {user ?
                    <Link to="/app" className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-orange-600 bg-white hover:text-orange-500 focus:outline-none focus:border-orange-300 focus:shadow-outline-orange active:bg-gray-50 active:text-orange-700 transition duration-150 ease-in-out">My Dashboard</Link> :
                    <Link to="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-teal-600 bg-white hover:text-teal-500 focus:outline-none focus:border-teal-300 focus:shadow-outline-teal active:bg-gray-50 active:text-teal-700 transition duration-150 ease-in-out">Log in</Link>
                  }

                </span>
              </div>
            </nav>
          </div>


          <div className={(isExpanded ? "hidden " : "") + "absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"}>
            <div className="rounded-lg shadow-md">
              <div className="rounded-lg bg-white shadow-xs overflow-hidden" role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <img className="object-centre h-8 w-auto" src={LogoWithName} alt="Logo" />
                  <div className="-mr-2">
                    <button onClick={() => toggleExpansion(!isExpanded)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Close menu">
                      <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3">
                  <Link className="text-centre sm:text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-900 hover:bg-orange-50 focus:outline-none focus:text-teal-900 focus:bg-orange-50 transition duration-150 ease-in-out" role="menuitem" to="/events">Events</Link>
                  <Link className="text-centre sm:text-left mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-900 hover:bg-orange-50 focus:outline-none focus:text-teal-900 focus:bg-orange-50 transition duration-150 ease-in-out" role="menuitem" to="/membership">Membership</Link>
                  <Link className="text-centre sm:text-left mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-900 hover:bg-orange-50 focus:outline-none focus:text-teal-900 focus:bg-orange-50 transition duration-150 ease-in-out" role="menuitem" to="/our-mission">Our Mission</Link>
                </div>
                <div>
                  {
                    user ?
                      <Link className="block w-full px-5 py-3 text-center font-medium text-teal-900 bg-gray-50 hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:bg-gray-100 focus:text-teal-700 transition duration-150 ease-in-out" role="menuitem" to="/app">
                        My Dashboard
                      </Link> : 
                      <Link className="block w-full px-5 py-3 text-center font-medium text-teal-900 bg-gray-50 hover:bg-gray-100 hover:text-teal-700 focus:outline-none focus:bg-gray-100 focus:text-teal-700 transition duration-150 ease-in-out" role="menuitem" to="/login">
                        Log in
                      </Link>
                  }

                </div>
              </div>
            </div>
          </div>

          <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="text-center">
              <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                Welcome to 
              <br className="xl:hidden" />
                <span className="text-teal-500"> The Chess Centre</span>
              </h2>
              <p className="mt-5 sm:mt-3 sm:max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                It's time things changed around here. Brace yourselves! <span role="img">🚀</span>
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className={user ? "hidden" : "rounded-md shadow"}>
                  <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:border-teal-700 focus:shadow-outline-teal transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                    Join Now
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link to="/events" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-teal-600 bg-white hover:text-teal-500 focus:outline-none focus:border-teal-300 focus:shadow-outline-teal transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          </main>

        </div>
      </div>
      <div className="py-12 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-400 text-white">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div className="mt-5">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Competitions
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </dd>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-400 text-white">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <div className="mt-5">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Socials
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </dd>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-400 text-white">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="mt-5">
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Professional Coaching
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
      <FooterLanding></FooterLanding>
    </div>
  )
}

export default LandingPage;
