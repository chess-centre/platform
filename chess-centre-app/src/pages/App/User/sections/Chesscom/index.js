import { API } from "aws-amplify";
import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import chesscomImage from "../../../../../assets/img/chesscom.png";
import { AtSymbolIcon } from "@heroicons/react/solid";

export default function ChesscomFetch({ chesscomUsername, chesscomInfo }) {

    const { addToast } = useToasts();
    const [isFetching, setIsFetching] = useState(false);

    const [username, setUsername] = useState("");
    const [blitz, setBlitz] = useState(0);
    const [bullet, setBullet] = useState(0);

    useEffect(() => {
        setUsername(chesscomUsername || "");
        if(chesscomInfo) {
            try {
                const parsed = JSON.parse(chesscomInfo);
                setBlitz(parsed.chess_blitz.last.rating);
                setBullet(parsed.chess_bullet.last.rating);
            } catch (error) {
                console.log(error);
            }
        }
    }, [chesscomUsername, chesscomInfo]);

    const getChesscomData = async () => {
        if (!username) return;
        setIsFetching(true);
        try {
            const response = await API.post("chesscom", `/user/${username}`);
            if (response) {
                const { chess_bullet, chess_blitz } = response;
                setBlitz(chess_blitz?.last.rating);
                setBullet(chess_bullet?.last.rating);
                addToast(`Successfully updated your Chess.com username!`, {
                    appearance: "success",
                    autoDismiss: true,
                });   
            }
            setIsFetching(false);
        } catch (error) {
            console.log(error);
            setIsFetching(false);
        }
    };

    return (
        <div className="col-span-6 sm:col-span-3 border border-dotted p-4 rounded-lg">
            <div className="col-span-12 gap-6">
                <img
                    src={chesscomImage}
                    alt="Chess.com"
                    className="sm:w-60 sm:h-18 mb-3 w-32 m-auto"
                />
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Username
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <div className="relative flex items-stretch flex-grow focus-within:z-10">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <AtSymbolIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </div>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                name="chesscomUsername"
                                id="chesscomUsername"
                                defaultValue={chesscomUsername}
                                className="focus:ring-teal-500 focus:border-teal-500 block w-full rounded-none rounded-l-md pl-10 text-xs sm:text-sm border-gray-300"
                                placeholder="MagnusCarlsen"
                            />
                        </div>
                        <button
                            onClick={getChesscomData}
                            type="button"
                            className="-ml-px relative inline-flex items-center space-x-2 px-2 sm:px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                        >
                            {isFetching ? <div className="flex">
                                <i className="fas fa-spinner-third animate-spin"></i>
                                <span className="ml-2 text-xs">Checking...</span>
                            </div> :
                                <>
                                <i className="text-teal-500 fal fa-sync"></i>
                                <span>Sync</span> </>
                            }
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3 gap-6 mt-6">
                    <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        <div className="flex">Bullet</div>
                        <input
                            className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 sm:text-gray-500 cursor-not-allowed
                      focus:outline-none focus:ring-teal-500 focus:border-teal-500 disabled:opacity-60`}
                            disabled
                            value={bullet}
                            type="text"
                        />
                    </div>
                </div>
                <div className="col-span-3 gap-6 mt-6">
                    <div className="block text-sm font-medium text-gray-700">
                        <div className="flex">Blitz</div>

                        <input
                            className={`text-xs sm:text-sm mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 sm:text-gray-500 cursor-not-allowed
                      focus:outline-none focus:ring-teal-500 focus:border-teal-500 disabled:opacity-60`}
                            disabled
                            value={blitz}
                            type="text"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
