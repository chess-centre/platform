import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chessboard from 'reactjs-chessboard';

function MemberProfile() {
  const { memberId } = useParams();
  const [member, setMember] = useState({});

  useEffect(() => {
    // Fetch Member Info
    setTimeout(() => {
      setMember((member) => ({
        ...member,
        // EXAMPLE RESPONSE:
        name: "Matthew Webb",
        grade: 247,
        rating: 2249,
        club: "The Chess Centre",
        about:
          "My favourite player is Bobby Fischer, followed closely by Rashid Nezhmetdinov.",
        // GET GAMES OF PLAYER
      }));
    }, 100);
    // Ensure is a signed in user

    // Any subsciber required data
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3">
      <div className="col-span-2">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Member Profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Player insights
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900">{member.name}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Club</dt>
                <dd className="mt-1 text-sm text-gray-900">{member.club}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Grade</dt>
                <dd className="mt-1 text-sm text-gray-900">{member.grade}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900">{member.about}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                  Latest Games
                </dt>
                <dd className="mt-1 text-sm text-gray-900"></dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="m-1 mt-2 sm:m-4 sm:mt-10">
        <div className="">
        <Chessboard
        blackSquareColour="#5499ab"
        whiteSquareColour="white"
        width={320}
        style={{
          border: '2px solid lightgrey',
        }}
        orientation="b"
      />
        </div>
          
      </div>
    </div>
  );
}

export default MemberProfile;
