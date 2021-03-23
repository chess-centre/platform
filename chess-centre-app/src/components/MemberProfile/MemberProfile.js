import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PGNViewer from "../ChessBoard/ChessBoard";

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
      <div className="m-1 mt-2 sm:m-4">
        <div className="">
        <div className="relative h-full max-w-7xl mx-auto items-center place-content-center content-center place-items-center">
        

        <div class="hidden sm:block">

          <PGNViewer layout={"left"}>
            [Event "F/S Return Match"] [Site "Belgrade"] [Date "1992.11.04"] [Round
            "29"] [White "Fischer, Robert J."] [Black "Spassky, Boris V."] [Result
            "1/2-1/2"] 1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5
            7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13.
            Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19.
            exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+
            Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6
            30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6
            36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6 Nf2
            42. g4 Bd3 43. Re6 1/2-1/2
          </PGNViewer>

        </div>

        <div class="block sm:hidden ml-4">

            <PGNViewer layout={"top"}>
              [Event "F/S Return Match"] [Site "Belgrade"] [Date "1992.11.04"] [Round
              "29"] [White "Fischer, Robert J."] [Black "Spassky, Boris V."] [Result
              "1/2-1/2"] 1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5
              7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13.
              Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19.
              exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+
              Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6
              30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6
              36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6 Nf2
              42. g4 Bd3 43. Re6 1/2-1/2
            </PGNViewer>

        </div>



      </div>
        </div>
          
      </div>
    </div>
  );
}

export default MemberProfile;
