import React from "react";
import DivOne from "../../components/Events/Tables/JulyRapidplayDivOne";
import DivTwo from "../../components/Events/Tables/JulyRapidplayDivTwo";
import DivThree from "../../components/Events/Tables/JulyRapidplayDivThree";
import { Link } from "react-router-dom";

const Viewer = () => {
    return (
        <div className="grid grid-rows-1 grid-flow-col gap-4 px-40 py-10 h-screen">
            <div className="">
                <div className="text-center">
                    <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                        <span className="bg-gradient-to-r text-gradient from-teal-600 to-teal-400">The Chess Centre</span>
                    </h2>
                    <h3 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900">
                        <span className="text-gray-900">July Rapidplay 2021</span>
                    </h3>
                    <div className="text-left absolute"><Link className="text-teal-600 hover:text-teal-500 text-xs" to="/internal/live"><i className="far fa-long-arrow-alt-left"></i> back</Link></div>
                    <div className="grid grid-cols-3 mt-4">
                        <DivOne></DivOne>
                        <DivTwo></DivTwo>
                        <DivThree></DivThree>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Viewer;