import API from "@aws-amplify/api";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import EntriesTable from "../../components/EntriesTable/festivalTable";
import RoundTimes from "../../components/RoundTimes/Rounds";
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";


export default function EventInfo() {
    const { eventId } = useParams();
    const history = useHistory();
    const [eventName, setEventName] = useState("");
    const [eventInfo, setEventInfo] = useState({});
    const { isLoading, error, data } = useEvents(eventId);


    const handleGoBack = () => {
        return history.goBack();
    };

    useEffect(() => {
        document.title = "The Chess Centre | Event Information";

        if(!isLoading) {
            setEventInfo(data[0]);
            setEventName(data[0].name);
        }

        return () => { 

        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div className="overscroll-none">
            <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                <i className="fas fa-chess-king text-teal-600"></i> Event{" "}
                <span className="text-sm text-gray-500">information</span>
            </h1>
            <div className="pb-5 border-b border-gray-200">
                <div className="md:flex md:items-center md:justify-between">
                    {eventName && (
                        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
                            <p className="ml-2 mt-1 text-md text-gray-500 truncate">
                                {eventName}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-2 mx-auto grid grid-cols-1 max-w-full">
                <section className="sm:col-span-2 order-2">
                    <div className="grid grid-cols-1">
                        <div>
                            {!isLoading && !Boolean(error) && <InfoView data={eventInfo} />}
                        </div>
                        <div>
                            {isLoading && <LoadingView />}
                        </div>
                        <div>
                            {Boolean(error) && <ErrorView />}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}


function LoadingView() {
    return (
        <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-10 text-center">
            <span className="animate-pulse">
                <i className="aninmal-pulse fal fa-chess-board fa-10x text-gray-400 opacity-50"></i>
            </span>
            <p className="mt-2 block text-sm font-medium text-gray-600">
                Loading event information...
            </p>
        </div>
    )
}

function ErrorView() {
    return (
        <div className="relative mt-6 block w-full border-2 border-gray-300 border-dashed rounded-sm p-12 text-center">
            <span>
                <i className="aninmal-pulse fal fa-exclamation-square fa-10x text-orange-400 opacity-50"></i>
            </span>
            <p className="mt-2 block text-sm font-medium text-gray-600">
                Oops, there seems to be an issue loading this event info. Try again
                later.
            </p>
        </div>
    )
}

function InfoView({ data }) {
    console.log("DATA", data);
    return (
        <div className="grid grid-cols-2">
            <EntriesTable eventDetails={data} />
            <div>
                <RoundTimes eventId={data.id} eventType={data.type.eventType} removeStyles={true} />
            </div>
        </div>
    )
}