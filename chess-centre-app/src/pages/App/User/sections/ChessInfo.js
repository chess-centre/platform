import { API, Auth } from "aws-amplify";
import * as mutations from "../../../../graphql/mutations";
import { getECFData } from "../../../../api/profile/chess";
import React, { useState, useEffect } from "react";
import { Input, Textarea } from "@windmill/react-ui";
import { useToasts } from "react-toast-notifications";

const getMember = /* GraphQL */ `
  query GetMember($id: ID!) {
    getMember(id: $id) {
      id
      about
      fideId
      ecfId
      username
      name
      email
      eventsByEmail
      promoByEmail
      eventsByText
      promoByText
      ecfRating
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      stripeCustomerId
      stripeCurrentPeriodEnd
      stripePriceId
      stripeProductId
      entries {
        items {
          id
          eventId
          memberId
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          member {
            id
            about
            fideId
            ecfId
            username
            name
            email
            eventsByEmail
            promoByEmail
            eventsByText
            promoByText
            ecfRating
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            stripeCustomerId
            stripeCurrentPeriodEnd
            stripePriceId
            stripeProductId
            entries {
              nextToken
              startedAt
            }
          }
          event {
            id
            name
            description
            rounds
            time
            startDate
            endDate
            maxEntries
            entryCount
            _version
            _deleted
            _lastChangedAt
            createdAt
            updatedAt
            type {
              id
              name
              description
              url
              color
              time
              maxEntries
              timeControl
              eventType
              defaultPrice
              canRegister
              _version
              _deleted
              _lastChangedAt
              createdAt
              updatedAt
              stripePriceId
            }
            entries {
              nextToken
              startedAt
            }
          }
        }
        nextToken
        startedAt
      }
    }
  }
`;

const ECFProfileCard = ({
  full_name,
  club_name,
  member_no,
  due_date,
  original_rating
}) => {

  return (
    <div className="bg-white shadow-md overflow-hidden rounded-lg mt-4">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          ECF profile
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Provided by the English Chess Federation
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {full_name}
            </dd>
          </div>

          <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Member No.</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {member_no ? (
                member_no
              ) : (
                <div>
                  <span className="text-red-900 text-xs">No Membership</span>{" "}
                  <div>
                    <a
                      className="text-teal-600 hover:text-teal-700 hover:underline"
                      href="https://www.englishchess.org.uk/ecf-membership-rates-and-joining-details/"
                    >
                      join here
                    </a>
                  </div>
                </div>
              )}
            </dd>
          </div>

          {club_name ? (
            <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Club</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {club_name}
              </dd>
            </div>
          ) : null}

          {due_date ? (
            <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Membership Due Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {due_date}
              </dd>
            </div>
          ) : null}

          {original_rating ? (
            <div className="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Rating</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {original_rating}
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </div>
  );
};

const LoadingCard = () => {
  return (
    <div className="text-center mt-6">
      <div className="text-teal-500 mb-2">
        <i className="fal fa-spinner-third fa-spin fa-2x fa-fw"></i>
      </div>
      <div className="italic text-gray-500">fetching your info...</div>
    </div>
  );
};

export default function ChessInfo(props) {
  const { isLoading } = props;
  const [memberId, setMemberId] = useState("");
  const [newAbout, setAboutMe] = useState("");
  const [newECFId, setNewECFId] = useState("");
  const [newFIDEId, setNewFIDEId] = useState("");
  const [ecfData, setECFData] = useState("");
  const [isSearchingECF, setIsSearchingECF] = useState(false);
  const [showFoundFide, setFoundFide] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { addToast } = useToasts();

  const handleSave = async () => {

    try {
      const { original_rating } = ecfData;
      const member = {
        id: memberId,
        ecfId: newECFId,
        fideId: newFIDEId ? Number(newFIDEId) : undefined,
        ecfRating: original_rating ? original_rating : undefined
      };
      console.log(member);
      await API.graphql({ query: mutations.updateMember, variables: { input: member } });
      addToast(`Profile. Saved!`, {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      console.log(error);
      addToast("Oops! Something went wrong. Try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const fetchECFData = async (id) => {
    const searchId = id.toString();
    setNewECFId(searchId);
    if (searchId.length === 6 || searchId.length === 7) {
      const toSearchId = searchId.slice(0, 6); // a user may think their id contains an additional character 225527 || 225527D
      setIsSearchingECF(true);
      const { info, rating } = await getECFData(toSearchId);
      const ratingJSON = rating ? JSON.parse(rating) : "";
      const infoJSON = info ? JSON.parse(info) : "";

      if ((infoJSON && infoJSON.FIDE_no)) {
        setNewFIDEId(infoJSON.FIDE_no);
        setFoundFide(true);
      }
      setECFData({ ...infoJSON, ...ratingJSON });
      setIsSearchingECF(false);
    } else if (searchId.length === 0) {
      setECFData("");
    }
  };

  const fetchFIDEData = async (id) => {
    setNewFIDEId(id);
    if (id.length !== 6) {
      setFoundFide(false)
    }
  }

  const confirmQuery = () => {
    setIsConfirmed(true);
  };

  const undoConfirm = () => {
    setIsConfirmed(false);
    setFoundFide(false);
  };

  useEffect(() => {
    const fetchMember = async () => {
      const {
        attributes: { sub },
      } = await Auth.currentAuthenticatedUser();
      const {
        data: {
          getMember: { about, ecfId, fideId },
        },
      } = await API.graphql({
        query: getMember,
        authMode: "AWS_IAM",
        variables: { id: sub },
      });

      setMemberId(sub);
      setAboutMe(about || "");
      setNewFIDEId(fideId || "");
      setNewECFId(ecfId || "");
    };
    fetchMember();
  }, []);

  return (
    <div>
      <div className="shadow rounded-lg overflow-hidden">
        <div className="bg-white dark:bg-gray-800 py-6 px-6 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Profile
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              Tell us a little more about you and your Chess background
            </p>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                About
              </label>
              <div className="mt-1">
                <Textarea
                  id="about"
                  name="about"
                  rows="4"
                  disabled={isLoading}
                  onChange={(e) => setAboutMe(e.target.value)}
                  defaultValue={newAbout}
                  className="text-xs sm:text-sm mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-400 focus:border-teal-400 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                  placeholder="Example: My favourite opening is the Sicilian."
                ></Textarea>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                Tell us what you love about Chess{" "}
                <span className="text-gray-900">
                  <i className="fas fa-chess"></i>
                </span>
              </p>
            </div>

            <div className="col-span-6 sm:col-span-3 gap-6">
              <div className="col-span-12 gap-6">
                <label
                  htmlFor="ecf_id"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <div className="flex">
                    ECF ref{" "}
                    <a
                      href="https://www.ecfrating.org.uk/v2/new/list_players.php"
                      alt="ECF Rating Website"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fad fa-question-circle ml-1 text-teal-600 hover:text-teal-700"></i>
                    </a>
                  </div>
                </label>

                <div className="mt-1 rounded-md shadow-sm flex">
                  <Input
                    disabled={isConfirmed || isLoading}
                    onChange={(e) => fetchECFData(e.target.value)}
                    type="text"
                    name="ecf_ref"
                    id="ecf_ref"
                    autoComplete="off"
                    defaultValue={newECFId}
                    className="text-xs sm:text-sm mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-400 focus:border-teal-400 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>
              </div>
              <div>
                {isSearchingECF ? (
                  <LoadingCard />
                ) : !isSearchingECF && !!ecfData ? (
                  <ECFProfileCard
                    {...ecfData}
                    confirmQuery={confirmQuery}
                    undoConfirm={undoConfirm}
                  />
                ) : null}
              </div>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <div className="col-span-12 gap-6">
                <label
                  htmlFor="fide_id"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  <div className="flex">
                    FIDE ref{" "}
                    <a
                      href="https://ratings.fide.com/"
                      alt="Fide Rating Website"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fad fa-question-circle ml-1 text-teal-600 hover:text-teal-700"></i>
                    </a>
                  </div>
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <Input
                    disabled={(isConfirmed && showFoundFide) || isLoading}
                    onChange={(e) => fetchFIDEData(e.target.value)}
                    type="text"
                    name="fide_ref"
                    id="fide_ref"
                    autoComplete="off"
                    defaultValue={newFIDEId}
                    className="text-xs sm:text-sm mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-400 focus:border-teal-400 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>
                {showFoundFide ? (
                  <p className="mt-2 ml-1 text-xs text-orange-700 dark:text-gray-300">
                    <i className="fad fa-gift"></i> We've populated your FIDE id from the ECF data
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6 border-t border-gray-50 dark:border-gray-700">
          <button
            onClick={handleSave}
            className="bg-teal-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-xs sm:text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
