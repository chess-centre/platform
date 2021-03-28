import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "../../context/Auth";


const Live = () => {
    const { user } = useAuthState();

    return (
        <div class="grid grid-rows-3 grid-flow-col gap-4 px-10 py-10 h-screen">
            <div class="row-span-3 col-span-4 bg-pink-400 rounded-lg shadow-xs overflow-hidden">

                <div className="text-center text-white">
                    Live Broadcast
                </div>

            </div>
            <div class="col-span-1 col-span-1 bg-pink-400 rounded-lg shadow-xs overflow-hidden">

                <div className="text-center text-white">
                    Next Events
                </div>

            </div>
            <div class="row-span-1 col-span-1 bg-pink-400 rounded-lg shadow-xs overflow-hidden">

                <div className="text-center text-white">
                    QR Code
                </div>

            </div>
        </div>
    );
};

export default Live;
