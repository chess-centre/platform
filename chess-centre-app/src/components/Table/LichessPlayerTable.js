import { useState, useMemo } from "react";
import moment from "moment";
import Table from "./index";
import ChallengePlayerModal from "../../components/Modal/ChallengePlayerModal";

export default function LichessPlayersTable({ userId, players, colour, statuses }) {

  const [data, setData] = useState({ open: false, handle: "", status: {} });

  const openModal = ({ handle }) => {
    const status = statuses.find(s => s.id === handle.toLowerCase());
    if(status) {
      setData({ open: true, handle, status });
    }   
  };
  
  const closeModal = () => {
    setData(state => ({ ...state, open: false, status: {} }));
  };

  const DiffArrow = (diff) => {
    switch (diff) {
      case 1:
        return <i className="text-green-500 fas fa-caret-up mr-2"></i>;
      case -1:
        return <i className="text-red-700 fas fa-caret-down mr-2"></i>;
      case 0:
        return <i className="text-gray-200 far fa-caret-right mr-2"></i>;
      default:
        return <></>;
    }
  };

  const numberWithCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
        show: false,
      },
      {
        Header: "bulletDiff",
        accessor: "bulletDiff",
        show: false,
      },
      {
        Header: "blitzDiff",
        accessor: "blitzDiff",
        show: false,
      },
      {
        Header: "rapidDiff",
        accessor: "rapidDiff",
        show: false,
      },
      {
        Header: "isOnline",
        accessor: "isOnline"
      },
      {
        Header: "#",
        accessor: "rank",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: (props) => {
          return (
            <span className="inline-block relative">
              {props.cell.value}
              { props.row.values?.isOnline && <span className="absolute animate-pulse top-0 -right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-green-400" /> }
            </span>
          );
        },
      },
      {
        Header: () => <div className="mx-auto">Games</div>,
        accessor: "total",
        Cell: (props) => (
          <div className="font-medium text-sm text-center">
            {numberWithCommas(props.cell.value)}
          </div>
        ),
      },
      {
        Header: "Bullet",
        accessor: "lichessBullet",
        Cell: (props) => (
          <div className="text-sm text-gray-500">
            {props.cell.value && DiffArrow(props.row.values.bulletDiff)}
            {props.cell.value}
          </div>
        ),
      },
      {
        Header: "Blitz",
        accessor: "lichessBlitz",
        Cell: (props) => (
          <div className="text-sm text-gray-500">
            {props.cell.value && DiffArrow(props.row.values.blitzDiff)}
            {props.cell.value}
          </div>
        ),
      },
      {
        Header: "Rapid",
        accessor: "lichessRapid",
        Cell: (props) => (
          <div className="text-sm text-gray-500">
            {props.cell.value && DiffArrow(props.row.values.rapidDiff)}
            {props.cell.value}
          </div>
        ),
      },
      {
        Header: () => <div className="mx-auto">Puzzle Rating</div>,
        accessor: "puzzleRating",
        Cell: (props) => (
          <div className="font-medium text-sm text-center px-10 sm:px-2">
            {props.cell.value}
          </div>
        ),
      },
      {
        Header: "Handle",
        accessor: "handle",
        Cell: (props) => {
          return props.row.values.id !== userId ? (
            <button
              onClick={() => openModal({ handle: props.cell.value })}
              type="button"
              className="w-full text-center items-center px-2.5 py-1 border border-gray-200 shadow-sm text-xs rounded text-teal-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              @{props.cell.value}
            </button>
          ) : (
            <div className="px-2.5 text-xs font-medium text-gray-600">
              @{props.cell.value}
            </div>
          );
        },
      },
      {
        Header: "Last Updated",
        accessor: "lastUpdated",
        Cell: (props) => (
          <div className="text-sm text-gray-500">
            {moment(props.cell.value).format("Do MMM @ HH:mm")}
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId]
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="md:max-w-5xl">
        <div className="mt-6">
          {players && (
            <Table
              columns={columns}
              data={players}
              searchPlaceholder="players..."
              colour={colour}
            />
          )}
        </div>
      </main>
      <ChallengePlayerModal
        {...{ closeModal, data }}
      />
    </div>
  );
}
