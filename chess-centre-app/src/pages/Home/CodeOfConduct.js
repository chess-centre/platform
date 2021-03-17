import React from "react";
import LandingNav from "../../components/Navigation/LandingNav";
import FooterLanding from "../../components/Footer/LandingFooter";

function CodeOfConduct() {
  return (
    <div>
      <div className="relative bg-gray-50 pt-6 pb-6 sm:pb-6 md:pb-6 lg:pb-6 xl:pb-6">
        <LandingNav page="code-of-conduct" />
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Code of Conduct
              </h2>
              <p className="mt-5 text-md text-gray-500">
                All members of The Chess Centre are expected to abide by this
                Code of Conduct at all times. Failure to do so may result in the
                revocation of membership by the Management Team.
              </p>
              <h4 className="mt-4 font-extrabold text-teal-700">
                Unresolved Issues
              </h4>
              <p className="mt-4 text-md text-gray-500">
                In the event of issues arising that are not covered in this
                code, or otherwise which cannot be amicably resolved between
                members, the matter may be referred to the Management Team. The
                Managements Team decision shall be final on all disputes
                arising.
              </p>
              <p className="mt-4 text-md text-gray-500">
                Management Team Email:{" "}
                <a
                  href="mailto:info@chesscentre.online"
                  className="text-sm font-medium text-teal-600 dark:text-teal-700 hover:underline"
                >
                  info@chesscentre.online
                </a>
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <div class="prose prose-indigo prose-lg text-gray-500 lg:max-w-none">
                <ol>
                  <li>
                    Act with respect towards opponents, fellow members,
                    officials, and club premises
                  </li>
                  <li>
                    Respect the rights, dignity and worth of all participants
                    regardless of age, gender, ability, race, cultural
                    background, religious beliefs or sexual identity.
                  </li>
                  <li>
                    Abide by the laws of chess and any specific rules in events
                    held at The Chess Centre.
                  </li>
                  <li>
                    Recognise the valuable contribution made by the Management
                    Team and other volunteers. They give their time and
                    resources to provide the service that the Chess Centre
                    provides for you.
                  </li>
                  <li>Use correct and proper language at all times.</li>
                  <li>
                    Under no circumstances cheat, or otherwise bring the game
                    into disrepute.
                  </li>
                  <li>
                    Avoid distracting opponents, either verbally or through
                    actions. Examples could be repeated offers of a draw, and
                    trying to pressurise opponents into resigning or accepting a
                    draw.
                  </li>
                  <li>
                    Refrain from smoking, including the use of e-cigarettes, on
                    Chess Centre premises.
                  </li>
                  <li>
                    Promptly pay all membership fees due to The Chess Centre.
                  </li>
                  <li>Respect the decisions of the Management Committee.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLanding />
    </div>
  );
}

export default CodeOfConduct;
