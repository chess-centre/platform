
import LiChess from "../../assets/img/lichess.png";
import Chesscom from "../../assets/img/chesscom.png";
import ECF from "../../assets/img/ecf-logo.jpeg";

export default function Integrations() {
  return (
    <div className="bg-white">
      <h2 className="mt-10 sm:mt-4 text-3xl font-extrabold text-gray-900 text-center sm:mb-2">Integrated with</h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-3 filter grayscale">
        <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img className="h-12" src={ECF} alt="English Chess Federation" />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img className="h-12" src={LiChess} alt="Lichess" />
          </div>

          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img className="h-12" src={Chesscom} alt="Chess.com" />
          </div>
        </div>
      </div>
    </div>
  )
}