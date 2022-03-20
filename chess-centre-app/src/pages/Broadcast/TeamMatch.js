import Logo from "../../assets/img/logo-dark-theme.png";
import { name, teams, results } from "../../components/Events/Match/meta.json";
import { MatchTable } from "../../components/Events/Tables/Shared/MatchTable";
import HomeLogo from "../../assets/img/logo.png";
import AwayLogo from "../../assets/img/hammership-logo.png";

const TeamMatch = () => {
  return (
    <div className="bg-cool-gray-700 h-full grid grid-rows-1 grid-flow-col px-5 pt-4 pb-10">
      <div className="text-center">
        <div className=" bg-cool-gray-900 py-4 relative border-2 border-teal-600 shadow-lg rounded-lg">
          <div className="absolute left-10 top-8">
            <i className="fas fa-chess-king text-cool-gray-800 text-8xl"></i>
          </div>
          <div className="absolute right-10 top-8">
            <i className="fas fa-chess-queen text-cool-gray-800 text-8xl"></i>
          </div>
          <div>
            <img alt="The Chess Centre" className="h-16 mx-auto" src={Logo} />
          </div>
          <h2 className="tracking-tight leading-10 text-teal-500 text-3xl sm:leading-none">
            {name}
          </h2>
          <div className="tracking-tight text-gray-100 text-md leading-none mt-3">
            Welcome to the 1st dedicated, not for profit, chess centre in the UK
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-52">
            <img src={HomeLogo} className="w-56" alt="The Chess Centre" />
          </div>
          <div className="absolute right-0 top-52">
            <img src={AwayLogo} className="w-56" alt="Hammersmith" />
          </div>
        </div>
        <div className="relative grid grid-cols-1 gap-10 mx-56 py-6">
          <MatchTable
            teams={teams}
            results={results}
            round={1}
            whiteOnOdd={false}
            isLive={true}
          />
        </div>
        <div className="grid grid-cols-1 mt-4">
          <div className=" bg-cool-gray-900 border-2 border-cool-gray-700">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-cool-gray-600 sm:text-2xl">
                  Event Information
                </h2>
              </div>
              <dl className="mt-2 text-center sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-20">
                
                <div className="flex flex-col -mt-6">
                  <dt className="order-1 text-lg leading-6 font-medium text-gray-400">
                    <i className="fas fa-chess-clock-alt text-6xl"></i>
                  </dt>
                  <dd className="order-2 text-2xl font-extrabold text-white">80 mins + 10 sec</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="order-1 mt-2 text-lg leading-6 font-medium text-gray-400">
                    Live Games
                  </dt>
                  <dd className="order-2 text-2xl font-extrabold text-teal-400 mt-1">
                    chesscentre.online
                  </dd>
                </div>
                <div className="flex flex-col -mt-6">
                  <dt className="order-1 text-lg leading-6 font-medium text-gray-400">
                    <i className="fas fa-glass-cheers text-6xl"></i>
                  </dt>
                  <dd className="order-2 text-2xl font-extrabold text-white">7:00pm onwards</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMatch;
