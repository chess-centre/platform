import { DataStore } from "@aws-amplify/datastore";
import { Member } from "../../../../models";
import { API, Auth } from "aws-amplify";
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

export default function ChessInfo() {
  const [memberId, setMemberId] = useState("");
  const [newAbout, setAboutMe] = useState("");
  const [newECFId, setNewECFId] = useState("");
  const [newFIDEId, setNewFIDEId] = useState("");
  const { addToast } = useToasts();

  const handleSave = async () => {
    try {
      const original = await DataStore.query(Member, memberId);
      await DataStore.save(
        Member.copyOf(original, (updated) => {
          updated.ecfId = newECFId;
          updated.fideId = newFIDEId ? Number(newFIDEId) : undefined;
          updated.about = newAbout;
        })
      );
      addToast("Profile. Saved!", {
        appearance: "success",
        autoDismiss: true
      });
    } catch (error) {
      addToast("Oops! Something went wrong.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
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
              Tell us a little more about you! Providing any of your
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
                    onChange={(e) => setNewECFId(e.target.value)}
                    type="text"
                    name="ecf_ref"
                    id="ecf_ref"
                    autoComplete="off"
                    defaultValue={newECFId}
                    className="text-xs sm:text-sm mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-400 focus:border-teal-400 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>
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
                    onChange={(e) => setNewFIDEId(e.target.value)}
                    type="text"
                    name="fide_ref"
                    id="fide_ref"
                    autoComplete="off"
                    defaultValue={newFIDEId}
                    className="text-xs sm:text-sm mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-400 focus:border-teal-400 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-900"
                  />
                </div>
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
